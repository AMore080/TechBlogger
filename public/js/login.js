const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if(email && password) {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({email,password}),
      headers: {'Content-Type': 'application/json'},
    });

    if(response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const name = document.querySelector('#name-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};


document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);