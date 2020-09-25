const express = require('express')  // express모듈 가져온다.
const app = express()   // function이용하여 express app만든다.
const port = 5000   // port생성

const mongoose = require('mongoose')


mongoose.connect('mongodb+srv://junseok:dkagh1025!@cluster0.7nxpj.mongodb.net/Cluster0?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!~ 안녕하세요 ~')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})