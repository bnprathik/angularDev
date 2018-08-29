var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProfileSchema = new Schema({
    username:{
        type:String
    },
    emailid: {
        type: String
    },
    userId:{
        type :String
    },
    role:{
        type:String
    },
    address:{
        type:[String]
    },
    genres:{
        type:[String]
    },
    profilePic:{
        type:String
    },
    libraryId:{
        type:Number
    }
});
const Profile = module.exports = mongoose.model('Profile', ProfileSchema);