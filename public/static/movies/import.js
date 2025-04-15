
let token = localStorage.getItem('token') || ''

if (!token) {
  // window.location.href = '/'
}

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
