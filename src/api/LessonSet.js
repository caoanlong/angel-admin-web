import Base from './Base'
import request from '../common/request'

class LessonSet extends Base {
    constructor(url, req) {
        super(url, req)
    }
}

export default new LessonSet('/lessonSet', request)