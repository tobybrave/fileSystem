const fs = require("fs")
const axios = require("axios")

const writeFileToResultDir = (data) => {
  return fs.writeFile("./result/posts.json", JSON.stringify(data), (err) => {
    if (err) throw new Error("could not create file")
    console.log("operation was successful")
  })
}

const main = async () => {
  try {
    const response = await axios.get("http://jsonplaceholder.typicode.com/posts")
    const post = response.data
    
    fs.mkdir("result", (err) => {
      if (err) {
        if (err.code === 'EEXIST') {
          writeFileToResultDir(post)
          return
        }
        throw new Error(err)
      }
      
      writeFileToResultDir(post)
    })
  } catch (err) {
    console.error(`${err.code}: an error while trying to connect to ${err.hostname} `)
  }
}

main()
