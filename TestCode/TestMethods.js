import axios from "axios";
const getAllTask = () => {
        return axios.get(`http://localhost:3000/tasks/all/6257f6893c06d00cdb389627`)
                .then((response) => {
                        const { alltaskz: allTask } = response.data;
                         return allTask;
                })
                .catch((err)=> console.log("ERROR ",err))
}

const getUserinfo = () => {
        return axios.get("http://localhost:3000/tasks/login/john/rt87@")
                   .then((res) => {
                           const { getUser: { name } } = res.data;  
                           return name;
                    })
                   .catch((err) => console.log("ERROR", err))
   }
module.exports = { getAllTask, getUserinfo }