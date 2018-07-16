import Base from './Base'
import request from '../common/request'

class Member extends Base {
    constructor(url, req) {
        super(url, req)
    }
    disable(data) {
        return this.request({
            url: this.baseUrl + '/disable',
            method: 'post',
            data
        })
    }
}

export default new Member('/member', request)