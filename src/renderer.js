const form = document.getElementById('schoolForm')
const schoolsElem = document.querySelector('.schools')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  form.hidden = true
  window.electronAPI.setSearch(document.getElementById('schoolName').value)
})

window.addEventListener('load', () => {
  window.electronAPI.onSchoolList((_, schools) => {
    schoolsElem.innerHTML = ''
    schools.forEach(school => {
      const schooHTML = `<b class="school-name" title="${school.id}">${school.name}</b>
      <span class="school-ems">(${school.emsCode})</span> -
      <i class="school-city">${school.city.replace('CEDEX', '').trim()} ${school.zipCode}</i>
      <button class="school-select">Choisir</button>`

      const li = document.createElement('li')
      li.innerHTML = schooHTML
      li.querySelector('button').addEventListener('click', () => window.electronAPI.schoolAuth(school))
      schoolsElem.appendChild(li)
    })
  })
})
