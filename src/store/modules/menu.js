import SysUser from '../../api/SysUser'
// import menus from '../../assets/data/menus'

const menu = {
	state: {
		menus: sessionStorage.getItem('menus') != 'undefined' ? JSON.parse(sessionStorage.getItem('menus')) : ''
		// menus: menus
	},
	mutations: {
		GET_MENU: (state) => {
			SysUser.findMenuList().then(res => {
				state.menus = res.menuList
				sessionStorage.setItem('menus', JSON.stringify(res.menuList))
			})
		},
		// ADD_MENU: (state, menu) => {
		// 	addMenu(menu).then(res => {
		// 		getMenus().then(res => {
		// 			state.menus = res.data.data
		// 			sessionStorage.setItem('menus', JSON.stringify(res.data.data))
		// 		})
		// 	})
		// },
		// EDIT_MENU: (state, menu) => {
		// 	updateMenu(menu).then(res => {
		// 		getMenus().then(res => {
		// 			state.menus = res.data.data
		// 			sessionStorage.setItem('menus', JSON.stringify(res.data.data))
		// 		})
		// 	})
		// },
		// DELETE_MENU: (state, menu) => {
		// 	delMenu({ids: [menu.menu_id]}).then(res => {
		// 		getMenus().then(res => {
		// 			state.menus = res.data.data
		// 			sessionStorage.setItem('menus', JSON.stringify(res.data.data))
		// 		})
		// 	})
		// }
	},
	actions: {
		getMenu ({commit}) {
			commit('GET_MENU')
		},
		// addMenu ({commit, state}, menu) {
		// 	commit('ADD_MENU', menu)
		// },
		// editMenu ({commit}, menu) {
		// 	commit('EDIT_MENU', menu)
		// },
		// deleteMenu ({commit}, menu) {
		// 	commit('DELETE_MENU', menu)
		// }
	}
}

export default menu