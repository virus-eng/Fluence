import express from 'express';
import mongoose from 'mongoose';
import user_data from './../models/user_data.js';
const router = express.Router();
const db = await mongoose.connect('mongodb://localhost:27017/fluence');

let keyframes = {
    keyframe_name_validation(name){
        if(name == undefined || name == "") return false;
        let lower_name = name.toLowerCase();
        if((name[0] != '-' && name[0] != '_' && (name[0] < 'A' || name[0] > 'Z') && (name[0] < 'a' || name[0] > 'z')) || (lower_name == "none" || lower_name == "unset" || lower_name == "initial" || lower_name == "inherit" || lower_name == "revert" ||  lower_name == "default")) return false;
        if(name.length > 1) if(name[0] == '-' && (name[1] >= '0' && name[1] <= '9')) return false;
        for(let i = 1; i < name.length; i++)  if(name[i] != '-' && name[i] != '_' && (name[i] < 'A' || name[i] > 'Z') && (name[i] < 'a' || name[i] > 'z') && (name[i] < '0' || name[i] > '9')) return false;
        return true;
    }
}

let projects = await user_data.find({"username" : {$exists : true}}).select("projects").lean();

router.use(async (req, res, next) => {
    let response = await user_data.findOne({"username" : req.body["created_by"], "auth" : req.body.auth}).lean();
    if(response == null) res.send(-1);
    else{
        next();
    }
});


function validate_project(obj){
    if("name" in obj == false || "created_by" in obj == false || obj.name.length === 0) return false;
    return true;
}

function unique_id_gen(obj){
    return Object.keys(obj).length + 1;
}

router.post('/save', async (req, res) => {
    try{
        await user_data.updateOne({"username" : req.body["created_by"]}, {$set : {[`projects.${req.body.id}.project_state`] : req.body.project_state}});
        let response = await user_data.findOne({"username" : req.body["created_by"]}).lean();
        res.send(1);
    }
    catch{
        res.send(0);
    }
});

router.post('/initiallize', async (req, res)=>{

//    await user_data.updateOne({"username" : req.body["created_by"]}, {$set : {"projects" : {'hello' : {}, 'hello2' : {}}}});
//    let user = await user_data.findOne({"username" : "HARSH70"}).lean();
//    res.json(user);
    
    if(validate_project(req.body) === false) res.send(0);
    else{
        let user_projects = await user_data.findOne({"username" : req.body["created_by"]}).lean();
        user_projects = user_projects.projects;
       
        let unique_id = unique_id_gen(user_projects);

        let new_project_obj = {
            "id" : unique_id,
            "name" : req.body.name,
            "created_by" : req.body["created_by"],
            "project_state" : {"elements_count" : 0, "names_count" : -1},
        }

        user_projects[new_project_obj.id] = new_project_obj;
        await user_data.updateOne({"username" : req.body["created_by"]}, {$set : {"projects" : user_projects}});
        new_project_obj = await user_data.findOne({"username" : req.body["created_by"]}).lean();
        res.json(new_project_obj.projects[unique_id]);
    }
});

router.post('/saved', async (req, res) => {
    let user_obj = await user_data.findOne({"username" : req.body["created_by"]}).lean();
    let projects_list = {};
    for(let key in user_obj.projects) projects_list[key] = user_obj.projects[key].name;
    res.json(projects_list);
});

router.post('/load', async (req, res) => {
    let user_obj = await user_data.findOne({"username" : req.body["created_by"]}).lean();
    res.json(user_obj.projects[req.body["project_id"]]);
});

router.post('/component/create', async (req, res) => {
    if(req.body.component_name == null){
        res.send(-2);
        return;
    }

    if(req.body.component_name.length < 1){
        res.send(-2);
        return;
    }
        let components = await user_data.findOne({"username" : req.body.created_by}).select([`projects.${req.body.id}.components`]).lean();
        console.log(components.projects[req.body.id])
        if(Object.keys(components.projects[req.body.id]) == 0){
            await user_data.updateOne({"username" : req.body.created_by}, {$set : {[`projects.${req.body.id}.components.${req.body.component_name}`] : req.body.component_content}});
            res.send(1);
            return;
        }
        if(req.body.component_name in components.projects[req.body.id].components == false){
            console.log("else");
            await user_data.updateOne({"username" : req.body.created_by}, {$set : {[`projects.${req.body.id}.components.${req.body.component_name}`] : req.body.component_content}});
            res.send(1);
        }
        else res.send(-1);
    
});

router.post('/component/save', async(req, res) => {
    try{
        let response = await user_data.updateOne({"username" : req.body.created_by}, {$set : {[`projects.${req.body.id}.components.${req.body.component_name}`] : req.body.component_content}});
        res.send(1);
    }
    catch{
        res.send(0);
    }
});

router.post("/selectors/rule_idx_update", async (req, res) => {
    let user_obj = await user_data.findOne({"username" : req.body.created_by}).select(`projects.${req.body.id}.selector_order`);
    let selector_order = user_obj.projects[req.body.id].selector_order;
    for(let i = 0; i < selector_order.length; i++) selector_order[i].index = req.body.selector_rule_order[i];
    await user_data.updateOne({"username" : req.body.created_by}, {$set : {[`projects.${req.body.id}.selector_order`] : selector_order}});
    res.send(1);
});

router.post("/keyframes/create", async (req, res)=>{
    if(keyframes.keyframe_name_validation(req.body.keyframe_name) == false){
        res.send(0);
        return;
    }
    
    let keyframes_obj = await user_data.findOne({"username" : req.body.created_by}).select([`projects.${req.body.id}.directives.keyframes`]).lean();
    if(Object.keys(keyframes_obj.projects[req.body.id]) == 0){
        await user_data.updateOne({"username" : req.body.created_by}, {$set : {[`projects.${req.body.id}.directives`] : {"keyframes" : {}, "media" : {}}}});
        await user_data.updateOne({"username" : req.body.created_by}, {$set : {[`projects.${req.body.id}.directives.keyframes.${req.body.keyframe_name}`] : {"animation" : {}, "type" : req.body.keyframe_type}}});
    }
    else{
        if(req.body.keyframe_name in keyframes_obj.projects[req.body.id].directives.keyframes){
            res.send(0);
            return;
        }
        else  await user_data.updateOne({"username" : req.body.created_by}, {$set : {[`projects.${req.body.id}.directives.keyframes.${req.body.keyframe_name}`] : {"animation" : {}, "type" : req.body.keyframe_type}}});
    }
    res.send(1);
});

router.post("/keyframes/save", async (req, res)=>{
    await user_data.updateOne({"username" : req.body.created_by}, {$set : {[`projects.${req.body.id}.directives.keyframes.${req.body.keyframe_name}.animation`] : req.body.animation}});
    res.send(1);
});

router.post("/selectors/save", async (req, res)=>{
    let project_obj = await user_data.findOne({"username" : req.body.created_by}).select(`projects.${req.body.id}.selector_order`).lean();
    if(Object.keys(project_obj.projects[req.body.id]) == 0){
        let new_array = new Array();
        new_array.push(req.body.selector_obj);
        await user_data.updateOne({"username" : req.body.created_by}, {$set : {[`projects.${req.body.id}.selector_order`] : new_array}}); 
        res.send(1);
        return;
    }
    else{
        let selector_order = project_obj.projects[req.body.id].selector_order;
        let new_array;
        if(req.body.mode == 0){
            new_array = new Array(selector_order.length + 1);
            for(let i = 0; i < new_array.length; i++){
                if(i == req.body.index) new_array[i] = req.body.selector_obj;
                else if(i > req.body.index) new_array[i] = selector_order[i-1];
                else new_array[i] = selector_order[i];
            }
        }
        else if(req.body.mode == 1){
            new_array = new Array(selector_order.length);
            for(let i = 0; i < new_array.length; i++){                
                if(i >= req.body.old_index) new_array[i] = selector_order[i + 1];
                else new_array[i] = selector_order[i];
            }
            for(let i = 0; i < new_array.length; i++){
                if(i == req.body.index) new_array[i] = req.body.selector_obj;
                else if(i > req.body.index) new_array[i] = selector_order[i-1];
                else new_array[i] = selector_order[i];
            }
        }
        else{
            selector_order[req.body.index] = req.body.selector_obj;
            new_array = selector_order;
        }
        await user_data.updateOne({"username" : req.body.created_by}, {$set : {[`projects.${req.body.id}.selector_order`] : new_array}}); 
        res.send(1);
    }
});

export default router;