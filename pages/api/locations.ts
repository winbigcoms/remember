import { NextApiRequest, NextApiResponse } from "next";

import mongoClient from "connect/mongo";

export default function login(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>((resolve) => {
    if (req.method === "POST") {
      try {
        const params = req.body;

        mongoClient.connect(async (err) => {
          const userData = await mongoClient
            .db("stopSayWWE")
            .collection("location")
            .inseartOne(params);

          const userId = userData ? userData._id.toString() : "";

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
