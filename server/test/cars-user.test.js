process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let should = chai.should();

chai.use(chaiHttp);

/*
 * TEST /cars?term [GET]
 */
describe('/GET cars', () => {
    for (let sample of ['Peugeot', '206', 'Lamborghini', 'Mercedes']) {
        it('it should GET all the cars with sample searching', (done) => {
            chai.request(server)
            .get('/api/cars/?term=' + sample)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.not.be.eql(0);
                done();
            });
        });
    }
});
