'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
	ENV_CONFIG: '"dev"',
	// BASE_API: '"http://localhost:3002/admin"',
	BASE_API: '"http://api.app.angel.jyw91.com/admin"',
	IMG_API: '"http://api.pc.angel.jyw91.com"',
	IMG_URL: '"http://image.angel.jyw91.com"'
})
