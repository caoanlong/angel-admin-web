import Base from './Base'
import request from '../common/request'

class SysRole extends Base {
    constructor(url, req) {
        super(url, req)
    }
    updateMenu(data) {
        return this.request({
            url: this.baseUrl + '/update/menu',
            method: 'post',
            data
        })
    }
}

export default new SysRole('/sysRole', request)