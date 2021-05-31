const request=require("request");
const cheerio=require("cheerio");
const fs=require("fs");
const getAllmatche = require("./allmatches");
//let link="https://www.espncricinfo.com/";
let link="https://www.espncricinfo.com/series/ipl-2020-21-1210595";
request(link,cb);
function cb(error,response,data){
    if(error==null){
//data has come
   //console.log(data);
parseData(data);

    }
    else if(response.statusCode==404){
        console.log("page is not found");
    }
    else{

    }
}
//create function parseData
function parseData(html)
{
    let ch=cheerio.load(html);
    let h=ch(".widget-items.cta-link a").attr("href");
    let completLink=`https://www.espncricinfo.com/${h}`;
 //   console.log(completLink);
    getAllmatche(completLink);
}