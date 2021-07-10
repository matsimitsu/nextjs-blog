import { monitorWithAppSignal } from "../../../appsignal.js"

function handler(req, res) {
  const {
    query: { name },
  } = req;

  const number = getRandomInt(10)
  if (number % 2 == 0) {
    res.status(200).json({ name: name })
  } else {
    throw new NameException(`Name is invalid.`)
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
class NameException extends Error {
  constructor(message) {
    super(message)
    this.name = 'NameException';
  }
}

export default function defaultHandler(req, res) {
  monitorWithAppSignal(handler, req, res)
}
