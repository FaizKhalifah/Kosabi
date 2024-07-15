const form = document.querySelector("form");

form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const email = form.email.value;
    const password = form.password.value;

    try{
        const res = await fetch('/login', { 
            method: 'POST', 
            body: JSON.stringify({ email, password }),
            headers: {'Content-Type': 'application/json'}
          });
          const data = await res.json();
          const user = data.user;
          console.log(data);
          if (user) {
            if(data.role=="admin"){
              location.assign('/dashboard');
            }else{
              location.assign('/');
            }
          }
    }catch(err){
       console.log(err);
    }
});

