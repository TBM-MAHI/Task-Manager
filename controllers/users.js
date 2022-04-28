const { Task, User } = require('../model/Tasks.js')
//POST
const create_newUser = async (req, res) => {
    try {
        let u = await User.create(req.body);
        res.json({ user: u });
    } catch (error) {
        res.status(500).json({ emsg: error });
    }
}

const VerifyUser = async (req, res) => {
    let userName = req.params.name;
    let pass=req.params.pass;
    //console.log(userName+pass);
    try {
        let getUser = await User.findOne({ name: userName, password: pass });
        if (!getUser) {  // if getUser===null
            return res.status(404).json({ 'emsg': ` Username And Password ${userName} Not Found !` })
        }
        res.json({ getUser });
    } catch (error) {
        res.status(500).json({ emsg: error }); // generic error; syntax not match
    }
}

module.exports = { create_newUser, VerifyUser};