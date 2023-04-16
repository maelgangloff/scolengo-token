const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  setSchool: (schoolName) => ipcRenderer.send('school-name', schoolName),
  sendToken: (token) => ipcRenderer.on('send-token', token)
})
