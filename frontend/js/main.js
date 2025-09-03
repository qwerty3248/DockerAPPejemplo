window.onload = () => {
  fetchUsers();
}

async function fetchUsers() {
  const res = await fetch('http://localhost:3000/api/users');
  const users = await res.json();
  const ul = document.getElementById('user-list');
  ul.innerHTML = '';
  users.forEach(u => {
    const li = document.createElement('li');
    li.textContent = u.name;
    ul.appendChild(li);
  });
}

async function addUser() {
  const input = document.getElementById('username');
  if (!input.value) return;
  await fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: input.value})
  });
  input.value = '';
  fetchUsers();
}
