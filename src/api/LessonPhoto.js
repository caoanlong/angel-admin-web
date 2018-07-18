import Base from './Base'
import request from '../common/request'

class LessonPhoto extends Base {
    constructor(url, req) {
        super(url, req)
    }
}

export default new LessonPhoto('/lessonPhoto', request)