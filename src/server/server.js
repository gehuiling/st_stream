const express = require('express')
const app = express()
const expressWs = require('express-ws')
const websocket = require('./websocket')

const port = 3002;

expressWs(app);

app.use(express.static('public'))
app.use('/', websocket)
app.get('*', (req, res) => {})
app.listen(port, () => {
  console.log(`server is listening on port ${ port }`)
})