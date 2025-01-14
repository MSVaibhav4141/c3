const express = require('express')
const app = express()

app.get('/sum', (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    console.log(typeof(a))
    const result = a + b;

    res.status(200).json({result:`Sum is ${result}`})
})
app.get('/sub', (req, res) => {
    const a = req.query.a;
    const b = req.query.b;
    const result = a - b;

    res.status(200).json({result:`Diff is ${result}`})
})
app.get('/div', (req, res) => {
    const a = req.query.a;
    const b = req.query.b;
    const result = a / b;

    res.status(200).json({result:`Div is ${result}`})
})
app.get('/mul', (req, res) => {
    const a = req.query.a;
    const b = req.query.b;
    const result = a * b;

    res.status(200).json({result:`Product is ${result}`})
})


// sending input as params  
app.get('/:a/:b', (req, res) => {
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    const result = a + b;

    res.status(200).json({result:`Sum is ${result}`})
})
app.listen(3000, () => {
    console.log('Up')
})