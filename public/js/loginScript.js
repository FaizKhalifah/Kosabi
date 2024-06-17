const form = document.querySelector("form");
form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const username = form.username.value;
    const password = form.password.value;
    try {
        const res = await fetch('/login', { 
          method: 'POST', 
          body: JSON.stringify({ username, password }),
          headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        console.log(data);
        if(data){
          location.assign('/rooms');
        }
    
      }
      catch (err) {
        console.log(err);
      }
})
