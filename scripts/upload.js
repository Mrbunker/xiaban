const shell = require("shelljs");

const message = require("yargs").argv._[0];
shell.exec("git add .");
shell.exec(`git commit -m ${message}`);
shell.exec("git pull");
shell.exec("git push");
console.log("「upload successfully」");
