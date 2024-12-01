const request = require('supertest')
const app = require('../server') // Ensure `server.js` exports the app
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
})

afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
})

describe('Server Tests', () => {
    test('should return 404 for an unknown route', async () => {
        const res = await request(app).get('/unknown')
        expect(res.status).toBe(404)
    })

    test('should log request method and path', async () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
        await request(app).get('/api/constel')
        expect(consoleSpy).toHaveBeenCalledWith('/api/constel', 'GET')
        consoleSpy.mockRestore()
    })

    test('should successfully connect to the database', async () => {
        expect(mongoose.connection.readyState).toBe(1); // 1 = connected
    })
})


