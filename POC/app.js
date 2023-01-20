const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('<h1> Hello World </h1>')
})
app.get('/about', function (req, res) {
  res.sendFile('./views/about.html',
  {root:__dirname});
})

//redirect
app.get('/aboutus',(req,res)=> {
  res.redirect('/about')
})

//404 page
//app.use -> is a middleware
app.use((req,res) => {
  res.status(404).sendFile("./views/404.html",{root: __dirname})
})

app.listen(3003)