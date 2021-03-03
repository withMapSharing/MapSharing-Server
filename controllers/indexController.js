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

/**
 update : 21.02.28.
 API 4: 특정 리스트 내 장소 조회
 */
exports.showPlaceInList = async function (req, res) {
    const userIdx = req.verifiedToken.id;
    const placeListIdx = req.params.placeListIdx;

    try {
        const [isValidPlaceListIdxRows] = await indexDao.isValidPlaceListIdx(placeListIdx, userIdx)
        if (isValidPlaceListIdxRows.EXIST == 0) {
            return res.json({isSuccess: false, code: 302, message: "유효하지 않은 리스트 인덱스 (없는 인덱스 or 초대되지 않은 인덱스)"});
        }
    } catch (err) {
        logger.error(`API 4 - select place in list error\n: ${err.message}`);
        return res.json({isSuccess: false, code: 500, message: `DB Error: ${err.message}`});
    }

    try {
        // 리스트 정보
        const [selectPlaceListInfoRows] = await indexDao.selectPlaceListInfo(placeListIdx, userIdx);

        // 장소 정보
        const selectPlaceInListRows = await indexDao.selectPlaceInList(placeListIdx);

        const result = {
            ...selectPlaceListInfoRows,
            placeList: selectPlaceInListRows
        };

        return res.json({
            isSuccess: true,
            code: 200,
            message: "장소 조회 성공",
            result: result
        });

    } catch (err) {
        logger.error(`API 4 - select place in list error\n: ${err.message}`);
        return res.json({isSuccess: false, code: 500, message: `DB Error: ${err.message}`});
    }
};

/**
 update : 21.02.28.
 API 5: 리스트 추가
 */
exports.addPlaceList = async function (req, res) {
    const userIdx = req.verifiedToken.id;
    const {
        name, description, color, isPublic
    } = req.body;

    if (!name) return res.json({isSuccess: false, code: 302, message: "리스트 이름 미입력"});
    if (!description) return res.json({isSuccess: false, code: 303, message: "리스트 설명 미입력"});
    if (!color && !Number.isInteger(color)) return res.json({isSuccess: false, code: 304, message: "색상 미입력"});
    else if (color < 0 || color > 9 || !Number.isInteger(color)) return res.json({isSuccess: false, code: 305, message: "색상 값 범위 초과"});
    if (!isPublic && !Number.isInteger(isPublic)) return res.json({isSuccess: false, code: 306, message: "공개설정 미입력"});
    else if (isPublic < 0 || isPublic > 1 || !Number.isInteger(isPublic)) return res.json({isSuccess: false, code: 307, message: "공개범위 값 범위 초과"});

    try {
        // 리스트 추가
        const insertPlaceListRows = await indexDao.insertPlaceList(name, description, color, isPublic, userIdx);

        if (!insertPlaceListRows.insertId) res.json({isSuccess: false, code: 501, message: "트랜잭션 에러"});

        const result = {
            "placeListIdx": insertPlaceListRows.insertId,
            "placeListName": name
        };

        return res.json({
            isSuccess: true,
            code: 200,
            message: "리스트 추가 성공",
            result: result
        });

    } catch (err) {
        logger.error(`API 5 - add place error\n: ${err.message}`);
        return res.json({isSuccess: false, code: 500, message: `DB Error: ${err.message}`});
    }
};

/**
 update : 21.03.01.
 API 6: 리스트 검색
 */
exports.searchPlaceList = async function (req, res) {
    const userIdx = req.verifiedToken.id;
    const keyword = req.query.keyword;

    if (!keyword) return res.json({isSuccess: false, code: 302, message: "keyword 미입력"});

    try {
        // 유저 정보 - 닉네임, 프로필이미지
        const [selectUserInfoRows] = await indexDao.selectUserInfo(userIdx);

        // 리스트 목록 정보
        const selectPlaceListInKeywordRows = await indexDao.selectPlaceListInKeyword(userIdx, keyword);

        if (selectPlaceListInKeywordRows.length === 0) return res.json({isSuccess: false, code: 400, message: "검색 결과 없음"});

        const result = {
            "userInfo": selectUserInfoRows,
            "keyword" : keyword,
            "placeList": selectPlaceListInKeywordRows,
        }

        return res.json({
            isSuccess: true,
            code: 200,
            message: "리스트 검색 성공",
            result: result
        });

    } catch (err) {
        logger.error(`API 6 - search list error\n: ${err.message}`);
        return res.json({isSuccess: false, code: 500, message: `DB Error: ${err.message}`});
    }
};

/**
 update : 21.03.04.
 API 7: 장소 정보 조회
 */
exports.showPlace = async function (req, res) {
    const userIdx = req.verifiedToken.id;
    const placeIdx = req.params.placeIdx;

    try {
        const [isValidPlaceIdxRows] = await indexDao.isValidPlaceIdx(placeIdx, userIdx)
        if (isValidPlaceIdxRows.EXIST == 0) {
            return res.json({isSuccess: false, code: 303, message: "유효하지 않은 리스트 인덱스 (없는 인덱스 or 초대되지 않은 인덱스)"});
        }
    } catch (err) {
        return res.json({isSuccess: false, code: 302, message: "인덱스 미입력"});
    }

    try {
        // 장소 정보
        const selectPlaceRows = await indexDao.selectPlace(placeIdx);

        return res.json({
            isSuccess: true,
            code: 200,
            message: "장소 조회 성공",
            result: selectPlaceRows
        });

    } catch (err) {
        logger.error(`API 7 - select place error\n: ${err.message}`);
        return res.json({isSuccess: false, code: 500, message: `DB Error: ${err.message}`});
    }
};