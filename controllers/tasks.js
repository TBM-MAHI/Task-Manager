const { Task } =require('../model/Tasks.js')
const asyncWrapper=require('../middleware/async')
//get 
const getallTasks = asyncWrapper (async (req, res) => {
        let UID = req.params.UID;
        console.log(UID);
        let alltask = await Task.find({ userID: UID });
        res.status(200).send({ alltaskz: alltask } ); 
        //res.status(200).send({ alltaskz: { alltask ,Hits.alltask.length}, 'success': true }); 
   })
//get
 /*  Route path: /users/:userId/books/:bookId
     Request URL: http://localhost:3000/users/34/books/8989
     req.params: { "userId": "34", "bookId": "8989" }  */ 
const getTask = asyncWrapper ( async (req, res) => {     
        // const { id: taskid } = req.params;  /* Here both *taskid* is same, here { property: variable that hold the value}   */
        let taskid = req.params.id;           // directly from URL 
        let getaTask = await Task.findById(taskid);
        if (!getaTask) { // if the query returns null
            return res.status(404).json({ msgs : `NO TASK WITH ID ${taskid}`} ); // error if the syntax for taskid does match 
        }                                                                        // but task is null 
        res.status(200).json({ SingleTask: getaTask }); 
    })

//post
const createTasks = asyncWrapper( async (req, res) => {
        let atask = await Task.create(req.body);
        console.log(typeof(atask))  //Object
        res.status(201).json(atask);     // the response from server side is the HTML data Requested by POST Method
    })                     

//patch
const updateTask = asyncWrapper( async (req, res)=> {
        let taskid = req.params.id;          
        let updateATask = await Task.findByIdAndUpdate(taskid, req.body, { new: true, runValidators: true });
        //runvalidators property will verify all the validation properties in the given update JSON columns  
         
        if (!updateATask) { // if the query returns null
                return res.status(404).json({ msgs: `NO TASK WITH ID ${taskid}` });
        }
        res.status(200).json({ updateATask }); 
    })

//detele
const deleteTask = asyncWrapper( async (req, res)=> {
    let taskid = req.params.id;          
    let deleteATask = await Task.findByIdAndDelete(taskid);
        if (!deleteATask) { // if the query returns null
            return res.status(404).json({ msgs: `NO TASK WITH ID ${taskid}` });
        }
        res.status(200).json({ deleteATask }); 
        //res.status(200).json({ deleteATask: null, status: 'OK' }); 
    })
   

module.exports = {
    getallTasks,
    getTask,
    createTasks,
    updateTask,
    deleteTask
}