let fs=require("fs");
let a=["./f1.txt","./f2.txt"]
for(i=0;i<a.length;i++){
fs.readFile(a[i],function(error,data){
    console.log(data+"");
})
        
    
}