const form = document.querySelector("form");
form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const username = form.username.value;
    const password = form.password.value;
    try {
      console.log(username);
      console.log(password)
        const res = await fetch('/login', { 
          method: 'POST', 
          body: JSON.stringify({ username, password }),
          headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        console.log("Data : ");
        console.log(data.tipe);
        if(data){
          if(data.tipe=="admin"){
            location.assign('/dashboard');
          }else{
            location.assign('/rooms');
          }
          console.log("berhasil");
        }
    
      }
      catch (err) {
        console.log(err);
      }
})
