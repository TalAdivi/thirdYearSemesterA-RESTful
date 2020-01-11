const dal = require('./dal')


async function getTasksUser(req, res) {
    try {
        const data = await dal.findTasksUser(req.userID);
        if (data.length == 0) {
            res.status(200).json({
                status:200,
                message: 'success',
                action: "Read",
                data: "No tasks was found for this user ID"
            });
        } else {
            res.status(200).json({
                message: null,
                action: "Read",
                data: data
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
            action: "Read",
            data: null
        })
    }
}

async function getTasksCompany(req, res) {
    try {
        const data = await dal.findTasksCompany(req.companyID);
        if (data.length == 0) {
            res.status(200).json({
                err: null,
                action: "Read",
                data: "No tasks was found for this company ID"
            });
        } else {
            res.status(200).json({
                err: null,
                action: "Read",
                data: data
            })
        }
    } catch (err) {
        res.status(500).json({
            err: err.message,
            action: "Read",
            data: null
        })
    }
}



async function createNewTask(req, res) {
    try {
        const data = await dal.insertNewTask(req.body);
        console.log(data);
        res.status(200).json({
            err: null,
            action: "Create",
            data: data
        })

    } catch (err) {
        res.status(500).json({
            err: err.message,
            action: "Create",
            data: null
        })
    }
}

async function updateStatusTask(req, res) {
    try {
        const data = await dal.updateStatus(req.taskID);
        if (data == null) {
            res.status(200).json({
                err: null,
                action: "Update",
                data: "No task / task with status active was found for this task ID"
            });
        } else {
            res.status(200).json({
                err: null,
                action: "Update",
                data: data
            })
        }
    } catch (err) {
        res.status(500).json({
            err: err.message,
            action: "Update",
            data: null
        })
    }
}


async function updateChatTask(req, res) {
    try {
        const data = await dal.updateChat(req);
        if (data == null) {
            res.status(200).json({
                err: null,
                action: "Update",
                data: "No task was found for this task ID"
            });
        } else {
            res.status(200).json({
                err: null,
                action: "Update",
                data: data
            })
        }
    } catch (err) {
        res.status(500).json({
            err: err.message,
            action: "Update",
            data: null
        })
    }
}

async function deleteTask(req, res) {
    try {
        const data = await dal.deleteTaskFromDb(req.taskID);
        if (data == null) {
            res.status(200).json({
                err: null,
                action: "Delete",
                data: "No task / task with status active was found for this task ID"
            });
        } else {
            res.status(200).json({
                err: null,
                action: "Delete",
                data: data
            })
        }
    } catch (err) {
        res.status(500).json({
            err: err.message,
            action: "Delete",
            data: null
        })
    }
}

module.exports = {
    getTasksUser,
    createNewTask,
    updateStatusTask,
    updateChatTask,
    getTasksCompany,
    deleteTask
};