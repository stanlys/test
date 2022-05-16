import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { constants } from 'buffer';

function create(title, content){
  fs.readFile('notes.json', (err, data) =>{
    if (err) return console.error(err.message);
    const notes = JSON.parse(data);
    notes.push({title, content});
    const json = JSON.stringify(notes);
    fs.writeFile('notes.json',json, (err) =>{
      if (err) return console.error(err.message);
      console.log(chalk.green('-> Task create <-'));
    })
  });
}

function list(){
  fs.readFile('notes.json', (err,data) =>{
    if (err) return console.log(err.message);
    const notes = JSON.parse(data);
    notes.forEach((note, index) => {
      console.log(chalk.yellow(`Task${index+1} -> ${note.title}`));
    });
  });
}

function view(title){
  fs.readFile('notes.json',(err, data) => {
    if (err) return console.log(err.message);
    const notes = JSON.parse(data);
    const note = notes.find( note => note.title === title);
    if (note) {
      console.log(chalk.blue(note.title));
    }else{
      console.log(chalk.red('Task not found'));
    }
  });
}

function remove(){
  fs.readFile('notes.json',(err, data) => {
    if (err) return console.log(err.message);
    let notes = JSON.parse(data);
    notes = notes.filter(note => note.title !== title);
    const json = JSON.stringify(notes);
    fs.writeFile('notes.json',json, err => {
      if (err) return console.log(err.message);
      console.log(chalk.red('Task was remove'));
    });
  });
}

const [command, title, content] = process.argv.slice(2);

switch (command){
  case 'list': 
    list();
    break;
  case 'create':
    create(title, content);
    break;
  case 'view':
    view(title);
    break;
  case 'remove':
    remove(title);
    break;
  default: console.log(chalk.red('-> Unknown command! <-'));
}

