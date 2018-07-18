import mongoose from 'mongoose';

const TranslationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language',
        required: true
    },
    text: {
        type: String,
        required: true
    }
});


TranslationSchema.statics = {
    get(id) {
        return this
            .findById(id)
            .populate('language')
            .exec()
            .then((translation) => {
                return translation;
            }, (err) => {
                return err;
            });
    }
};



/**
 * @typedef Translation
 */
export default mongoose.model('Translation', TranslationSchema, 'translations');