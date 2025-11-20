import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
        unique: true,
        match: [
            /^[a-zA-Z0-9_]+$/,
            'Username can only contain letters, numbers, and underscores'
        ]
    },
    email: {
        type: String,
        required:[ true, 'Email is required' ],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Please fill a valid email address'
        ]
    },
    password: {
        type: String,
        required: [ true, 'Password is required' ],
        minlength: 6
    },
    avatar: {
        type: String,
    }
}, {
    timestamps: true
});

userSchema.pre('save', function(next) {
    const user = this;
    user.avatar = `https://robohash.org/${user.username}`;
    next();
});

const User = mongoose.model('User', userSchema);

export default User;