const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    from: { type: String, required: true },
    message:  { type: String, required: true }
});

const taskSchema = new Schema({
    taskID: {
        type: Number,
        index: true,
        unique: true
    },
    userID: {
        type: Number,
        required: true
        // index: true,
        // unique: true
    },
    companyID: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    datesend: {
        type: Date
    },
    datecomplete: {
        type: Date
    },
    status: {
        type: String
    },
    selectedSubject: {
        type: String,
        required: true
    },
    chat: [messageSchema]
});

const taskModel = model('tasks', taskSchema);

// const subjectSchema = new Schema({
//     subject: { type: String, required: true }
// });

// const subjectModel = model('subjects', subjectSchema);

// module.exports = {
//     taskModel,
//     subjectModel
// };
module.exports = taskModel;



