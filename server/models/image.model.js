import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true
    },
    descriptions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Translation'
    }],
    titles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Translation'
    }]
});


ImageSchema.statics = {
    get(id) {
        return this
            .findById(id)
            .populate({
                path: 'descriptions titles',
                populate: {
                    path: 'language'
                }
            })
            .exec()
            .then((image) => {
                return image;
            }, err => {
                return err;
            });
    }
};



/**
 * @typedef Image
 */
export default mongoose.model('Image', ImageSchema, 'images');