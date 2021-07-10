import appsignal from "../../appsignal.js"


export default function handler(req, res) {
  const span = appsignal.createSpan((span) => {
    span.setAction("number")
    span.setNamespace("functions")
    span.setParams(req)
    return span
  })

  try {
    const number = getRandomInt(10)
    if (number % 2 == 0) {
      res.status(200).json({ number: number })
    } else {
      throw new NumberException(`Number ${number} is not even.`)
    }
  } catch(e) {
    span.setError(e)
    appsignal.send(span)
    throw(e)
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
