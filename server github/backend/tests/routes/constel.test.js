const request = require('supertest')
const app = require('../../server') // Ensure server.js exports the app
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const Constellation = require('../../models/Constellation')
const { User } = require('../../models/userModel') // Use the imported User model

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    await mongoose.connect(uri)
})

afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
})

describe('Constellation Routes', () => {
    beforeEach(async () => {
        await Constellation.deleteMany();
        await User.deleteMany();
    })

    test('POST /api/constel/favorite should add a constellation to user favorites', async () => {
        const user = await User.create({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            password: 'password123',
            birthMonth: 'March',
            favorites: [],
        })

        const constellation = await Constellation.create({
            ItemID: 1,
            Name: 'Orion',
            Image: 'orion.jpg',
            Meaning: 'Hunter',
            Description: 'A hunter in the sky',
            birthMonth: 'March',
        })

        const res = await request(app)
            .post('/api/constel/favorite')
            .send({ userID: user._id.toString(), constellationID: constellation._id.toString() })

        expect(res.status).toBe(200)

        const updatedUser = await User.findById(user._id)
        expect(updatedUser.favorites).toContainEqual(constellation._id)
    })
})

