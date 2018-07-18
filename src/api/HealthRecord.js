import Base from './Base'
import request from '../common/request'

class HealthRecord extends Base {
    constructor(url, req) {
        super(url, req)
    }
}

export default new HealthRecord('/healthRecord', request)