const express = require('express');

const port = 3000;

let users = [{
    name:"xyz",
    kidneys:[{
        healthy : false
    },{
        healthy : true
    }]
}]

const app = express();
app.use(express.json());
app.get('/', function(req,res){
    // return no of kidneys , healthy, unhealthy

    const totalKidneys  = users[0].kidneys.length;
    let healthy  = 0;

    for(var i = 0; i < users[0].kidneys.length; i++){
        if(users[0].kidneys[i].healthy){
            healthy++;
        }
    }

    let unhealthy = totalKidneys - healthy;

    res.json({
        totalKidneys,
        healthy,
        unhealthy
    })
    
})

app.post('/',function(req,res){

    healthy = req.body.isHealthy;

    users[0].kidneys.push({healthy});

    res.send("kidney added!");

})

app.put('/', function(req,res){
    
    // for(let i = 0; i < users[0].kidneys.length;i++){
    //     if(users[0].kidneys[i].healthy == false){
    //         users[0].kidneys[i].healthy = true;
    //     }
    // }
    // res.send({});

    //using map
    users[0].kidneys = users[0].kidneys.map((x) =>  {
        if(!x.healthy){
            x.healthy = true;
            return x;
        }
        else return x;
    });

    res.send("kidney added");

})

app.delete('/', function(req,res){
    // let kidneys = [];
    // for(let i = 0; i < users[0].kidneys.length; i++){
    //     if(users[0].kidneys[i].healthy){
    //         kidneys.push({healthy : users[0].kidneys[i].healthy});
    //     }
    // }
    //using filter
    let kidneys = users[0].kidneys.filter((x) => {return x.healthy?true:false})

    users[0].kidneys = kidneys;
    res.json(users);
})

app.listen(port, function(){
    console.log('listening on port ${port}');
})