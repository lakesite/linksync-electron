/*
 * linksync-electron -- A multi-platform bookmark, note and media system
 * Copyright (C) 2016 Andrew Duncan
 *
 * This package is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * found in the file LICENSE that should have accompanied this file.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const Menu = electron.Menu;
const Tray = electron.Tray;

var appIcon = null;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;


function about() {
  mainWindow.loadURL('file://' + __dirname + '/app/static/index.html');
}


function manage_links() {
  mainWindow.loadURL('file://' + __dirname + '/app/static/links/index.html');
}

app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});


app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  about();

  appIcon = new Tray(__dirname + '/app/icon.png');
  var contextMenu = Menu.buildFromTemplate([
    { label: 'Manage Links', type: 'radio', click: manage_links },
    { label: 'About', type: 'radio', checked: true, click: about },
    { label: 'Quit', type: 'radio', click: function() { app.quit(); } }
  ]);
  appIcon.setToolTip('LinkSync');
  appIcon.setContextMenu(contextMenu);

  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
