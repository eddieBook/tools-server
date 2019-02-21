/*
 * @Author: kele 
 * @Date: 2019-02-21 14:51:51 
 * @Last Modified by: kele
 * @Last Modified time: 2019-02-21 22:21:16
 */

const fs = require('fs');

module.exports = () => {
	return async (ctx, next) => {
		try {
			await next();
		} catch (error) {
			ctx.status = error.statusCode || error.status || 500;
			ctx.body = {
				message: error.status
			};
			let logName = new Date().toLocaleDateString().replace(/-/g, '-');
			try {
				let time = new Date().toLocaleTimeString();
				let msg =
					[
						JSON.stringify({
							time,
							ip: ctx.ip,
							path: ctx.path,
							status: error.status
						}),
						error.stack
					].join('\n') + '\n';
				fs.appendFileSync(`${process.cwd()}/log/${logName}.txt`, msg);
			} catch (error) {
				console.log('error :', error);
			}
			ctx.app.emit('error', error, ctx);
		}
	};
};
