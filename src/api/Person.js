import Base from './Base'
import request from '../common/request'

class Person extends Base {
    constructor(url, req) {
        super(url, req)
    }
}

export default new Person('/person', request)