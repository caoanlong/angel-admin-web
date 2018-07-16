import Base from './Base'
import request from '../common/request'

class Auth extends Base {
    constructor(url, req) {
        super(url, req)
    }
    login(data) {
        return this.request({
            url: this.baseUrl + '/login',
            method: 'post',
            data
        })
    }
    info(params) {
        return this.request({
            url: this.baseUrl + '/info',
            params
        })
    }
    update(data) {
        return this.request({
            url: this.baseUrl + '/update',
            method: 'post',
            data
        })
    }
    updatePassword(data) {
        return this.request({
            url: this.baseUrl + '/updatePassword',
            method: 'post',
            data
        })
    }
}

export default new Auth('/auth', request)