import express, { Application, Request, Response, NextFunction, response } from 'express'
const Note = require('./schemas/note')
const app: Application  = express()
let cors = require('cors')
let bodyParser = require('body-parser')
let jsonParser = bodyParser.json()
app.use(cors())

type Note = {
  id: Number;
  title: String;
  body: String;
  writer: String
}
 
app.get('/', (req: Request, res: Response) => {
  res.send('Hello')
})

app.post('/save', jsonParser, (req: Request, res: Response) => {
  console.log("tulee POST")
  console.log(req.body)
  const body: Note = req.body as Note
  if(typeof body.id === 'number' && typeof body.title === 'string' && typeof body.body === 'string' || typeof body.writer === 'string') {
    const note = new Note({
      id: body.id as Number,
      title: body.title as String,
      body: body.body as String,
      writer: body.writer as String
    })
    note.save().then((data: Note) => {
      response.status(200).json({
        note: data as Note
      })
    }).catch((e: Error) => {
      res.status(401).json({
        data: 'Error saving note ' + e       
      })
    })
  } else {
    console.log("input väärin")
    res.status(401).json({
      data: 'check your input types accordingly: string, string, string'
    })
  }
})

app.get('/all', (req: Request, res: Response) => {
  console.log("tulee GET")
  Note.find({
    
  }).then((notesArray: String[]) => {
    if(notesArray.length > 0) {
      res.status(200).json({
        data: notesArray as String[]
      })
    } else {
      res.status(200).json({
        data: 'There is 0 notes'
      })
    }
  }).catch((e: Error) => {
    res.status(401).json({
      error: 'Error fetching notes: ' + e
    })
  })
})
 
app.listen(3000, () => console.log("server running"))