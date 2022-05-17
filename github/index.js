import chalk from 'chalk';
import https from 'https';

const USERNAME = process.argv[2];

function getRepo(username){

  const options = {
    hostname:'api.github.com',
    path: `user/${username}/repos`,
    header: {
      'User-Agent' : 'github-app'
    }
  }

  https.get(options,res =>{
    console.log( chalk.blue(` ->  ${res.statusCode}  <-`));
  })
};

getRepo(USERNAME , (err,repo) => {
  if (err) return console.error(err.message);

  repo.forEach(el => console.log(chalk.green(` -> ${el.name}`)));
});