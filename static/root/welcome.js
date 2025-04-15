
let token = localStorage.getItem('token') || ''

if (token) {
  document.getElementById('importForm').style.display = 'block'
  document.getElementById('loginForm').style.display = 'none'
}

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
    document.getElementById('importForm').style.display = 'block'
    document.getElementById('loginForm').style.display = 'none'
  } else {
    alert(body.message || 'Registration failed.')
  }
})

document.getElementById('importForm').addEventListener('submit', async (e) => {
  e.preventDefault()
  const fileInput = document.getElementById('movieFile')
  const file = fileInput.files[0]
  const formData = new FormData()
  formData.append('movies', file)

  const res = await fetch('/api/v1/movies/import', {
    method: 'POST',
    headers: {
      Authorization: `${localStorage.getItem('token')}`
    },
    body: formData
  })

  const result = await res.json()
  alert('Import response: ' + JSON.stringify(result))
})

function logout() {
  localStorage.removeItem('token')
  location.reload()
}
