const form = document.querySelector('form');  
form.addEventListener('submit', async (e) => {
    e.preventDefault();


    // get values
    const nik = form.nik.value;
    const nama = form.nama.value;
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
    const tipe = "user";

    try {
      const res = await fetch('/register', { 
        method: 'POST', 
        body: JSON.stringify({ nik,nama,username,email,password,tipe }),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
      location.assign('/rooms');

    }
    catch (err) {
      console.log(err);
    }

  });