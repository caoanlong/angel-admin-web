import Base from './Base'
import request from '../common/request'

class TeacherAdvice extends Base {
    constructor(url, req) {
        super(url, req)
    }
}

export default new TeacherAdvice('/teacherAdvice', request)