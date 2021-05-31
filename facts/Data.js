const request=require("request");
// creating higher order function
let link="https://www.pepcoding.com";
request(link,cb);
//create call back function cb
function cb(error,response,data){
console.log(data);
}
