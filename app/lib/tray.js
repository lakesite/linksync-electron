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
  Menu = require('electron').Menu,
  Tray = require('electron').Tray;

var tray_template = require(__dirname + '/../trays/' + process.platform + '.json');


exports.init = function(lse) {
  function bind_trayitems(trayitems) {
    trayitems.forEach(function bind_trayitem_fn (item) {
      if (item.role !== undefined) {
        return;
      }

      if (item.type === 'separator') {
        return;
      }

      if (item.submenu) {
        return bind_traytems(item.submenu);
      }

      // Otherwise, find the function for our command
      switch(item.command) {
        case "application:quit":
          item.click = lse.quit;
          break;
        case "application:about":
          item.click = lse.window_about;
          break;
        case "application:settings":
          item.click = lse.window_settings;
          break;
        case "application:manage-links":
          item.click = lse.window_manage_links;
          break;
        default:
          console.log("Unhandled tray item command: " + item.command + " under label: " + item.label);
      }
    });
  }

  bind_trayitems(tray_template.tray);

  var app_icon = new Tray(lse.icon);
  app_icon.setToolTip('LinkSync');
  app_icon.setContextMenu(Menu.buildFromTemplate(tray_template.tray));
};
