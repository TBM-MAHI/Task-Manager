const express = require('express');
const router = express.Router(); //router object is an isolated instance of middleware and routes.

const { createTasks, deleteTask, getTask, getallTasks, updateTask } = require('../controllers/tasks');
const { create_newUser, VerifyUser } = require('../controllers/users');
//console.log(typeof(deleteTask));

router.route('/all').get(getallTasks).post(createTasks);  //the default route 
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);
router.route('/register').post(create_newUser);
router.route('/login/:name/:pass').get(VerifyUser);

module.exports = router;