const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require ("../index.js")
const fs = require("fs")

// MIDLEWARE
chai.use(chaiHttp)
const expect = chai.expect

describe('CRUD de Películas de Anime', () => {
    beforeEach(() => {
        let data = fs.readFileSync("./original_anime.json", 'utf-8')
        const originalData = JSON.parse(data)
        fs.writeFileSync("./anime.json", JSON.stringify(originalData))
    })

    it("GET /animeMovies debe devolver la lista completa de películas", (done) => {
        chai.request(app)
        .get('/animeMovies')
        .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(Object.keys(res.body)).to.have.lengthOf(5)
        })
        done()
    })

    it("GET /get/:key debe devolver la película especificada en el params", (done) => {
        chai.request(app)
        .get('/get/1')
        .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('anime').to.have.property('nombre').to.be.equal('Akira')
        })
        done()
    })

    it("POST /send debe crear un nuevo elemento con todas sus propiedades", (done) => {
        chai.request(app)
        .post('/send')
        .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
        })
        done()
    })
})