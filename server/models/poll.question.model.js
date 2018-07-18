import mongoose from 'mongoose';

const PollQuestionSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    translations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Translation'
    }],
    answerOptions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PollAnswerOption'
    }]
});


PollQuestionSchema.statics = {
    get(id) {
        return this
            .findById(id)
            .populate({
                path: 'translations answerOptions',
                populate: {
                    path: 'language translations',
                    populate: {
                        path: 'language'
                    }
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
 * @typedef PollQuestion
 */
export default mongoose.model('PollQuestion', PollQuestionSchema, 'poll_questions');