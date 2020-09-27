const express = require('express')  // express모듈 가져온다.
const app = express()   // function이용하여 express app만든다.
const port = 5000   // port생성
const bodyParser = require('body-parser')
const { User } = require("./models/User")

const config = require('./config/key')

// body-parser 옵션주기
// application/x-www-form-urlencoded 분석
app.use(bodyParser.urlencoded({extended: true}));

// application/json 분석
app.use(bodyParser.json());

const mongoose = require('mongoose')


mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!~ 안녕하세요 !!!!~')
})

app.post('/register', (req, res) => {
  // 회원 가입 할 때 필요한 정보들을 client에서 가져오면
  // 데이터 베이스에 넣어준다.

  const user = new User(req.body)

  user.save((err, userInfo) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})