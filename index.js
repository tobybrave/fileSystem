const fs = require("fs")
const axios = require("axios")

const main = async () => {
  try {
    const response = await axios.get("http://jsonplaceholder.typicode.com/posts")
    const post = response.data
    
    fs.mkdir("result", (err) => {
      if (err) throw new Error("attempt to create directory failed")
      
      fs.writeFile("./result/posts.json", JSON.stringify(post), (err) => {
        if (err) throw new Error("could not create file")
        console.log("operation was successful")
      })
    })
  } catch (err) {
    console.error(`${err.code}: an error while trying to connect to ${err.hostname} `)
  }
}

main()
