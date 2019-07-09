import { postHttp } from "./ajax";

function home(username, password) {
  let data = {
    username: username,
    password: password
  };
  return postHttp.post("/fans", data);
}

export { home };
