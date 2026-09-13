import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import user_data from './../models/user_data.js';
import auth_gen from './../utility/auth_gen.js';

const db = await mongoose.connect('mongodb://localhost:27017/fluence');  // Locally hosted database

async function user_validation(obj){
    let response = await user_data.findOne({"username" : obj.username}).lean();
    if(response == null) return 404;
    else if(response.password != obj.password) return 401;
    else return true;
}

router.post('/', async (req, res) => {
    let validation_response = await user_validation(req.body);
    if(validation_response != true){
        res.send(validation_response);   
        return;
    }
    let token = auth_gen();
    await user_data.updateOne({"username" : req.body.username}, {$set : {"auth" : token}});
    let user_obj = await user_data.findOne({"username" : req.body.username}).lean();
    delete user_obj.password;
    delete user_obj.projects;
    res.json(user_obj);
});

router.post('/auth', async (req, res) => {
    let user_obj = await user_data.findOne({"username" : req.body.username, "auth" : req.body.auth}).lean();
    if(user_obj == null) res.send(0);
    else{
        delete user_obj.password;
        delete user_obj.projects;
        res.json(user_obj);
    }
});

export default router;