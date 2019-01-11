/*
 * @Author: kele 
 * @Date: 2019-01-11 15:30:28 
 * @Last Modified by: kele
 * @Last Modified time: 2019-01-11 17:05:36
 */
const socket = require('socket.io');
const http = require('http');

module.exports = function(app, socketPort) {
	const user_list = [];
	const server = http.Server(app);
	server.listen(socketPort);
	const io = socket(server);
	io.on('connection', (socket) => {
		console.log('new connect');
	});
};
