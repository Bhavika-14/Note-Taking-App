const request = require('supertest');
const app = require('../app'); 

const { users } = require("../utils/users")
const user = users[0]

const base64Credentials = Buffer.from(`${user.username}:${user.password}`).toString('base64');
const authorizationHeader = `Basic ${base64Credentials}`;

let validNoteId;

describe('API Endpoints', () => {

  it('should create a new note', async () => {
    return request(app)
            .post("/api/notes")
            .set('Authorization', authorizationHeader)
            .send({ title: 'Test Note', content: 'This is a test note' })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body.title).toBe('Test Note');
                expect(res.body.content).toBe('This is a test note');
            })
  });

  it('should retrieve all notes', async () => {
    return request(app)
            .get("/api/notes")
            .set('Authorization', authorizationHeader)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                validNoteId = res.body[0]._id
            })
    });
  });
  

  it('should retrieve a single note by ID', async () => {
    return request(app)
            .get(`/api/notes/${validNoteId}`)
            .set('Authorization', authorizationHeader)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('title');
                expect(res.body).toHaveProperty('content');
                expect(res.body.title).toBe('Test Note');
            })
  });

  it('should update a note by ID', async () => {
      return request(app)
            .put(`/api/notes/${validNoteId}`)
            .send({ content: 'This note has been updated' })
            .set('Authorization', authorizationHeader)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('content');
                expect(res.body.content).toBe('This note has been updated');
            })
  });
  
  it('should delete a note by ID', async () => {
    return request(app)
            .delete(`/api/notes/${validNoteId}`)
            .set('Authorization', authorizationHeader)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body.message).toBe('Note deleted successfully');
            });
  })
