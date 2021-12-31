import { NextApiRequest, NextApiResponse } from "next";

import mongoClient from "connect/mongo";

export default function login(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>((resolve) => {
    if (req.method === "POST") {
      try {
        const params = req.body;

        const { id, password } = params;

        mongoClient.connect(async (err) => {
          const userData = await mongoClient
            .db("stopSayWWE")
            .collection("user")
            .findOne({ id, password });

          const userId = userData ? userData._id.toString() : "";

          const locations = await mongoClient
            .db("stopSayWWE")
            .collection("location")
            .find({ owner: userId });

          const resultUserData = {
            ...userData,
            id: userId,
          };

          delete resultUserData._id;

          res.send({ userData: resultUserData, locations });

          mongoClient.close();
        });
      } catch (err) {
        res.send({ list: [] });
        return resolve();
      }
    }
  });
}
