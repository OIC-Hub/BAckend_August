const fs = require('fs')

fs.readFile("./class.txt", (err, data) => {
    if (err) throw err;
    console.log(data);
})

// fs.readFile('./message.txt',  {
//   if (err) throw err
//   console.log(data)
// })


console.log("Backend class")

console.log(__dirname)
console.log(__filename)

