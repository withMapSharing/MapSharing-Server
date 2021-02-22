const { pool } = require("../config/database");

// API 1 - 유저 조회
async function selectUser(kakaoId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const selectUserQuery = `
  SELECT userIdx, kakaoId, status FROM User WHERE kakaoId = ?;
                `;
  const selectUserParams = [kakaoId];
  const [selectUserRows] = await connection.query(
    selectUserQuery,
    selectUserParams
  );
  connection.release();
  return selectUserRows;
};

// API 1 - 회원가입
async function insertUser(kakaoId, nickname, profileImg) {
  const connection = await pool.getConnection(async (conn) => conn);
  const insertUserQuery = `
  INSERT INTO User(kakaoId, nickname, profileImg) VALUES (?, ?, ?);
                `;
  const insertUserParams = [kakaoId, nickname, profileImg];
  const insertUserRows = await connection.query(
    insertUserQuery,
    insertUserParams
  );
  connection.release();
  return insertUserRows;
};

module.exports = {
  selectUser,
  insertUser,
};
