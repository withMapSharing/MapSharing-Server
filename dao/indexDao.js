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

module.exports = {
    selectUserInfo,
    selectPlaceList,
    selectAllPlaceList,
};
