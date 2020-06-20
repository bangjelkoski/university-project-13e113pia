export default class ApiError {
  static throw(error, message) {
    console.log(error);
    throw new Error(message);
  }
}
