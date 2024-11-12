const shortid = require('shortid');
const URL=require('../model/url');

async function generateNewShortUrl(req,res){
    const shortId=shortid(8);
    const body=req.body;
    if(!body.url)res.status(400).json({error:"url is required"});
    
    await URL.create({
         shortId:shortId,
         redirectURL:body.url,
         visitHistory:[],
    })


    return res.render('home',{
        id:shortId,
    })

}

async function getAllIds(req,res){
  const id=req.params.shortId;
  const result=await URL.findOne({shortId:id});

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics : result.visitHistory,
  })
}

module.exports={
    generateNewShortUrl,
    getAllIds,
}