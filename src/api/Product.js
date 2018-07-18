import Base from './Base'
import request from '../common/request'

class Product extends Base {
    constructor(url, req) {
        super(url, req)
    }
}

export default new Product('/product', request)