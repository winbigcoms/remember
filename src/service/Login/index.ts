import axios from "axios";

export default class User {
  static login = async (id, password) => {
    const userData = await axios
      .post("/api/login", { id, password })
      .then((res) => res.data);

    return userData;
  };
}
