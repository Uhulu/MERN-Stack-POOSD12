const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const { User } = require('../../models/userModel')

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
})

afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
})

describe('User Model Tests', () => {
    beforeEach(async () => {
        await User.deleteMany()
    })

    test('should save a valid user', async () => {
        const user = new User({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            password: 'password123',
            birthMonth: 'March',
        })

        const savedUser = await user.save()
        expect(savedUser._id).toBeDefined()
        expect(savedUser.firstName).toBe('John')
        expect(savedUser.email).toBe('john@example.com')
    })

    test('should not save a user with missing required fields', async () => {
        const user = new User({
            lastName: 'Doe',
            email: 'john@example.com',
        })

        await expect(user.save()).rejects.toThrow(mongoose.Error.ValidationError)
    })

    test('should hash passwords and generate a token', async () => {
        const user = new User({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            password: 'password123',
            birthMonth: 'March',
        })

        await user.save()
        const token = user.generateAuthToken()
        expect(token).toBeDefined()
        expect(typeof token).toBe('string')
    })

    test('should reference favorite constellations', async () => {
        const user = new User({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            password: 'password123',
            birthMonth: 'March',
            favorites: [new mongoose.Types.ObjectId()],
        })

        const savedUser = await user.save()
        expect(savedUser.favorites).toHaveLength(1)
        expect(mongoose.Types.ObjectId.isValid(savedUser.favorites[0])).toBe(true)
    })
})



