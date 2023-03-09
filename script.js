const path = require('path')
const http = require('http')
const fs = require('fs')

const PORT = 3000;


const server = http.createServer((req, res) => {
    console.log('server req')

    res.setHeader('Content-Type', 'text/html')

    const createPath = (page) => path.resolve(__dirname, 'pages', `${page}.html`)

    let basePath = ''

    switch (req.url) {
        case '/':
        case '/main':
        case '/home':
        case '/index':
            basePath = createPath('index')
            res.statusCode = 200
            break
        case '/page':
            basePath = createPath('page')
            res.statusCode = 200
            break
    }

    fs.readFile(basePath, (err, data) => {
        if (err) {
            console.log(err)
            res.statusCode = 500
            res.end()
        }
        else {
            res.write(data)
            res.end()
        }
    })
})

server.listen(PORT, 'lokalhost', (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`)
})
