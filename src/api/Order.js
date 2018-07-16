import Base from './Base'
import request from '../common/request'

class Order extends Base {
    constructor(url, req) {
        super(url, req)
    }
}

export default new Order('/order', request)