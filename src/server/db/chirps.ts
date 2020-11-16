import { Query } from "./index";
import userMarket from "../db/users";
import { MysqlError } from "mysql";

const allChirps = async () =>
  Query(`
    SELECT 
        Chirps.*, 
        Users.name 
    FROM Chirps 
    JOIN Users ON Users.id = Chirps.userid
    ORDER BY Chirps.id DESC
`);

const getOneChirp = async (id: string) =>
  Query(
    "SELECT Chirps.*, Users.name FROM Chirps Join Users On Users.id = Chirps.userid WHERE Chirps.id = ?",
    [id]
  );

const updateChirp = async (content: string, id: number) =>
  Query("UPDATE Chirps SET content = ? WHERE id = ?", [content, id]);

const postChirp = async (name: string, content: string) => {
  let user = await userMarket.postUser(name);
  Query("INSERT INTO chirps(userid, content) values (?,?)", [
    user.insertId,
    content
  ]);
  // name isnt posting with add chirp
  
};
// const insert = (userid: string, content: string) =>
//     Query(
//       `INSERT INTO chirps(userid, content) VALUE(?)`,
//       [[userid, content]]
//     );

//recives id when posted
const deleteChirp = async (id: string) => Query("DELETE FROM chirps WHERE id=?",[id]);

export default {
  allChirps,
  getOneChirp,
  updateChirp,
  postChirp,
  // insert,
  deleteChirp,
};
