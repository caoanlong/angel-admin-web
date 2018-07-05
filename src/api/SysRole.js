import Base from './Base'
import request from '../common/request'

class SysRole extends Base {
	constructor(url, req) {
		super(url, req)
	}
	findMenuList(params) {
		return new Promise((resolve, reject) => {
			this.request({
				url: this.baseUrl + '/findMenuList',
				params
			}).then(res => {
				resolve(res.data.data)
			})
		})
	}
	addAuthority(data) {
		return this.request({
			url: this.baseUrl + '/addAuthority',
			method: 'post',
			data
		})
	}
}

export default new SysRole('/sysRole', request)