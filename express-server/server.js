import config from 'config';
import express from 'express';
import bodyParser from 'body-parser';
import { default as mongodb } from 'mongodb';
let MongoClient = mongodb.MongoClient;
let ObjectID = mongodb.ObjectId;
//const express = require('express');

let app = express();
let db;


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
  //res.send(projects);
  db.collection('projects').find().toArray( (err,all) =>{
    if (err) {
      console.error(err.message); 
      return res.sendStatus(500);
    }
    res.send(all);
  })
});

app.post('/projects', (req, res) =>{
  let new_project ={
    name: req.body.name
  };
  db.collection('projects').insert(new_project, (err, result) => {
    if (err) {console.error(err.message); return res.sendStatus(500);}
    res.send(new_project);
  });
  //projects.push(new_project);
  
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
  const id = ObjectID(req.params.id);
  db.collection('projects').findOne({_id: id}, (err, one) =>{
    if (err) {
      console.error(err.message); 
      return res.sendStatus(500);
    }

    res.send(one);
  });

});



MongoClient.connect('mongodb://127.0.0.1:27017/projects', (err, database)=>{
  if (err) return console.error(err.message);
  db = database.db('projects');
  app.listen(3030, ()=>{
    console.log('Server start');
  })
});


