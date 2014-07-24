var session = require('koa-generic-session');
var model = new (require('koa-mongo-model'))({name: 'session', indexes: ['sid']});
var cookieOpts = {maxage: 7 * 24 * 60 * 60 * 1000};


module.exports = session({key: 'sid', cookie: cookieOpts, store: {

	get: function(sid) {
		return model.get({sid: sid}).then(function(doc) {
			return doc && doc.value;
		});
	},

	set: function(sid, value) {
		return model.update({sid: sid}, {sid: sid, value: value}, {upsert: true});
	},

	destroy: function(sid) {
		return model.delete({sid: sid});
	}

}});
