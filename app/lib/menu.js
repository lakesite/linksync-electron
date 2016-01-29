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

const Menu = require('electron').Menu;

var menu_template = require(__dirname + '/../menus/' + process.platform + '.json');

// a cool trick via GME (unlicensed) @
// https://github.com/twolfson/google-music-electron/blob/master/lib/app-menu.js
exports.init = function(lse) {
  function bind_menuitems(menuitems) {
    menuitems.forEach(function bind_menuitem_fn (item) {
      // If there is a role, continue
      if (item.role !== undefined) {
        return;
      }

      // If there is a separator, continue
      if (item.type === 'separator') {
        return;
      }

      // If there is a submenu, recurse it
      if (item.submenu) {
        return bind_menuitems(item.submenu);
        // return;
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
        case "window:reload":
          item.click = lse.window_reload;
          break;
        case "window:toggle-dev-tools":
          item.click = lse.toggle_dev_tools;
          break;
        default:
          console.log("Unhandled menu item command: " + item.command + " under label: " + item.label);
      }
    });
  }
  bind_menuitems(menu_template.menu);
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu_template.menu));
};
