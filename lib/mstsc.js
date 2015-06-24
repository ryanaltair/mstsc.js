/*
 * Copyright (c) 2015 Sylvain Peyrefitte
 *
 * This file is part of mstsc.js.
 *
 * node-rdp is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
var express = require('express');
var http = require('http');
var rdp = require('rdp');

function createServer() {
	var app = express();
	app.use(express.static(__dirname + '/../static'))
	app.get('/', function(req, res) {
		res.redirect('/index.html');
	});
	var server = http.createServer(app);
	var io = require('socket.io')(server);
	
	io.on('connection', function() {
		rdp.createClient({ 
			domain : 'siradel', 
			userName : 'speyrefitte'
		}).on('connect', function () {
			io.emit('connect');
		}).on('bitmap', function(bitmap) {
			io.emit('bitmap', bitmap);
		}).connect('wav-glw-009', 3389);
	});
	
	return server;
}

/**
 * Module exports
 */
module.exports = {
	createServer : createServer
};