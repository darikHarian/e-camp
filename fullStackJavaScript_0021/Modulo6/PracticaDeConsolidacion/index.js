const express = require("express")
const app = express()
const fs = require("fs")
const PORT = 3000

// MIDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// ENDPOINTS
app.get("/animeMovies", (req, res) => {
    let data = fs.readFileSync("./anime.json", 'utf-8')
    let names = JSON.parse(data)
    res.send(names)
})

app.get("/get/:key", (req, res) => {
    let key = req.params.key
    let data = fs.readFileSync("./anime.json", 'utf-8')
    let animeNames = JSON.parse(data)
    res.json({anime:animeNames[key]})
})

app.post("/send", (req, res) => {
    const newAnime = req.body
    let data = fs.readFileSync("./anime.json", 'utf-8')
    let animeNames = JSON.parse(data)
    const animeID = Object.keys(animeNames).length+1
    animeNames[animeID] = newAnime
    fs.writeFileSync("./anime.json", JSON.stringify(animeNames))
    res.send('Animé agregado!')
})

app.put("/update/:key", (req, res) => {
    let key = req.params.key
    let props = req.body
    let data = fs.readFileSync("./anime.json", 'utf-8')
    let animeNames = JSON.parse(data)
    animeNames[key].nombre = props.nombre
    animeNames[key].genero = props.genero
    animeNames[key].año = props.año
    animeNames[key].autor = props.autor
    fs.writeFileSync("./anime.json", JSON.stringify(animeNames))
    res.send('Animé actualizado!')
})

app.delete("/delete/:key", (req, res) => {
    let key = req.params.key
    let data = fs.readFileSync("./anime.json", 'utf-8')
    let animeNames = JSON.parse(data)
    delete animeNames[key]
    fs.writeFileSync("./anime.json", JSON.stringify(animeNames))
    res.send('Registro eliminado con éxito!')
})

// SERVER
app.listen(PORT, () => {
    console.log(`Escuchando servidor en el puerto: ${PORT}`)
})

module.exports = app