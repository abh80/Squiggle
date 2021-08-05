import { app, Menu, Tray } from "electron";
import { join } from "path";
let tray: Tray | null = null;
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}
require("./server");

app.on("ready", () => {
  console.log("App is ready.");
  tray = new Tray(join(__dirname, "..", "assets", "app.ico"));
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "Quit",
        click: () => app.quit(),
      },
    ])
  );
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
