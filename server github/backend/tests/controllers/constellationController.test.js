const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const { getConstellations, favoriteConstellation } = require('../../controllers/constellationController')
const Constellation = require('../../models/Constellation')
const { User } = require('../../models/userModel')

let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
})

afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
})

describe('Constellation Controller Tests', () => {
    beforeEach(async () => {
        await Constellation.deleteMany()
        await User.deleteMany()
    })

    test('getConstellations should fetch all constellations', async () => {
        const constellation1 = await Constellation.create({
            ItemID: 1,
            Name: 'Orion',
            Image: 'orion.jpg',
            Meaning: 'Hunter',
            Description: 'A hunter in the sky',
            birthMonth: 'March',
        })

        const constellation2 = await Constellation.create({
            ItemID: 2,
            Name: 'Leo',
            Image: 'leo.jpg',
            Meaning: 'Lion',
            Description: 'A lion in the sky',
            birthMonth: 'August',
        })

        const req = {}
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        await getConstellations(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([
            expect.objectContaining({ Name: 'Orion' }),
            expect.objectContaining({ Name: 'Leo' }),
        ]))
    })

    test('favoriteConstellation should add a constellation to user favorites', async () => {
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

        const req = {
            body: { userID: user._id.toString(), constellationID: constellation._id.toString() },
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        await favoriteConstellation(req, res)

        const updatedUser = await User.findById(user._id)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(updatedUser.favorites).toContainEqual(constellation._id)
    })
})



