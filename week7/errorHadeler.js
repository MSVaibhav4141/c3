//promise.resolve onnly and only return or catch promise of async functoin like if error is happenng in async function only then it will be cathc by promise.reolve thats why i made the function async in auth hanedler
const asyncErrorHandeler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        errorHandeler(res, err.message || "Internal Server Eror", err.statusCode || 500)
    })
  }
}

const errorHandeler = (res, mssg,code) => {
res.status(code).json({
    error:mssg
})
}

module.exports = {errorHandeler, asyncErrorHandeler}

 