import { NextApiRequest, NextApiResponse } from "next";

import mongoClient from "connect/mongo";

export default function login(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>((resolve) => {
    if (req.method === "POST") {
      const params = req.body;

      async function userLogin(params) {
        const { id, password } = params;

        await mongoClient.connect();

        const db = mongoClient.db("stopSayWWE");

        const userCollection = db.collection("user");
        const locationCollection = db.collection("location");

        const userData = await userCollection.findOne({ id, password });
        const userId = userData ? userData._id.toString() : "";

        const locations = await locationCollection
          .find({ owner: userId })
          .toArray()
          .then((res) => res);

        res.send({ userData, locations });
      }

      userLogin(params)
        .catch((err) => {
          console.log(err);
        })
        .finally(() => mongoClient.close());
    }
  });
}
