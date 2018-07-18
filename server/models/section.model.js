import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sequence: {
        type: Number
    },
    translations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Translation'
    }],
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }
});


SectionSchema.statics = {
    get(id) {
        return this
            .findById(id)
            .populate({
                path: 'translations image',
                populate: {
                    path: 'language descriptions titles'
                }
            })
            .exec()
            .then((section) => {
                return section;
            }, err => {
                return err;
            });
    }
};



/**
 * @typedef Section
 */
export default mongoose.model('Section', SectionSchema, 'sections');