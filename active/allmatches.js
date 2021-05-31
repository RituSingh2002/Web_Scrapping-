const request=require("request");
const cheerio=require("cheerio");
const getallLink = require("./match");
function getAllmatche(link){
    request(link,cb);
}
function cb(error,response,data){
    if(error==null){
        parseData(data);
    }
    else if(response.statusCode==404){
        console.log("page is not found Error:")
    }
}
function parseData(html){
     let ch=cheerio.load(html);
     let allTags=ch('a[data-hover="Scorecard"]')
    
    for(var i=0;i<allTags.length;i++){
       let link=ch(allTags[i]).attr("href");
       let completLink=`https://www.espncricinfo.com/${link}`;
    //    console.log(completLink);
       getallLink(completLink);
    }
}
module.exports=getAllmatche;