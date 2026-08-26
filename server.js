const http = require("http");
const PORT = 8080

const server = http.createServer((req, res) => {
    if(req.url === "/home" && req.method === "POST"){
        res.end("Hello world")
    }

    if(req.url === "/class" && req.method === "GET"){
        const data = [{id: 1, name: "Ade"}, {id: 2, name: "Bisi"}]
        res.end(JSON.stringify(data))
    }else{
        res.end("404 page not found")
    }
})

server.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})