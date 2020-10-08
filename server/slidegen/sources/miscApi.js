const axios = require('axios').create({
  timeout: 3000,
})

async function getRandomAdvice() {
  try {
    const response = await axios.get('https://api.adviceslip.com/advice')
    return response.data.slip.advice
  } catch (err) {
    return getRandomAdvice()
    //FIX this could be an infinite loop
  }
}

async function getInspirationalQuote() {
  try {
    const response = await axios.get('http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en')
    return response.data.quote
  } catch (err) {
    return getInspirationalQuote()
    //FIX this could be an infinite loop
  }
}

async function getNumberTrivia() {
  try {
    const response = await axios.get('http://numbersapi.com/random/trivia')
    return response.data
  } catch (err) {
    return getNumberTrivia()
    //FIX this could be an infinite loop
  }
}

module.exports = {
  getRandomAdvice,
  getInspirationalQuote,
  getNumberTrivia
}