import axios from "axios";
const getAllTask = () => {
        return axios.get(`http://localhost:3000/tasks/all/62542dab43489970c3894915`)
                .then((response) => {
                        const { alltaskz: allTask } = response.data;
                       // console.log(allTask);
                        return allTask;
                })
                .catch((err)=> console.log("ERROR ",err))
}
const getAtask = () => 
           axios.get("http://localhost:3000/tasks/62667d5f8b5b2ed8df66121a")
                .then((res) => {
                        console.log("AA", res.data);
                        let { SingleTask: { Atask: isCompleted, name, userName, userID } }= res.data;
                        return name;
                })
                .catch((err) => console.log("ERROR",err))

module.exports = { getAllTask, getAtask }