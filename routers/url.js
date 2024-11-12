const express=require('express');

const {generateNewShortUrl,getAllIds}=require('../controller/url')

const router=express.Router();

router.post('/',generateNewShortUrl);


router.get('/analytics/:shortId',getAllIds);

module.exports=router;
