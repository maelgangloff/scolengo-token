const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require('node:path')
const { Skolengo } = require('scolengo-api')

const CAS_CALLBACK = 'skoapp-prod://sign-in-callback'

let mainWindow
let oidClient
let school

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile(path.join(__dirname, 'index.html'))
  return mainWindow
}

ipcMain.on('school-name', async (event, schoolName) => {
  try {
    const schools = await Skolengo.searchSchool(schoolName)
    if (!schools.data.length) {
      dialog.showErrorBox('Établissement introuvable', "Nous avons cherché partout, mais nous n'avons pas trouvé cet établissement...")
      return app.quit()
    }
    school = schools.data[0]
    dialog.showMessageBox(mainWindow, { title: 'Établissement sélectionné', message: `Vous avez sélectionné cet établissement : ${school.attributes.name} (${school.attributes.emsCode})` })
    oidClient = await Skolengo.getOIDClient(school)
    const authURL = oidClient.authorizationUrl()
    mainWindow.loadURL(authURL)
  } catch (e) {
    dialog.showErrorBox('Erreur', "Une erreur est survenue. Veuillez relancer l'application.")
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
        window.webContents.send('send-token', { tokenSet, school })
      } catch (e) {
        dialog.showErrorBox('Erreur', "Une erreur est survenue. Veuillez relancer l'application.")
      }
    })
    window.on('closed', () => app.quit())
  })

  app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit())
  app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && createWindow())
}
