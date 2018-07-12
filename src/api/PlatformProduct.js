import Base from './Base'
import request from '../common/request'

class PlatformProduct extends Base {
    constructor(url, req) {
        super(url, req)
    }
}

export default new PlatformProduct('/platformProduct', request)