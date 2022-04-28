let form = document.querySelector('#form');
let msg = document.getElementById('message');
let h3=document.getElementById('redirect')
form.addEventListener('submit', async (ev) => {
  let HtmlColl = ev.target.children;
  for (let i of HtmlColl) {  
    if (i.name==='register') {
        ev.preventDefault();
        console.log("register submitted")
        const name = form.name.value;
        const password = form.pass.value;
        const email = form.email.value;
        console.log(name, password, email);
        try {
          await axios.post('/tasks/register', {
            name,
            password,
            email
          })
            .then(function (response) {
              console.log(response);
            })
          msg.innerHTML = "Successfully registered!!";
        
        }
        catch (error) {
          //console.log(error, error.response);
          let e = error.response.data;
          console.log(e.errors);
          if (error.response.status === 11000) {
            //  console.log(error.code);
            msg.innerHTML = "UserName alredy in Use! Try different";
            msg.style.color = "red";
            return;
          }
          msg.innerHTML = "Error ! Fill up all the fields Correctly";
          msg.style.color = "red";
        }
    }
    if (i.name === 'login') {
          ev.preventDefault();
          console.log("log in submitted")
          console.log(ev.target)
          const name = form.name.value;       
          const password = form.pass.value;
          console.log(name + " -- " + password);
      try {
        let U_ID;
            await axios.get(`/tasks/login/${name}/${password}`)
              .then((res) => {
                console.log(res.data);
                const { getUser: { _id:UID } } = res.data;  
              //  console.log(getUser)  
                console.log(typeof (UID))
                U_ID = UID;
              })
       
              msg.innerHTML = "Validation Successful!";
              let  ht = `<a href="Alltasks.html?user=${name}&id=${U_ID}" > View ToDo List Here </a>`
              h3.innerHTML = ht;
       }
          catch (error) {
            if (error.response.status === 404) {
              
              msg.innerHTML = "Username And Password Not Found !";
              msg.style.color = "red";
              return;
            }
            if (error.response.status === 500)
              console.log("500");
          }
    }
   }
})
  