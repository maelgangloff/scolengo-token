const form = document.getElementById('schoolForm')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  form.hidden = true
  window.electronAPI.setSchool(document.getElementById('schoolName').value)
})
