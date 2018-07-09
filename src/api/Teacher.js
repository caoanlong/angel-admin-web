import Base from './Base'
import request from '../common/request'

class Teacher extends Base {
    constructor(url, req) {
        super(url, req)
    }
}

export default new Teacher('/teacher', request)