const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true  // 입력값의 스페이스를 없애준다.(빈칸)
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
const User = mongoose.model('User', userSchema)

module.exports = { User }