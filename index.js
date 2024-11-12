const express=require('express');
// const mongoose=require('mongoose');
const {connect}=require('./connect');
const URL=require('./model/url')
const path=require('path');
const app=express();


connect('mongodb://127.0.0.1:27017/short-url').then(()=>console.log("dataqbase connected"));

const urlRoute=require('./routers/url');
const static=require('./routers/static');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/url',urlRoute);
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use('/',static);

app.get('/all',async(req,res)=>{
    const allurls=await URL.find({});

    return res.render('allIds',{
        urls:allurls,
    });

})

app.get('/:shortId',async(req,res)=>{
    const shortId=req.params.shortId;
   let entry= await URL.findOneAndUpdate({
        shortId,
    },{
        $push:{
           visitHistory:{timestamp:Date.now(),}
        }
    });

    if (entry && entry.redirectURL) {
        res.redirect(entry.redirectURL);
    } else {
        // Handle the case where entry is null or redirectURL is missing
        res.status(404).send("URL not found.");
    }
    
});

const port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`server started at :- http://localhost:${port}`);
})