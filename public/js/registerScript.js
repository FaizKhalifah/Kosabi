const form = document.querySelector("form");


  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // get values
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const res = await fetch('/register', { 
        method: 'POST', 
        body: JSON.stringify({name, email, password }),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
      console.log(data);
      if (data.errors) {
        emailError.textContent = data.errors.email;
        passwordError.textContent = data.errors.password;
      }
      if (data.user) {
        location.assign('/');
      }

    }
    catch (err) {
      console.log(err);
    }

  });