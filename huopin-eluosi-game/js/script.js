/*
*
* @Author: zth
* @Date:   2018-11-01 21:58:33
* @Last Modified by:   zth
* @Last Modified time: 2018-11-03 12:36:59
*/
var local = new Local();
local.start();

var remote = new Remote();
remote.start(2, 2);
remote.bindEvent();