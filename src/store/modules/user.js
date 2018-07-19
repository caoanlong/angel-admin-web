import Auth from '../../api/Auth'

const user = {
	state: {
		name: localStorage.getItem('name'),
		mobile: localStorage.getItem('mobile'),
		token: localStorage.getItem('token'),
		avatar: localStorage.getItem('avatar'),
		storeId: localStorage.getItem('storeId')
	},
	mutations: {
		SET_NAME: (state, name) => {
			state.name = name
			localStorage.setItem('name', name)
		},
		SET_MOBILE: (state, mobile) => {
			state.mobile = mobile
			localStorage.setItem('mobile', mobile)
		},
		SET_TOKEN: (state, token) => {
			state.token = token
			localStorage.setItem('token', token)
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar
			localStorage.setItem('avatar', avatar)
		},
		SET_STOREID: (state, storeId) => {
			state.storeId = storeId
			localStorage.setItem('storeId', storeId)
		},
	},
	actions: {
		login({ commit }, token) {
			commit('SET_TOKEN', token)
		},
		logout({ commit }) {
			return new Promise((resolve, reject) => {
				commit('SET_NAME', '')
				commit('SET_MOBILE', '')
				commit('SET_AVATAR', '')
				commit('SET_TOKEN', '')
				commit('SET_STOREID', '')
				localStorage.clear()
				sessionStorage.clear()
				resolve()
			})
		},
		getUserInfo({ commit } ) {
			return new Promise((resolve, reject) => {
				Auth.info().then(res => {
					commit('SET_NAME', res.data.data.name)
					commit('SET_MOBILE', res.data.data.mobile)
					commit('SET_AVATAR', res.data.data.avatar)
					commit('SET_STOREID', res.data.data.storeId)
					resolve()
				})
			})
		}
	}
}

export default user