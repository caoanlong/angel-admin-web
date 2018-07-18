import Base from './Base'
import request from '../common/request'

class AngelRemark extends Base {
    constructor(url, req) {
        super(url, req)
    }
}

export default new AngelRemark('/angelRemark', request)