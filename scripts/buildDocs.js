const fs = require("fs");
const readline = require("readline");
const shell = require("shelljs");
fs.rename("./docs", `./docsBuckup/docs_${new Date().getTime()}`, (err) => {
  if (err) throw err;
  console.log("「docs buckup successfully」");
});

fs.rename("./dist", "./docs", (err) => {
  if (err) throw err;
  console.log("「dist renamed to docs successfully」");
});

fs.writeFile("./docs/CNAME", "mrbk.xyz", { flag: "a+" }, (err) => {
  // if (err) throw err;
  console.log("「CNAME file created successfully」");
});

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question("input git message:", (message) => {
  shell.exec("git add .");
  shell.exec(`git commit -m ${message}`);
  shell.exec("git pull");
  shell.exec("git push");
  console.log("「git commit successfully」");
  rl.close();
});
