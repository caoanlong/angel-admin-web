import Base from './Base'
import request from '../common/request'

class SysDict extends Base {
    constructor(url, req) {
        super(url, req)
    }
    findTypeList() {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/types'
            }).then(res => {
                resolve(res.data.data)
            })
        })
    }
}

export default new SysDict('/sysDict', request)