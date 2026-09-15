const request = require('supertest');
const mongoose = require('mongoose');
require('dotenv').config();
const app = require('../app');

beforeAll(async () => {
  // Connect to database for tests
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI);
  }
});

afterAll(async () => {
  // Close database connection after tests finish
  await mongoose.connection.close();
});

describe('Projects API Integration Tests', () => {
  // Test 1: Health Check Endpoint
  it('GET / - should return 200 with running message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('3D Portfolio API is running smoothly...');
  });

  // Test 2: Public Route access
  it('GET /api/projects - should return 200 and an array of projects', async () => {
    const res = await request(app).get('/api/projects');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test 3: Route Security check
  it('POST /api/projects - should block unauthorized access with 401 without Bearer token', async () => {
    const res = await request(app)
      .post('/api/projects')
      .send({
        title: 'Hacker Project',
        description: 'Should be rejected',
        techStack: ['Node.js'],
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/Not authorized/i);
  });
});
