import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser',(req,res)=>{

    console.log('Hi there');
    res.send('Current User');

});


export  {router as currentUserRouter}