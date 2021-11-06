import base64 from "./base64.js";

export default (username, password) => {
    return 'Basic ' + base64(`${username}:${password}`);
}