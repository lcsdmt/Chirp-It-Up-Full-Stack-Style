import * as express from "express";
import db from "../db/";

const router: express.Router = express.Router();

router.get("/", async (req: express.Request, res: express.Response) => {
  const data = await db.dbChirps.allChirps();
  res.json(data);
});

router.get("/:id", async (req: express.Request, res: express.Response) => {
  // let id: string = req.params.id;
  //   const chirp = {
  //     id: id,
  //     username: data[0].username,
  //     message: data[0].message,
  //   };
  //   res.send(JSON.stringify(chirp));
  const data = await db.dbChirps.getOneChirp(req.params.id);
  res.json(data[0]);
});

router.post("/", async (req: express.Request, res: express.Response) => {
  //  const user: string = await userMarket.postUser(name);
  await db.dbUsers.postUser(req.body.name);
  await db.dbChirps.postChirp(req.body.name, req.body.content);
  res.sendStatus(200);
});

router.put("/:id", (req: express.Request, res: express.Response) => {
  let id: number = Number(req.params.id);
  db.dbChirps.updateChirp(req.body.content, id);
  res.sendStatus(200);
});

router.delete("/:id", (req: express.Request, res: express.Response) => {
  // let id: string = req.params.id;
  // const content: string = req.params.content;
  // console.log(id)
  db.dbChirps.deleteChirp(req.params.id);

  res.send(`chirp ${req.params.id} was deleted`);
});

interface chirp {
  userid: string;
  content: string;
}

export default router;
