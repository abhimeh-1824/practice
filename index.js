const express = require("express");
const fs = require("fs");
const app = express();
const filePath = "./user.json";
const crypto = require("crypto");
app.use(express.json());
//  create data sava in file.
const saveUserData = (userData) => {
  const stringifyData = JSON.stringify(userData);
  fs.writeFileSync("./user.json", stringifyData);
};

//  read file
const readUserData = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

app.patch("/user/update/:id", (req, res) => {});

app.delete("/user/delete/:id", (req, res) => {});

app.post("/login", (req, res) => {
    try {
        var existUsers = readUserData();
        var mykey = crypto.createDecipher('aes-128-cbc', 'mypassword');
        var mystr = mykey.update(req.body.password, 'hex', 'utf8')
        mystr += mykey.final('utf8');
    } catch (error) {
        
    }
});

app.post("/register", (req, res) => {
  
  try {
    var existUsers = readUserData();
    var check = false
    for(var i=0; i<existUsers.length; i++)
    {
        if(existUsers[i].email===req.body.email)
        {
            console.log(existUsers[i].email)
            check = true;
            break
        }
    }
    if(check)
    {
        res.send({success:false,message:"account already exit"})
    }
    else{
    const newUserId = Math.floor(100000 + Math.random() * 900000);
    let id = "userId" + newUserId;
    var obj = req.body
    obj["id"] = id
    existUsers.push(obj)
    var myuserkey = crypto.createCipher("aes-128-cbc", "mypassword");
    var myuserpassword = myuserkey.update(req.body.password, "utf8", "hex");
    myuserpassword += myuserkey.final("hex");
    existUsers[id].password = myuserpassword
    saveUserData(existUsers);
    res
      .status(200)
      .send({
        success: true,
        msg: "user Registration Susscefull successfully",
      });

    }
  } catch (error) {
    res.status(400).send({error})
  }
});

app.listen("8085", () => {
  try {
    console.log("working on 8085");
  } catch (error) {
    throw error;
  }
});
