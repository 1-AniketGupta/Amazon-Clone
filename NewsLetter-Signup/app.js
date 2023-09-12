const express=require('express');
const bodyParser=require('body-parser');
const request=require('request');
const https=require('https'); 
const app=express();
app.listen(3000);
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.get('/',function(req,res){
    res.sendFile(__dirname+'/signup.html');
})

app.post('/',function(req,res){
    var firstName=req.body.firstName;
    var secondName=req.body.secondName;
    var email=req.body.email;
    var data={
        members :[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:secondName
                }
            }
        ]
    };
    const url="https://us21.api.mailchimp.com/3.0/lists/7936ce6766";
    const options={
        method:"POST",
        auth :"angela1:0258269432f754e14e1942933ea817b5-us21"
    }
    const jsonData= JSON.stringify(data);
    const request=https.request(url,options,function(response){
        if(response.statusCode===200)
        {
            res.sendFile(__dirname+"/success.html");

        }
        else{
            res.sendFile(__dirname+'/failure.html');
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});
app.post("/success",function(req,res){
    console.log("HEYY");
   res.redirect('/'); 
});


// API KEY
// 0258269432f754e14e1942933ea817b5-us21
// LIST ID
// 7936ce6766