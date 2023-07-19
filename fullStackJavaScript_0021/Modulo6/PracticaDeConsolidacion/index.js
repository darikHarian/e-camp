const express = require("express")
const app = express()
const fs = require("fs")
const PORT = 3002

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
    res.json(newAnime)
})

app.put("/update/:key", (req, res) => {
    let key = req.params.key
    let updateAnime = req.body
    let data = fs.readFileSync("./anime.json", 'utf-8')
    let animeNames = JSON.parse(data)
    animeNames[key] = updateAnime
    fs.writeFileSync("./anime.json", JSON.stringify(animeNames))
    res.json(animeNames[key])
})

app.delete("/delete/:key", (req, res) => {
    let key = req.params.key
    let data = fs.readFileSync("./anime.json", 'utf-8')
    let animeNames = JSON.parse(data)
    const deleted = animeNames[key]
    delete animeNames[key]
    fs.writeFileSync("./anime.json", JSON.stringify(animeNames))
    res.json(animeNames)
})

// SERVER
app.listen(PORT, () => {
    console.log(`Escuchando servidor en el puerto: ${PORT}`)
})

module.exports = app