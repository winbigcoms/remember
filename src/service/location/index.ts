import axios from "axios";

import { AddLocationData } from "src/types/locationType";

export default class Location {
  static add = async (data: AddLocationData) => {
    const userData = await axios
      .post("/api/location", data)
      .then((res) => res.data);

    return userData;
  };
}
