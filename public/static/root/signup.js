function logout() {
  localStorage.removeItem('token')
  location.reload()
}
// logout()
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault()

  const name = document.getElementById('name').value
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  const confirmPassword = document.getElementById('confirmPassword').value
  console.log('name :>> ', name);

  const res = await fetch('/api/v1/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, confirmPassword })
  })

  console.log('res :>> ', res);

  const body = await res.json()
  console.log('body :>> ', body);
  token = body.token

  if (token) {
    localStorage.setItem('token', token)
    alert('Registration successful!')
    window.location.href = '/movies/import'
  } else {
    alert(`Registration failed. \n ${JSON.stringify(body.errors)}`)
  }
})

