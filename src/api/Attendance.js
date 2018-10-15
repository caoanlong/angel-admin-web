import Base from './Base'
import request from '../common/request'

class Attendance extends Base {
    constructor(url, req) {
        super(url, req)
    }
    /**
     * 确认考勤
     */
    confirm(data) {
        return this.request({
			url: this.baseUrl + '/confirm',
			method: 'post',
			data
		})
    }
}

export default new Attendance('/attendance', request)