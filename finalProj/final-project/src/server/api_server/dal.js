const model = require('./shcema');

// create task by sending paramters in the body request, status && datesend && taskID create by the server
async function insertNewTask(body) {
    let taskObj = new model({
        taskID: Date.now(),
        userID: body.userID,
        companyID: body.companyID,
        title: body.title,
        datesend: Date.now(),
        status: 'Active',
        selectedSubject:body.selectedSubject,
        chat: body.chat
    });
    return await taskObj.save();
}

// read tasks by user ID
function findTasksUser(userID) {
    return model.find({ userID: userID }, function(err) {
        if (err) {
            throw err;
        }
    });
}
// read tasks by company ID
function findTasksCompany(companyID) {
    return model.find({ companyID: companyID }, function(err) {
        if (err) {
            throw err;
        }
    });
}

// update status by task ID , only if status=Active, change status to Completed and create complete date by date now
async function updateStatus(taskID) {
    return await model.findOneAndUpdate({ taskID: taskID, status: "Active" }, { $set: { status: "Completed", datecomplete: Date.now() } }, { new: true });
}

// update chat array by task ID , updated chat sent to request body 
async function updateChat(req) {
    return await model.findOneAndUpdate({ taskID: req.taskID}, { $set: { chat: req.body.chat} }, { new: true });
}

// delete task by task ID , only if status=Completed
async function deleteTaskFromDb(taskID) {
    return await model.findOneAndDelete({ taskID: taskID, status: "Completed" });
}

module.exports = {
    findTasksUser,
    findTasksCompany,
    insertNewTask,
    updateStatus,
    updateChat,
    deleteTaskFromDb
};