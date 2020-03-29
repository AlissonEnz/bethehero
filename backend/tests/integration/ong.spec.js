const request = require('supertest');
const app = require('../../src/app')
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  })

  afterAll(async () => {
    await connection.destroy()
  })

  it('Should be able to create a new ong', async () => {
    const response = await request(app)
      .post('/ongs')
      // .set('Authorization', 'ong_id')
      .send({
        name: "Pets Test",
        email: "contato@pets.com",
        whatsapp: "43999820420",
        city: "Maringa",
        uf: "pr"
      })
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  })
})