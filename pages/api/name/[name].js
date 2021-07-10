import appsignal from "../../../appsignal.js"

export default function handler(req, res) {
  const span = appsignal.createSpan((span) => {
    span.setAction("name")
    span.setNamespace("functions")
    span.setParams(req)
    return span
  })

  const {
    query: { name },
  } = req;

  try {
    const number = getRandomInt(10)
    if (number % 2 == 0) {
      res.status(200).json({ name: name })
    } else {
      throw new NameException(`Name is invalid.`)
    }
  } catch (e) {
    span.setError(e)
    appsignal.send(span)
    throw (e)
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
