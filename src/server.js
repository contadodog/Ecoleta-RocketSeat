const express = require("express")
const server = express()

//pegar o banco de dados

const db = require("./database/db.js")

//configurar pasta publica
server.use(express.static("public"))

//habilitar o uso do req.body da nossa aplicação

server.use(express.urlencoded({ extended: true }))


//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//conigurar caminhos da minha aplicação

//home - página inicial

//ligar o servidor

// req: requisição - pedido
// res: resposta.

server.get("/", (req, res) => {
    return res.render("index.html", { title: "um título" })
})

server.post("/savepoint", (req, res) => {

    //req.body : corpo do nosso formulário.

    //inserir dados no banco de dados
    const query = `
        INSERT INTO places(
            image,
            name,
            address,
            address2,
           state,
           city,
            items
        )VALUES(?,?,?,?,?,?,?);`


    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items,
    ]



    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }
    }

    db.run(query, values, afterInsertData)

    return res.render("create-point.html", {saved: true})
})

server.get("/create-point", (req, res) => {
    //req.query: query strings da nossa url
    //req.query

    return res.render("create-point.html")
})

server.get("/search", (req, res) => {
    
    const search = req.query.search
    if (search == "") {
        return res.render("search-results.html", {total: 0})
    }
    
    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            console.log(err)
            return res.send(err)
        }

        const total = rows.length

        //mostrar a página html com os dados do banco de dados.
        return res.render("search-results.html", { places: rows, total: total })

    })
})

//porta do servidor
server.listen(3000)
