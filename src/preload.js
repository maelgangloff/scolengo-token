const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  setSearch: (schoolName) => ipcRenderer.send('school-search', schoolName),
  onSchoolList: (callback) => ipcRenderer.on('school-list', callback),
  sendToken: (token) => ipcRenderer.on('send-token', token),
  schoolAuth: (school) => ipcRenderer.send('school-auth', school)
})
