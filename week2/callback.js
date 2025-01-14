const p1 = () => (
    new Promise((res, rej) => {
        res('1')
    })
)
const p2 = () => (
    new Promise((res, rej) => {
        res('2')
    })
)
const p3 = () => (
    new Promise((res, rej) => {
        res('3')
    })
)

p1().then((result) => {
    console.log(result)
    return p2();
})
.then((result) => {
    console.log(result)
    return p3();
})
.then((result) => {
    console.log(result)
    console.log('Done')
})

// 6 / 10
(() => {
    setTimeout(() => {
        console.log('hii')
        
    }, 1000);
})