const { User } = require('../models/User')

let auth = (req, res, next) => {

    // 인증 처리를 하는 곳

    // 1. Client Cookie에서 Token을 가져온다.
    let token = req.cookies.x_auth;

    // 2. Token을 복호화 한 후 유저를 찾는다.
    // DB에서 찾아야 하기 때문에 UserSChema에 함수 생성(findByToken)
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true})

        // token, user정보를 req에 넣어주는 이유?
        // index.js의 route에서 req.user or req.token이런식으로 사용할 수 있게 된다.
        req.token = token;
        req.user = user;

        next();
    })
    // 3. 유저가 있으면 인증 O
    // 4. 유저가 없으면 인증 X
}

module.exports = { auth }