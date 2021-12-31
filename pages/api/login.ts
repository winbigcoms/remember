import mongoClient from "connect/mongo";
import { NextApiRequest, NextApiResponse } from "next";

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

          const userId = userData._id.toString();

          const locations = await mongoClient
            .db("stopSayWWE")
            .collection("location")
            .findOne({ owner: userId });

          res.send({ userData: { ...userData, _id: userId }, locations });

          mongoClient.close();
        });
      } catch (err) {
        res.send({ list: [] });
        return resolve();
      }
    }
  });
}
