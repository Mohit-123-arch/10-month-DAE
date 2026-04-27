function handleRegister() {
  const username = document.getElementById('username').value;
  const email    = document.getElementById('email').value;
  const password = document.getElementById('password').value;


  if (!username || !email || !password) {
    alert('Please fill in all fields');
    return;
  }


  const users = JSON.parse(localStorage.getItem('users')) || [];


  const exists = users.find(user => user.email === email);
  if (exists) {
    alert('An account with that email already exists');
    return;
  }

  
  users.push({ username, email, password });
  localStorage.setItem('users', JSON.stringify(users));

  alert('Account created! Please log in.');
  window.location.href = 'login.html';
}