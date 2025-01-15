const asyncErrorHandeler = async(code) => {
    try{
        code
    }catch(e){
        throw new Error(e.message)
    }
}
module.exports = asyncErrorHandeler