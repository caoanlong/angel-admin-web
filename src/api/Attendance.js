import Base from './Base'
import request from '../common/request'

class Attendance extends Base {
    constructor(url, req) {
        super(url, req)
    }
}

export default new Attendance('/attendance', request)