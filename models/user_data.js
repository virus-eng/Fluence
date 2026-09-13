import mongoose from 'mongoose';
const user_data = new mongoose.Schema({
    "username" : {type : String, required : true},
    "password" : {type : String, required : true },
    "email" : {type : String, required : true},
    "projects" : {type : Object, required : true, validate : {validator : function(obj){
        if(Object.keys(obj).length == 0) return false;
        else return true;
    }}},
    "auth" : {type : String, required : true}
});

const user_data_model = mongoose.model('user_data', user_data);
export default user_data_model;