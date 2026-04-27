function handleLogin() {
  const email    = document.getElementById('email').value;
  const password = document.getElementById('password').value;


  if (!email || !password) {
    alert('Please fill in all fields');
    return;
  }


  const users = JSON.parse(localStorage.getItem('users')) || [];


  const user = users.find(user => user.email === email);

  if (!user) {
    alert('No account found with that email');
    return;
  }


  if (user.password !== password) {
    alert('Wrong password');
    return;
  }


  localStorage.setItem('loggedInUser', JSON.stringify(user));

  
  window.location.href = 'landingpage.html';
}