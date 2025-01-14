// no route include middleware off app.use() below them

const express = require('express')
const app  = express()
let requests = 0;
const counter = (req, res, next) => {
    requests++;
    next()
}

const logger = (req, res, next) => {
    const log = {
        host: req.hostname,
        URL : req.url,
        method:req.method,
        timestamp : (new Date()).toISOString()
    }
    console.log(log)
    next()
}

app.use(counter)
app.use(logger)

app.get('/log', (req, res) => {
res.send('Success')
})
app.get('/counter', (req, res) => {
res.send(`Total Req ${requests}`)
})


app.listen(3000, () => {
    console.log(`Server's Up`)
})




// id  name   order_total 
// 1    riya     2000
// 1    riya     2000
// 1    riya     2000
// 2    puspa    1000
// 3     vaib    5000
// 1    riya     2000
// 2    puspa    1000
// 1    riya     2000

// select id , name , sum(order_total)
//  From order 
// group by id

// 8000
// 1000
// 500

// 190
// 250 490