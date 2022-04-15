const { Task , U } =require('../model/Tasks.js')

//get 
const getallTasks = async (req, res) => {
    try {
        let alltask = await Task.find({});
        res.status(200).send({ alltaskz: alltask }); 
    } catch (error) {
        res.status(500).json({ emsg: error });
    }
}
//get
 /*  Route path: /users/:userId/books/:bookId
     Request URL: http://localhost:3000/users/34/books/8989
     req.params: { "userId": "34", "bookId": "8989" }  */ 
const getTask = async (req, res) => {     
    try {
       // const { id: taskid } = req.params;  /* Here both *taskid* is same, here { property: variable that hold the value}   */
        let taskid = req.params.id;           // directly from URL 
        let getaTask = await Task.findById(taskid);
        if (!getaTask) { // if the query returns null
            return res.status(404).json({ msgs : `NO TASK WITH ID ${taskid}`} ); // error if the syntax for taskid does match 
        }                                                                        // but task is null 
        res.json({ SingleTask: getaTask }); 
    }
    catch (error) {
        res.status(500).json({ emsg: error }); // generic error; syntax not match
    }
}

//post
const createTasks = async (req, res) => {
    try {
        let atask = await Task.create(req.body);
        console.log(typeof(atask))  //Object
        res.json(atask);     // the response from server side is the HTML data Requested by POST Method
        
    } catch (error) {
        res.status(500).json({ emsg: error });
    }
}                     

//patch
const updateTask= async (req, res)=> {
    let taskid = req.params.id;          
    try {
         let updateATask = await Task.findByIdAndUpdate(taskid, req.body, { new: true, runValidators: true });
         //runvalidators property will verify all the validation properties in the given update JSON columns  
         
        if (!updateATask) { // if the query returns null
                return res.status(404).json({ msgs: `NO TASK WITH ID ${taskid}` });
        }
         res.status(200).json({ updateATask }); 
    }                   
   
    catch (error) {
        res.status(500).json({ emsg: error }); // generic error; syntax not match
    }
}

//detele
const deleteTask= async (req, res)=> {
    let taskid = req.params.id;          
    let deleteATask = await Task.findByIdAndDelete(taskid);
    try {
        if (!deleteATask) { // if the query returns null
            return res.status(404).json({ msgs: `NO TASK WITH ID ${taskid}` });
        }
         res.status(200).json({ deleteATask }); 
        //res.status(200).json({ deleteATask: null, status: 'OK' }); 
    }                   
   
    catch (error) {
        res.status(500).json({ emsg: error }); // generic error; syntax not match
    }
}
   

module.exports = {
    getallTasks,
    getTask,
    createTasks,
    updateTask,
    deleteTask
}