const p1 = (content, time) => {
       return new Promise((res, rej) => {
            setTimeout(() => {
                res(content)
            }, time);
        })
  
}

(async() => {
    console.log(await p1('hii',1000))
    console.log(await p1('hello',2000))
    console.log(await p1('hello there',3000))
    console.log('hiiiiiii')
})();