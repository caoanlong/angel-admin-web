import Base from './Base'
import request from '../common/request'

class SysUser extends Base {
    constructor(url, req) {
        super(url, req)
    }
    findMenuList() {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/findMenuList'
            }).then(res => {
                resolve(res.data.data)
            })
        })
    }
}

export default new SysUser('/sysUser', request)