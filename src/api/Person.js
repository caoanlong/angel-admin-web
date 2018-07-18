import Base from './Base'
import request from '../common/request'

class Person extends Base {
	constructor(url, req) {
		super(url, req)
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
}

export default new Person('/person', request)