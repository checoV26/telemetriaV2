const { app, BrowserWindow } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");

// Solo carga electron-reload en modo desarrollo
if (process.env.NODE_ENV !== "production") {
  try {
    require("electron-reload")(__dirname, {
      electron: path.join(__dirname, "node_modules", ".bin", "electron"),
    });
  } catch (err) {
    console.error("Error loading electron-reload:", err);
  }
}

const createWindows = () => {
  const win = new BrowserWindow({
    fullscreenable: false, // No permite pantalla completa
    autoHideMenuBar: true, // Oculta la barra de menú
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Maximiza la ventana respetando la barra de tareas
  win.maximize();

  win.loadFile("index.html");

  // Abre las herramientas de desarrollador solo en modo desarrollo
  /*if (process.env.NODE_ENV !== "production") {
    win.webContents.openDevTools();
  }*/
};

app.whenReady().then(() => {
  createWindows();

  // Manejo de la actualización
  autoUpdater.checkForUpdatesAndNotify();

  // Opcional: Manejo de eventos para la actualización
  autoUpdater.on("update-available", () => {
    console.log("Update available.");
  });

  autoUpdater.on("update-downloaded", () => {
    console.log("Update downloaded.");
    autoUpdater.quitAndInstall(); // Reinicia la aplicación para instalar la actualización
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
