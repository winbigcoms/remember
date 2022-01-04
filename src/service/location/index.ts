import axios from "axios";

import { AddLocationData } from "src/types/locationType";

export default class LocationService {
  static add = async (data: AddLocationData) => {
    const userData = await axios
      .post("/api/locations", data)
      .then((res) => res.data);

    return userData;
  };
}
