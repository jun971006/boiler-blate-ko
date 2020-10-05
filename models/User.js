const mongoose = require('mongoose');   // mongodb사용
const bcrypt = require('bcrypt');   // 비밀번호 암호화
const saltRounds = 10   // 비밀번호 암호화에 사용되는 크기
const jwt = require('jsonwebtoken');    // webtoken생성

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,  // 입력값의 스페이스를 없애준다.(빈칸)
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: { // 역할
        type: Number,
        default: 0
    },
    image: String,
    token: { // 유효성 관리 가능하도록
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function( next ){
    var user = this;

    if(user.isModified('password')){
        // 비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()  // 비밀번호를 바꿀때가 아닐 때
    }
    


})  // user모델 저장하기 전에 

userSchema.methods.comparePassword = function(plainPassword, cb){
    // plainPassword abcd1234 -> 암호화해서 DB에 있는 것과 확인한다.
    // 암호화된 비밀번호$2b$10$oyvAR49pFUm1EUDVNAuD6.CvtM3EHirXQ1QAKuuWg2vSbZx7m5mpO

    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err),
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    // jsonwebtoken사용해서 token 생성하기

    var token = jwt.sign(user._id.toHexString(), 'secretToken'); 
    // userId + 'secretToken' = Token 생성 완료!

    // 둘을 합쳐서 token생성
    // token 생성할 때 _id값이 plain object가 아니라서 에러가 남.
    // toHexString을 통해서 plain값으로 만들어준다.

    // 클라이언트의 쿠키에 토큰이 저장되어있다.
    // 토큰을 decode(복호화)하면 user._id가나오게 된다.
    // 이 user._id를 Server DB에 있는 User정보인지 확인한다.

    user.token = token
    user.save(function(err, user) {
        if(err) return console(err)
        cb(null, user)
    })

}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    // 토큰을 Decode한다.
    jwt.verify(token, 'secretToken', function(err, decoded) {   // decoded가 유저 ID
        // 유저 아이디를 이용해서 유저를 찾은 후
        // 클라이언트에서 가져온 Token과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id" : decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    })
}



const User = mongoose.model('User', userSchema)

module.exports = { User }