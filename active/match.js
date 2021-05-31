const request =require("request");
const cheerio=require("cheerio");
const fs=require("fs");
let leaderboard=[];
let count=0;
function getallLink(link){
    console.log("data sending",count);
    //  console.log(link);
    // console.log("hellooo");
request(link,cb);
count++;
}
function cb(error,response,data){
    count--;
    console.log("data received",count);
    parseData(data);
    if(count==0)
    {
        console.table(leaderboard);
    }
}
function parseData(data){
    let ch =cheerio.load(data);
    // console.log(data);
    // <div class="collapsoable"> </div>
    
    let bothInings=ch(".match-scorecard-page .Collapsible");
    //  fs.writeFileSync("./bothInings.html",bothInings+"");
   
   //process to find all team name
   for(i=0;i<bothInings.length;i++){
       let teamName=ch(bothInings[i]).find("h5").text();
        teamName= teamName.split("INNINGS")[0].trim();
       //all batsman inning
       let alltr=ch(bothInings[i]).find(".table.batsman tbody tr");
   // [<tr></tr>]
      for(j=0;j<alltr.length-1;j++){
          let alltd=ch(alltr[j]).find("td");
          if(alltd.length>1){
              //valid td
              let battsman_Name=ch(alltd[0]).find("a").text().trim();
              let runs=ch(alltd[2]).text().trim();
              let balls=ch(alltd[3]).text().trim();
              let fours=ch(alltd[5]).text().trim();
              let six=ch(alltd[5]).text().trim();
              let strikeRate=ch(alltd[7]).text().trim();
        //  console.log(`Batsman=${battsman_Name} runs=${runs} balls=${balls} fours=${fours} six=${six} StrikeRate=${strikeRate} `);
    processDetail(teamName,battsman_Name,runs,balls,fours,six);
    
    }
      }   
   }

}
function processDetail(teamName,battsman_Name,runs,balls,fours,six)
    {
       
        runs=Number(runs);
        balls=Number(balls);
        fours=Number(fours);
        six=Number(six);
     for(i=0;i<leaderboard.length;i++){
        let entry=leaderboard[i];
         if(teamName==entry.team && battsman_Name==entry.battsman){
             entry.Run+=runs;
             entry.Balls+=balls;
             entry.Fours+=fours;
             entry.Six+=six;
             return ;
         }
     

        }

        let entry={
          team :teamName,
          battsman :battsman_Name,
          Run : runs,
          Balls :balls,
          Fours :fours,
          Six :six
        }
        leaderboard.push(entry);
    }

        


// function processDetail(teamName,battsman_Name,runs,balls,fours,six,strikeRate){
     
//     let isteamfolder=checkFolder(teamName);
// if(isteamfolder){
// let isbattsman=checkBattsman(teamName,battsman_Name);
//  if(isbattsman){
//     updateBattsmanFile(teamName,battsman_Name,runs,balls,fours,six,strikeRate);
//  }
//  else{
//     createBattsManFile(teamName,battsman_Name,runs,balls,fours,six,strikeRate);
//  }
// }
// else{
//     // console.log("ddd");
//     createTeamFolder(teamName);
//     createBattsManFile(teamName,battsman_Name,runs,balls,fours,six,strikeRate);
// }
// }
// function checkFolder(teamName){
//     let path=`./IPL/${teamName}`;
//     console.log(fs.existsSync(path));
//     return fs.existsSync(path);
// }
// function checkBattsman(teamName,battsman_Name){
//     let battasmanpath=`./IPL/${teamName}/${battsman_Name}.json`;
//    return fs.existsSync(battasmanpath);
// }
// function updateBattsmanFile(teamName,battsman_Name,runs,balls,fours,six,strikeRate){
//     let battasmanpath=`./IPL/${teamName}/${battsman_Name}.json`;
//     let battsmanFile=fs.readFileSync(battasmanpath);
//   battsmanFile=JSON.parse(battsmanFile);
//     let inning={
//         Run :runs,
//         Balls :balls,
//         Fours :fours,
//         Six : six,
//         StrikeRate :strikeRate
//     }
//     fs.writeFileSync(battasmanpath,JSON.stringify(battsmanFile));
// }
// function createBattsManFile(teamName,battsman_Name,runs,balls,fours,six,strikeRate){
//     let battasmanpath=`./IPL/${teamName}/${battsman_Name}.JSON`;
//     console.log(battasmanpath);
//     let battsmanFile=[];
//     let inning={
//         Run :runs,
//         Balls :balls,
//         Fours :fours,
//         Six : six,
//         StrikeRate :strikeRate
//     }
//     battsmanFile.push(inning);
//     fs.writeFileSync(battasmanpath,JSON.stringify(battsmanFile));
// }
// function createTeamFolder(teamName){
//     let path=`./IPL/${teamName}`;
//     fs.mkdirSync(path);
// }
module.exports=getallLink;
 