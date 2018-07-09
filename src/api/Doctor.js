import Base from './Base'
import request from '../common/request'

class Doctor extends Base {
    constructor(url, req) {
        super(url, req)
    }
}

export default new Doctor('/doctor', request)