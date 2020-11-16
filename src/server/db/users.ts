import { Query } from "./index";

const allUsers = async () => Query("SELECT * FROM Users");

const getOneUser = async (id: string) =>
  Query("SELECT * from Users WHERE id = ?", [id]);

const updateUser = async (id: string, user: string) =>
  Query("UPDATE Users SET content = ? WHERE id = ?", [user, id]);

const postUser = async (name: string) =>
  Query("INSERT INTO Users(name) values (?)", [name]);

const deleteUser = async (id: string, user: string) => Query("", [id, user]);

export default {
  allUsers,
  getOneUser,
  updateUser,
  postUser,
  deleteUser,
};
