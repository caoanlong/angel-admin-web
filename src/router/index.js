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
				},
				{
					path: '/healthcenter',
					name: 'healthcenter',
					meta: { title: '健康助长' },
					component: () => import ('../components/HealthCenter'),
					redirect: '/lessonphoto',
					children: [
						{
							path: '/lessonphoto',
							name: 'lessonphoto',
							meta: { title: '课间剪影' },
							component: () => import ('../components/HealthCenter/LessonPhoto/List'),
						},
						{
							path: '/healthrecord',
							name: 'healthrecord',
							meta: { title: '健康报告' },
							component: () => import ('../components/HealthCenter/HealthRecord/List'),
						},
						{
							path: '/teacheradvice',
							name: 'teacheradvice',
							meta: { title: '老师建议' },
							component: () => import ('../components/HealthCenter/HealthRecord/List'),
						},
						{
							path: '/angelremark',
							name: 'angelremark',
							meta: { title: '天使留言' },
							component: () => import ('../components/HealthCenter/AngelRemark/List'),
						}
					]
				},
				{
					path: '/store',
					name: 'store',
					meta: { title: '商城管理' },
					component: () => import ('../components/Store'),
					redirect: '/lessonset',
					children: [
						{
							path: '/lessonset',
							name: 'lessonset',
							meta: { title: '课程套餐' },
							component: () => import ('../components/Store/LessonSet/List'),
						},
						{
							path: '/addlesson',
							name: 'addlesson',
							meta: { title: '添加课程' },
							component: () => import ('../components/Store/LessonSet/Add'),
						},
						{
							path: '/editlesson',
							name: 'editlesson',
							meta: { title: '编辑课程' },
							component: () => import ('../components/Store/LessonSet/Edit'),
						},
						{
							path: '/viewlesson',
							name: 'viewlesson',
							meta: { title: '查看课程' },
							component: () => import ('../components/Store/LessonSet/Info'),
						},
						{
							path: '/platformproduct',
							name: 'platformproduct',
							meta: { title: '平台产品' },
							component: () => import ('../components/Store/PlatformProduct/List'),
						},
						{
							path: '/addplatformproduct',
							name: 'addplatformproduct',
							meta: { title: '添加平台产品' },
							component: () => import ('../components/Store/PlatformProduct/Add'),
						},
						{
							path: '/editplatformproduct',
							name: 'editplatformproduct',
							meta: { title: '编辑平台产品' },
							component: () => import ('../components/Store/PlatformProduct/Edit'),
						},
						{
							path: '/viewplatformproduct',
							name: 'viewplatformproduct',
							meta: { title: '查看平台产品' },
							component: () => import ('../components/Store/PlatformProduct/Info'),
						},
					]
				},
				{
					path: '/membermanage',
					name: 'membermanage',
					meta: { title: '会员管理' },
					component: () => import ('../components/Member'),
					redirect: '/member',
					children: [
						{
							path: '/member',
							name: 'member',
							meta: { title: '会员列表' },
							component: () => import ('../components/Member/Member/List'),
						},
						{
							path: '/lesson',
							name: 'lesson',
							meta: { title: '会员课程' },
							component: () => import ('../components/Member/Lesson/List'),
						},
						{
							path: '/order',
							name: 'order',
							meta: { title: '会员订单' },
							component: () => import ('../components/Member/Order/List'),
						}
					]
				},
				{
					path: '/system',
					name: 'system',
					meta: { title: '系统管理' },
					component: () => import ('../components/System'),
					redirect: '/user',
					children: [
						{
							path: '/user',
							name: 'user',
							meta: { title: '用户列表' },
							component: () => import ('../components/System/User/List'),
						},
						{
							path: '/adduser',
							name: 'adduser',
							meta: { title: '添加用户' },
							component: () => import ('../components/System/User/Add'),
						},
						{
							path: '/edituser',
							name: 'edituser',
							meta: { title: '编辑用户' },
							component: () => import ('../components/System/User/Edit'),
						},
						{
							path: '/viewuser',
							name: 'viewuser',
							meta: { title: '查看用户' },
							component: () => import ('../components/System/User/Info'),
						},
						{
							path: '/role',
							name: 'role',
							meta: { title: '角色列表' },
							component: () => import ('../components/System/Role/List'),
						},
						{
							path: '/addrole',
							name: 'addrole',
							meta: { title: '添加角色' },
							component: () => import ('../components/System/Role/Add'),
						},
						{
							path: '/editrole',
							name: 'editrole',
							meta: { title: '编辑角色' },
							component: () => import ('../components/System/Role/Edit'),
						},
						{
							path: '/viewrole',
							name: 'viewrole',
							meta: { title: '查看角色' },
							component: () => import ('../components/System/Role/Info'),
						},
						{
							path: '/dict',
							name: 'dict',
							meta: { title: '字典列表' },
							component: () => import ('../components/System/Dict/List'),
						},
						{
							path: '/adddict',
							name: 'adddict',
							meta: { title: '添加字典' },
							component: () => import ('../components/System/Dict/Add'),
						},
						{
							path: '/editdict',
							name: 'editdict',
							meta: { title: '编辑字典' },
							component: () => import ('../components/System/Dict/Edit'),
						},
						{
							path: '/viewdict',
							name: 'viewdict',
							meta: { title: '查看字典' },
							component: () => import ('../components/System/Dict/Info'),
						}
					]
				}
			]
		}
	]
})

export default router