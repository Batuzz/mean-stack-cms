import mongoose from 'mongoose';

const LanguageSchema = new mongoose.Schema({
    iso: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    }
});


LanguageSchema.statics = {
    get(id) {
        return this.findById(id)
            .exec()
            .then((language) => {
                return language;
            }, (err) => {
                return err;
            });
    }
};



/**
 * @typedef Language
 */
export default mongoose.model('Language', LanguageSchema, 'languages');