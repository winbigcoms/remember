import { NextApiRequest, NextApiResponse } from "next";

import mongoClient from "connect/mongo";

import { AddLocationData } from "src/types/locationType";

export default function location(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>((resolve) => {
    if (req.method === "POST") {
      const params = req.body;

      async function addLocation(params:AddLocationData) {
        await mongoClient.connect();
        const db = mongoClient.db("stopSayWWE");

        const locationCollection = db.collection("location");
        await locationCollection.insertOne(params);

        const locations = await locationCollection.find({
          owner: params.owner,
        });

        res.send({ locations });
      }

      addLocation(params)
        .catch((err) => {
          console.log(err);
        })
        .finally(() => mongoClient.close());
    }
  });
}
