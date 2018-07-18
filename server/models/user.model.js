import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String
    }
});


UserSchema.statics = {
    get(id) {
        return this
            .findById(id)
            .exec()
            .then((user) => {
                return user;
            }, err => {
                return err;
            });
    }
};

/**
 * Pre-save method that is hashing the password.
 */
UserSchema.pre('save', function (next) {
    let user = this;

    if (!user.isModified('password'))
        return next();

    bcrypt.hash(user.password, 10, function (err, hash){
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});



/**
 * @typedef User
 */
export default mongoose.model('User', UserSchema, 'users');