const express = require('express')  // express모듈 가져온다.
const app = express()   // function이용하여 express app만든다.
const port = 5000   // port생성
const bodyParser = require('body-parser')
const { auth } = require('./middleware/auth')
const { User } = require("./models/User")
const cookieParser = require('cookie-parser')

const config = require('./config/key')

// body-parser 옵션주기
// application/x-www-form-urlencoded 분석
app.use(bodyParser.urlencoded({extended: true}));

// application/json 분석
app.use(bodyParser.json());

// Token Cookie에 저장하기 위해 Cookie-parser사용
app.use(cookieParser());

const mongoose = require('mongoose')

// 몽고DB 연결 부분
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

// Welcome Api Route
app.get('/', (req, res) => {
  res.send('Hello World!~ 안녕하세요 !!!!~')
})

// User Login Route
app.post('/api/users/register', (req, res) => {
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

app.post('/api/users/login', (req, res) => {
  // 1. 요청된 이메일을 DB에서 있는지 찾는다.
  User.findOne({email : req.body.email}, (err, user) => {
    if(!user){
      return res.json({
        loginSuccess : false,
        message: "제곧된 이메일에 해당하는 유저가 없습니다."
      })
    }

    // 2. 만약 존재할 때 비밀번호 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch){
        return res.json({
          loginSuccess: false,
          message : "비밀번호가 틀렸습니다."
        })
      }


    })
    // 3. 비밀번호까지 맞다면 토큰 생성
    user.generateToken((err, user) => {
      if(err) return res.status(400).send(err);
      
      // 토큰을 저장한다.  쿠키?, 로컬 스토리지, ...
      res.cookie("x_auth", user.token)
      .status(200)
      .json({loginSuccess: true, userId: user._id})    
      
    })

  })
  
})

// 기능마다 Route들을 따로 관리해주는 것이 좋다.
// ex) user따로, Product따로...

app.get('/api/users/auth', auth, (req, res) => {
  // 여기까지 미들웨어를 통과했다는 것은 Authentication이 True라는 말
  res.status(200).json({
    _id: req.user._id,  // auth.js에서 req.user = user를 통해 보내줬기 때문에 사용 가능한 것
    isAdmin: req.user.role === 0 ? false : true,  // 역할은 언제든지 바꿀 수 있다.
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  }) 
})

// 로그아웃 API 추가
// 로그아웃을 하게 되면 MongoDB에서 해당 유저의 토큰 값이 사라지게 된다.
app.get('/api/users/logout', auth, (req, res)=>{
  User.findOneAndUpdate({ _id:req.user._id},
    { token: ""}
    , (err, user) =>{
      if(err) return res.json({success:false, err});
      return res.status(200).send({
        success:true
      })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  // 프로그램 실행 npm run start
})