import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
	// mode: 'history',
	scrollBehavior: () => ({ y: 0 }),
	routes: [
		{
			path: '*',
			redirect: '/404'
		},
		{
			path: '/404',
			name: '404',
			component: () => import ('../components/404')
		},
		{
			path: '/login',
			name: 'login',
			component: () => import ('../components/Login')
		},
		{
			path: '',
			component: () => import ('../components/Layout'),
			children: [
				{
					path: '/',
					name: 'home',
					meta: { title: '首页' },
					component: () => import ('../components/Home')
				}
			]
		}
	]
})

export default router