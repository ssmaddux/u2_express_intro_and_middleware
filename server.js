const express = require('express')
const PORT = process.env.PORT || 3001
const cors = require('cors')
const logger = require('morgan')
const bodyParser = require('body-parser')


const app = express()
// allows us to control data being sent out and recieved 
app.use(cors())
//keeps track of log of every rewuest we make
app.use(logger())
//parse the body of our request -> HTML forms for create 
app.use(bodyParser())
//makes sure our data is used in json 
app.use(express.json())
//allows us to put things like urls in links in our req and res
app.use(express.urlencoded({ extended: false }))


app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.send("You're a wizard, Harry!!")
  })

app.get('/my-dog', (req, res) => res.send(
    {
        dog: "Tucker",
        type: "golden retriever",
        temperment: "happy",
        friends: ["addie", "finley", "freya"]
    }
))

app.get('/my-kids', (req, res) => res.send(
    {
       children : true,
       quantity: 3,
       names: ["cooper", "davey", "milam"],
       gender: [{milam: "male " , game: "chase" }, {davey: "female", game: "tea party"}, {cooper: "male", game: "work on it"}],
       outfit: {suit: "black and white", diaper: "white", t: "T-REX"}
    }
))

app.get('/my-wife', (req, res) => res.send(
    {
        style: "MOM",
        personality: "Kind",
        temperment: "MOM",
        friends: ["caity", "brittany", "Allie"]
    }
))
//params
app.get('/message/:id', (request, response) => {
    console.log(`Getting a message with the id of ${request.params.id}`)
    response.send({ msg: `Message with an id of ${request.params.id} found` })
  })

//query
app.get('/find', (request, response) => {
  console.log(
    `Finding someone with a name of ${request.query.myName} and an age of ${request.query.myAge}`
  )
  response.send({
    msg: `${request.query.myName} is ${request.query.myAge} years old.`
  })
}) 

app.post('/towns', (req, res) => {
    res.send(`im from the hood`)
})

app.put('/profile/update/:username', (req,res) => {
    res.send(`username ${req.params.username} updated`)
})

app.delete('/tacos', (req,res) =>{
    res.send(`deleted taco with choice of ${req.query.choice}`)
})

app.get(
    '/middleware',
    (request, response, next) => {
      console.log('this is middleware')
      next()
    },
    (req, res) => {
      res.send('response completed')
    }
  )