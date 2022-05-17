import https from 'https';
import chalk from 'chalk';

export default function getRepo(username){

  const options = {
    hostname:'api.github.com',
    path: `user/${username}/repos`,
    header: {
      'User-Agent' : 'github-app'
    }
  }

  https.get(options,res =>{
    console.log( chalk.brue(` ->  ${res.statusCode}  <-`));
  })
}