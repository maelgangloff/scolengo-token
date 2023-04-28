const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require('node:path')
const { Skolengo } = require('scolengo-api')

const CAS_CALLBACK = 'skoapp-prod://sign-in-callback'

/** @type {BrowserWindow} */
let mainWindow = null
let oidClient
/** @type {import('scolengo-api/types/models/School').School} */
let selectedSchool

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'icon.png')
  })

  mainWindow.loadFile(path.join(__dirname, 'index.html'))
  return mainWindow
}

ipcMain.on('school-search', async (event, schoolName) => {
  try {
    const schools = await Skolengo.searchSchool({ text: schoolName }, 100)
    if (!schools.length) {
      dialog.showErrorBox('Établissement introuvable', "Nous avons cherché partout, mais nous n'avons pas trouvé cet établissement...")
      return mainWindow.reload()
    }
    mainWindow.webContents.send('school-list', schools)
  } catch (e) {
    dialog.showErrorBox('Erreur', 'Une erreur est survenue, veuillez réessayer...')
    return mainWindow.reload()
  }
})

ipcMain.on('school-auth', async (event, school) => {
  try {
    selectedSchool = school
    oidClient = await Skolengo.getOIDClient(school)
    const authURL = oidClient.authorizationUrl()
    mainWindow.loadURL(authURL)
  } catch (e) {
    dialog.showErrorBox('Erreur', 'Une erreur est survenue, veuillez réessayer...')
    return mainWindow.reload()
  }
})

if (!app.requestSingleInstanceLock()) app.quit()
else {
  app.on('second-instance', async (event, commandLine, workingDirectory) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })

  app.on('ready', () => {
    const window = createWindow()

    window.webContents.on('will-redirect', async (_error, url) => {
      if (!url.startsWith(CAS_CALLBACK)) return
      try {
        const tokenSet = await oidClient.callback(CAS_CALLBACK, oidClient.callbackParams(url))
        await window.loadFile(path.join(__dirname, 'success.html'))
        const authData = { tokenSet, school: selectedSchool }
        window.webContents.send('send-token', authData)
      } catch (e) {
        dialog.showErrorBox('Erreur', "L'authentification a échoué, veuillez réessayer...")
        return window.reload()
      }
    })
    window.on('closed', () => app.quit())
  })

  app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit())
  app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && createWindow())
}
