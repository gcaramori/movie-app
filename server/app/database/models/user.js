const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6      
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    birth: {
        type: String,
        required: true
    },
    profile_pic: {
        type: String,
        required: true
    }
}, { timestamps: true });

// UserSchema.pre('deleteMany', function(next) {
//     var user = this;
//     user.model('Store').deleteOne({ 'users.id': user._id }, next);
// });

module.exports = mongoose.model('User', UserSchema);