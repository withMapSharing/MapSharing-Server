const {pool} = require('../config/database');
const {logger} = require('../config/winston');

const indexDao = require('../dao/indexDao');

/**
 update : 21.02.26.
 API 2: 홈 화면
 */
exports.home = async function (req, res) {
    const userIdx = req.verifiedToken.id;

    try {
        // 유저 정보 - 닉네임, 프로필이미지
        const [selectUserInfoRows] = await indexDao.selectUserInfo(userIdx);

        // 장소 정보
        const selectPlaceListRows = await indexDao.selectPlaceList(userIdx);

        const result = {
            "userInfo": selectUserInfoRows,
            "placeList": selectPlaceListRows,
        }

        return res.json({
            isSuccess: true,
            code: 200,
            message: "홈 화면 조회 성공",
            result: result
        });

    } catch (err) {
        logger.error(`API 2 - home error\n: ${err.message}`);
        return res.json({isSuccess: false, code: 500, message: `DB Error: ${err.message}`});
    }
};

/**
 update : 21.02.27.
 API 3: 리스트 목록 조회
 */
exports.showPlaceList = async function (req, res) {
    const userIdx = req.verifiedToken.id;

    try {
        // 유저 정보 - 닉네임, 프로필이미지
        const [selectUserInfoRows] = await indexDao.selectUserInfo(userIdx);

        // 리스트 목록 정보
        const selectAllPlaceListRows = await indexDao.selectAllPlaceList(userIdx);

        const result = {
            "userInfo": selectUserInfoRows,
            "placeList": selectAllPlaceListRows,
        }

        return res.json({
            isSuccess: true,
            code: 200,
            message: "리스트 목록 조회 성공",
            result: result
        });

    } catch (err) {
        logger.error(`API 3 - select list error\n: ${err.message}`);
        return res.json({isSuccess: false, code: 500, message: `DB Error: ${err.message}`});
    }
};