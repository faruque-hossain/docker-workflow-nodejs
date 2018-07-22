import { expect } from 'chai';
import supertest from 'supertest';
import app from './../app';

const api = supertest(app);

describe('', () => {
  it('should be healthy', done => {
    api
      .get('/health')
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(error);
        }
        const apiResponse = res.body;
        expect(apiResponse).not.to.be.undefined;
        expect(apiResponse.healthy).not.to.be.undefined;
        expect(apiResponse.healthy).to.be.true;
        return done();
      });
  });
});

describe('', () => {
  it('should return server information', done => {
    api
      .get('/info')
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(error);
        }
        const apiResponse = res.body;
        expect(apiResponse).not.to.be.undefined;
        expect(apiResponse.environment).not.to.be.undefined;
        expect(apiResponse.environment).to.be.a('string');
        // expect(apiResponse.environment).to.be.equal(process.env.NODE_ENV);
        return done();
      });
  });
});

// Ensure we get the proper 404 when trying to GET an unknown route
describe('', () => {
  it('should return 404', done => {
    api
      .get(`/not-found`)
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
});
