export default class Message {
  constructor(raw_message) {
    this._raw_message = raw_message;
  }

  type() {
    return this._raw_message.data.slice(0,1)
  }

  payload() {
    return this._raw_message.data.slice(1)
  };

}
