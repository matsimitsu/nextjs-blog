import { monitorWithAppSignal } from "../../appsignal.js"

function handler(req, res) {
  const number = getRandomInt(10)
  if (number % 2 == 0) {
    res.status(200).json({ number: number })
  } else {
    throw new NumberException(`Number ${number} is not even.`)
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

class NumberException extends Error {
  constructor(message) {
    super(message)
    this.name = 'NumberException';
  }
}

export default function defaultHandler(req, res) {
  monitorWithAppSignal(handler, req, res)
}
