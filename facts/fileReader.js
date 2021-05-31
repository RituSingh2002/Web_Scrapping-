const fs=require("fs");
const cheerio =require("cheerio");
let dataOfHtml=fs.readFileSync("index.html");
// console.log(dataOfHtml+"");
//access the text from the h1 or any tag inside a html file
 
let content=cheerio.load(dataOfHtml);
//on the basis of element
console.log(content("h1").text());
//on the basis of class
console.log(content(".first").text());