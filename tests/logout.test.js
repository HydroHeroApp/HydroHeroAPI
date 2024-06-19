const dotenv = require('dotenv');
dotenv.config();

const request = require('supertest');
const app = require('../server');
const jwt = require('jsonwebtoken');

describe('Logout', () => {
  let token;

  beforeAll(() => {
    // Generate a valid JWT token for testing
    token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET, { expiresIn: '1h' });
  });

  it('should logout and revoke the token', async () => {
    const response = await request(app)
      .post('/api/logout')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body.message).toBe('Logout successful');

    // Try accessing a protected route with the revoked token
    const protectedResponse = await request(app)
      .get('/api/protected/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(401);

    expect(protectedResponse.body.message).toBe('Token has been revoked');
  });
});
