const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require ("../index.js")
const fs = require("fs")
const expect = chai.expect

// MIDLEWARE
chai.use(chaiHttp)

// TESTS
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
            expect(res.body.anime).to.have.property('nombre').to.be.equal('Akira')
        })
        done()
    })

    it("POST /send debe crear un nuevo elemento con todas sus propiedades", (done) => {
        const newMovie = {
            nombre: "The best movie ever",
            genero: "No lo sé",
            año: "2000",
            autor: "Yo"
        }
        chai.request(app)
        .post('/send')
        .send(newMovie)
        .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.deep.equal(newMovie)
        })
        done()
    })

    it("PUT /update/:key debe actualizar el elemento con id especificado en el Params", (done) => {
        const updateMovie = {
            nombre: "The best movie ever 2",
            genero: "Aún no lo sé",
            año: "2002",
            autor: "Yo"
        }

        chai.request(app)
        .put('/update/6')
        .send(updateMovie)
        .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.deep.equal(updateMovie)
        })
        done()
    })
})

describe('', () => {
    it("DELETE /delete/:key debe eliminar el elemento especificado en el Params", (done) => {
        chai.request(app)
        .delete('/delete/3')
        .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.have.key(1, 2, 4, 5, 6)
        })
        done()
    })
})