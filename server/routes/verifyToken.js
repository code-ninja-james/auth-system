const jwt=require('jsonwebtoken');

require('dotenv').config();

const tokenConfig = process.env.TOKEN;

module.exports=function(req,res,next){
    const token =req.header('auth-token')
    if(!token)return res.status(401).send('Acess denied');

    //verify token
    try{
const verified=jwt.verify(token,tokenConfig)
req.user=verified;
next();
    }catch(error){
res.status(400).send('Invalid token')
    }

}