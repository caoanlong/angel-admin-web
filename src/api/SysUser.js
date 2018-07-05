import Base from './Base'
import request from '../common/request'

class SysUser extends Base {
    constructor(url, req) {
        super(url, req)
    }
}

export default new SysUser('/sysUser', request)