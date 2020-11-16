import * as mysql from "mysql";
import dbChirps from "./chirps";
import dbUsers from './users';

export const Connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "chirprapp",
  password: "chirpr",
  database: "DataBaseLab",
});

// dont have to put async before " (query..." because already returning promise
export const Query = (query: string, values?: Array<string | number>) => {
  return new Promise<Array<any>>((resolve, reject) => {
    Connection.query(query, values, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

export default {
  Query,
  dbChirps,
  dbUsers
}
