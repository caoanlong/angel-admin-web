const getters = {
	token: state => state.user.token,
	avatar: state => state.user.avatar,
	storeId: state => state.user.storeId,
	name: state => state.user.name,
	sidebar: state => state.app.sidebar,
	menus: state => state.menu.menus
}
export default getters