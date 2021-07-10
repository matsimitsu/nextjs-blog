export default function handler(req, res) {
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

class NumberException {
  constructor(message) {
    this.message = message;
    this.name = 'NumberException';
  }
}
