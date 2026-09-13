import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import user_data from './../models/user_data.js';
import auth_gen from './../utility/auth_gen.js';

const db = await mongoose.connect('mongodb://localhost:27017/fluence');
router.post('/', async (req, res)=>{
    let search_username_response = await user_data.findOne({"username" : req.body.username}).lean();
    let search_email_response = await user_data.findOne({"email" : req.body.email}).lean();
    if(search_username_response != null){
        res.json({"reason" : "username"})
        return;
    }
    else if(search_email_response != null){
        res.json({"reason" : "email"});
        return;
    }
    
    try{
        req.body["auth"] = "ijedfjhiw";
        let user_data_document = new user_data(req.body);
        await user_data_document.save();
        let token = auth_gen();
        await user_data.updateOne({"username" : req.body.username}, {$set : {"auth" : token}});
        let user_obj = await user_data.findOne({"username" : req.body["username"]}).lean();
        delete user_obj.password;
        delete user_obj.projects;
        res.json(user_obj);
    }
    catch{
        res.send(422);
    }
    
});

export default router;