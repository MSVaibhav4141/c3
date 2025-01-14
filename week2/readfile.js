const fs = require('fs')
const trimSpaces = (filePath) => {
    return new Promise((res, rej) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if(err){
               rej(err)
            }
            fs.writeFile(filePath, data.trim(),(err) => {
                if(err){
                    rej(err)
                    return;
                }
                res('Spaces Trimed')
            })
        })

    })
}

(async() => {
    const readFile = await trimSpaces('a.txt');
    console.log(readFile)
})();
