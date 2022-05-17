import express from 'express';
//const express = require('express');

let app = express();


app.get('/', (req, res) =>{
  res.send(' -> Hello from Express <-');
});

app.listen(3030, ()=>{
  console.log('Server start');
})