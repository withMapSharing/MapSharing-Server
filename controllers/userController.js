const {pool} = require('../config/database');
const {logger} = require('../config/winston');

const jwt = require('jsonwebtoken');
const secret_config = require('../config/secret');

const userDao = require('../dao/userDao');
const { constants } = require('buffer');
const axios = require('axios');

/**
 update : 2021.02.22.
 API 1: 카카오 로그인
 */
exports.kakaoAuth = async function (req, res) {
    const {
        kakaoId, accessToken, nickname, profileImg
    } = req.body;

    // validation
    if (!kakaoId) return res.json({isSuccess: false, code: 300, message: "카카오 아이디 미입력"});
    if (!accessToken) return res.json({isSuccess: false, code: 301, message: "AccessToken 미입력"});
    if (!nickname) return res.json({isSuccess: false, code: 302, message: "닉네임 미입력"});
    
    try {
        try {
            const kakao = await axios.get("https://kapi.kakao.com/v1/user/access_token_info", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (kakaoId != kakao.data.id) return res.json({isSuccess: false, code: 401, message: 'id가 동일하지 않음'});

            try {
                const selectUser = await userDao.selectUser(kakaoId);

                if (selectUser.length === 0 ) {
                    // 회원가입
                    const insertUserRows = await userDao.insertUser(kakaoId, nickname, profileImg);
                    // JWT 토큰 발급
                    let token = await jwt.sign(
                        {
                            id: insertUserRows[0].insertId,
                        },
                        secret_config.jwtsecret,
                        {
                            expiresIn: '365d',
                            subject: 'User',
                        }
                    );
                    return res.json({isSuccess: true, code: 201, message: "회원가입 성공", jwt: token});
                } else if (selectUser[0].status === 'normal'){
                    // 로그인
                    let token = await jwt.sign(
                        {
                            id: selectUser[0].userIdx,
                        },
                        secret_config.jwtsecret,
                        {
                            expiresIn: '365d',
                            subject: 'User',
                        }
                    );
                    return res.json({isSuccess: true, code: 200, message: "로그인 성공", jwt: token});
                } else if (selectUser[0].status === 'dormant') {
                    return res.json({isSuccess: false, code: 402, message: '휴면 계정'});
                }
                else if (selectUser[0].status === 'deleted') {
                    return res.json({isSuccess: false, code: 403, message: '탈퇴된 계정'});
                }
            } catch (err) {
                logger.error(`userDao selectUser error\n: ${err.message}`);
                return res.json({isSuccess: false, code: 500, message: `DB Error: ${err.message}`});
            }
        } catch (err) {
            logger.error(`Access Token error\n: ${err.message}`);
            return res.json({isSuccess: false, code: 401, message: '유효하지 않은 Access Token'});
        }
    } catch (err) {
        logger.error(`Kakao Login error\n: ${err.message}`);
        return res.json({isSuccess: false, code: 400, message: '토큰 검사 에러'});
    }
};