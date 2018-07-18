import mongoose from 'mongoose';

const SubmenuSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    sequence: {
        type: Number
    },
    url: {
        type: String,
        required: true
    },
    translations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Translation'
    }]
});


SubmenuSchema.statics = {
    get(id) {
        return this
            .findById(id)
            .populate({
                path: 'translations',
                populate: {
                    path: 'language'
                }
            })
            .exec()
            .then((submenu) => {
                return submenu;
            }, err => {
                return err;
            });
    }
};



/**
 * @typedef Submenu
 */
export default mongoose.model('Submenu', SubmenuSchema, 'submenus');