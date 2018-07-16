import Base from './Base'
import request from '../common/request'

class Lesson extends Base {
    constructor(url, req) {
        super(url, req)
    }
}

export default new Lesson('/lesson', request)