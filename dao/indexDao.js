const { pool } = require("../config/database");

// API 2 - 홈 화면 (유저 정보)
async function selectUserInfo(userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const selectUserInfoQuery = `
    SELECT nickname, profileImg FROM User WHERE userIdx = ?;
                    `;
    const selectUserInfoParams = [userIdx];
    const [selectUserInfoRows] = await connection.query(
        selectUserInfoQuery,
        selectUserInfoParams
    );
    connection.release();
    return selectUserInfoRows;
}
// API 2 - 홈 화면 (장소 정보)
async function selectPlaceList(userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const selectPlaceListQuery = `
    SELECT P.placeIdx, P.placeListIdx, P.name as placeName, PL.name as placeListName, PL.color as placeListColor, P.lat, P.lng
FROM Place P
LEFT JOIN PlaceList PL ON P.placeListIdx = PL.placeListIdx
where P.status = 'normal' and PL.status = 'normal' and
      P.placeListIdx IN (SELECT I.placeListIdx FROM Invite I WHERE I.status = 'normal' and I.userIdx = ?);
                    `;
    const selectPlaceListParams = [userIdx];
    const [selectPlaceListRows] = await connection.query(
        selectPlaceListQuery,
        selectPlaceListParams
    );
    connection.release();
    return selectPlaceListRows;
}

// API 3 - 리스트 목록 조회
async function selectAllPlaceList(userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const selectAllPlaceListQuery = `
    SELECT pl.placeListIdx, pl.name as placeListName,
       IF (pl.isPublic, 'TRUE', 'FALSE') as isPublic,
       pl.description
FROM PlaceList pl
WHERE pl.status = 'normal' and pl.placeListIdx IN (SELECT i.placeListIdx FROM Invite i WHERE i.status = 'normal' and i.userIdx = ?);
                    `;
    const selectAllPlaceListParams = [userIdx];
    const [selectAllPlaceListRows] = await connection.query(
        selectAllPlaceListQuery,
        selectAllPlaceListParams
    );
    connection.release();
    return selectAllPlaceListRows;
}

// API 4 - 리스트 내 장소 조회
async function isValidPlaceListIdx(placeListIdx, userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const isValidPlaceListIdxQuery = `
    SELECT EXISTS(
    SELECT p.placeListIdx
    FROM PlaceList p
    LEFT JOIN Invite i ON p.placeListIdx = i.placeListIdx
    WHERE p.placeListIdx = ? AND p.status = 'normal' AND i.userIdx = ? AND i.status = 'normal'
) as EXIST;
                    `;
    const isValidPlaceListIdxParams = [placeListIdx, userIdx];
    const [isValidPlaceListIdxRows] = await connection.query(
        isValidPlaceListIdxQuery,
        isValidPlaceListIdxParams
    );
    connection.release();
    return isValidPlaceListIdxRows;
}

async function selectPlaceListInfo(placeListIdx, userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const selectPlaceListInfoQuery = `
    SELECT pl.placeListIdx, pl.name as placeListName, pl.color as placeListColor
FROM PlaceList pl
LEFT JOIN Invite i ON pl.placeListIdx = i.placeListIdx
WHERE pl.placeListIdx = ? AND pl.status = 'normal' AND i.userIdx = ? AND i.status = 'normal';
                    `;
    const selectPlaceListInfoParams = [placeListIdx, userIdx];
    const [selectPlaceListInfoRows] = await connection.query(
        selectPlaceListInfoQuery,
        selectPlaceListInfoParams
    );
    connection.release();
    return selectPlaceListInfoRows;
}

async function selectPlaceInList(placeListIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const selectPlaceInListQuery = `
    SELECT p.placeIdx, p.name as placeName, p.lat, p.lng
FROM Place p
WHERE p.status = 'normal' AND p.placeListIdx = ?;
                    `;
    const selectPlaceInListParams = [placeListIdx];
    const [selectPlaceInListRows] = await connection.query(
        selectPlaceInListQuery,
        selectPlaceInListParams
    );
    connection.release();
    return selectPlaceInListRows;
}

module.exports = {
    selectUserInfo,
    selectPlaceList,
    selectAllPlaceList,
    isValidPlaceListIdx,
    selectPlaceListInfo,
    selectPlaceInList,
};
