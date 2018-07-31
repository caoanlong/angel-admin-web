import Base from './Base'
import request from '../common/request'

class Member extends Base {
	constructor(url, req) {
		super(url, req)
	}
	disable(data) {
		return this.request({
			url: this.baseUrl + '/disable',
			method: 'post',
			data
		})
	}
	suggest(params) {
		return new Promise((resolve, reject) => {
			this.request({
				url: this.baseUrl + '/suggest',
				params
			}).then(res => {
				resolve(res.data.data)
			})
		})
	}
	addMutiple(data) {
		return this.request({
			url: this.baseUrl + '/addMutiple',
			method: 'post',
			data
		})
	}
}

export default new Member('/member', request)