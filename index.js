// const fs = require('fs')
const fs = require("fs/promises");
const os = require("os")
// fs.readFile("./class.txt", (err, data) => {
//     if (err) throw err;
//     console.log(data);
// })

// fs.readFile('./message.txt',  {
//   if (err) throw err
//   console.log(data)
// })


// console.log("Backend class")

// console.log(__dirname)
// console.log(__filename)

async function ReadDoc(){
    console.log("Funtion working")
    const readFile = await fs.readFile("./class.txt", 'utf8')
    console.log(readFile);
}

async function WriteDoc(){
    await fs.writeFile("./class.txt", "Welcome to class")
}

async function AppendDoc(){
      
    const name = "Your Name"

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
 

    await fs.appendFile("./class.txt", ` ${name} -- ${today}`)
}

// ReadDoc();
// WriteDoc();
// AppendDoc();

console.log(os.platform())