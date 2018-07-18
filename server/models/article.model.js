import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    translations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Translation'
    }],
    sections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section'
    }]
});


ArticleSchema.statics = {
    get(id) {
        return this
            .findById(id)
            .populate({
                path: 'translations sections',
                populate: {
                    path: 'language translations image',
                    populate: {
                        path: 'language titles descriptions'
                    }
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
 * @typedef Article
 */
export default mongoose.model('Article', ArticleSchema, 'articles');