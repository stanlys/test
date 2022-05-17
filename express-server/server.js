import express from 'express';
import bodyParser from 'body-parser';
//const express = require('express');

let app = express();


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


let projects = [
  {
    id: 1,
    name: 'Смоленскэнерго',
  },
  {
    id: 2,
    name: 'Рязаньэнерго',
  }, 
  {
    id: 3,
    name: 'Костромаэнерго',
  },
  {
    id: 4,
    name: 'Орелэнерго',
  },
  {
    id: 5,
    name: 'Тулэнерго',
  },
];

app.get('/', (req, res) =>{
  res.send(' -> Hello from Express <-');
});

app.get('/projects', (req,res) =>{
  res.send(projects);
});

app.post('/projects', (req, res) =>{
  
  console.log('------------', req);
  let new_project ={
    id: Date.now(),
    name: req.body.name
  };
  projects.push(new_project);
  res.send(`You add new project ${new_project.name}`);
});

app.put('/projects/:id', (req,res)=>{
  const id = Number(req.params.id);
  let project = projects.find(el => el.id == id);
  if (id>=projects.length) res.send('Sorry, but I am not found this project');
  const project_last_name = project.name;
  project.name = req.body.name;
  res.send(`Вы обновили ${project_last_name} на ${project.name} `);
})

app.get('/projects/:id', (req,res) =>{
  //res.send(req.params);
  const id = Number(req.params.id);
  let project = projects.find(el => el.id == id);
  if (id>=projects.length) res.send('Sorry, but I am not found this project');
  res.send(`Вы находитесь в проекте ${project.name} `);
});

app.listen(3030, ()=>{
  console.log('Server start');
})


