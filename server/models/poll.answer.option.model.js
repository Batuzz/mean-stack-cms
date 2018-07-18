import mongoose from 'mongoose';

const PollAnswerOptionSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    translations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Translation'
    }],
    color: {
        type: String
    },
    hoverColor: {
        type: String
    }
});


PollAnswerOptionSchema.statics = {
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
            .then((pollQuestion) => {
                return pollQuestion;
            }, err => {
                return err;
            });
    }
};



/**
 * @typedef PollAnswerOption
 */
export default mongoose.model('PollAnswerOption', PollAnswerOptionSchema, 'poll_answer_options');