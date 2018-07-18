import mongoose from 'mongoose';

const MenuSchema = new mongoose.Schema({
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
    }],
    submenus: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submenu'
    }]
});


MenuSchema.statics = {

    get(id) {
        return this
            .findById(id)
            .populate({
                path: 'translations submenus',
                populate: {
                    path: 'language translations',
                    populate: {
                        path: 'language'
                    }
                }
            })
            .exec()
            .then((menu) => {
                return menu;
            }, err => {
                return err;
            });
    }
};



/**
 * @typedef Menu
 */
export default mongoose.model('Menu', MenuSchema, 'menus');