const promise = () => 
{
   return new Promise((res, rej) => {
        setTimeout(() => {
            res('Time completed')
        }, 2000);
    })
}

(async() => {
   const p = await promise()
    console.log(p)
    console.log('jiii')
})();