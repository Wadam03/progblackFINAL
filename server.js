const express = require("express");
const bodyparser = require("body-parser");
const fs = require("fs");
const app = express();

app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static('client'));
app.use(express.json());

app.post("/addComment", function(req, resp){
    let username = req.body["username"]
    let comment = req.body["comment"]

    let data = fs.readFileSync("comments.dat", "utf-8").split("\n")
    let tempData = []
    if(fs.readFileSync("comments.dat", "utf-8").length > 1){
        for(let i = 0; i < data.length; i++){
            tempData.push(JSON.parse(data[i]))
        }
        tempData.push({
            "username": username,
            "comment": comment
        })   
        let writeString = ""
        for(let i = 0; i < tempData.length; i++){
            let temp = JSON.stringify(tempData[i])
            if(i < tempData.length - 1){
                writeString += temp + "\n"
            }
            else{
                writeString += temp
            }
        }
        fs.writeFileSync("comments.dat", writeString)
        resp.send({"commentNumber":tempData.length})

    }
    else{
        fs.writeFileSync("comments.dat", JSON.stringify({
            "username": username,
            "comment": comment
        }))
        resp.send({"commentNumber":1})
    }

})

app.get("/getComments", function(req, resp){
    resp.send({"content": fs.readFileSync("comments.dat", "utf-8")})
})

app.get("/getComment/:index",function(req,resp)
{
    let data = fs.readFileSync("comments.dat", "utf-8").split("\n")
    resp.send({"content": data[req.params.index]})
})

app.listen(8090);

