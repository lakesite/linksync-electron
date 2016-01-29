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

const
  electron = require('electron'),
  lse_menu = require(__dirname + '/app/lib/menu'),
  lse_tray = require(__dirname + '/app/lib/tray');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// linksync-electron app.
var lse = {
  icon: __dirname + '/app/icon.png',

  quit: function () {
    app.quit();
  },

  window_reload: function () {
    lse.main_window.webContents.reload();
  },

  window_about: function() {
    lse.main_window.loadURL('file://' + __dirname + '/app/static/index.html');
  },

  window_settings: function() {
    lse.main_window.loadURL('file://' + __dirname + '/app/static/settings/index.html');
  },

  window_manage_links: function() {
    lse.main_window.loadURL('file://' + __dirname + '/app/static/links/index.html');
  },

  toggle_dev_tools: function() {
    lse.main_window.webContents.openDevTools();
  },

  // configuration (load from file/db later.)
  window_options: {
    width: 800,
    height: 600
  },
};


function start_lse() {
  lse.main_window = new BrowserWindow(lse.window_options);

  lse_tray.init(lse);
  lse_menu.init(lse);

  lse.window_manage_links();

  lse.main_window.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    lse.main_window = null;
  });
}


app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});


app.on('ready', function() {
  start_lse();
});
