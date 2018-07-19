import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
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
					path: '/userinfo',
					name: 'userinfo',
					meta: { title: '个人资料' },
					component: () => import ('../components/User')
				},
				{
					path: '/updatepassword',
					name: 'updatepassword',
					meta: { title: '修改密码' },
					component: () => import('../components/User/updatePassword')
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
							component: () => import ('../components/HealthCenter/LessonPhoto/List')
						},
						{
							path: '/addlessonphoto',
							name: 'addlessonphoto',
							meta: { title: '添加课间剪影' },
							component: () => import ('../components/HealthCenter/LessonPhoto/Add')
						},
						{
							path: '/editlessonphoto',
							name: 'editlessonphoto',
							meta: { title: '编辑课间剪影' },
							component: () => import ('../components/HealthCenter/LessonPhoto/Edit')
						},
						{
							path: '/viewlessonphoto',
							name: 'viewlessonphoto',
							meta: { title: '查看课间剪影' },
							component: () => import ('../components/HealthCenter/LessonPhoto/Info')
						},
						{
							path: '/healthrecord',
							name: 'healthrecord',
							meta: { title: '健康报告' },
							component: () => import ('../components/HealthCenter/HealthRecord/List')
						},
						{
							path: '/addhealthrecord',
							name: 'addhealthrecord',
							meta: { title: '添加健康报告' },
							component: () => import ('../components/HealthCenter/HealthRecord/Add')
						},
						{
							path: '/edithealthrecord',
							name: 'edithealthrecord',
							meta: { title: '编辑健康报告' },
							component: () => import ('../components/HealthCenter/HealthRecord/Edit')
						},
						{
							path: '/viewhealthrecord',
							name: 'viewhealthrecord',
							meta: { title: '查看健康报告' },
							component: () => import ('../components/HealthCenter/HealthRecord/Info')
						},
						{
							path: '/teacheradvice',
							name: 'teacheradvice',
							meta: { title: '老师建议' },
							component: () => import('../components/HealthCenter/TeacherAdvice/List')
						},
						{
							path: '/addteacheradvice',
							name: 'addteacheradvice',
							meta: { title: '添加老师建议' },
							component: () => import ('../components/HealthCenter/TeacherAdvice/Add')
						},
						{
							path: '/editteacheradvice',
							name: 'editteacheradvice',
							meta: { title: '编辑老师建议' },
							component: () => import ('../components/HealthCenter/TeacherAdvice/Edit')
						},
						{
							path: '/viewteacheradvice',
							name: 'viewteacheradvice',
							meta: { title: '查看老师建议' },
							component: () => import ('../components/HealthCenter/TeacherAdvice/Info')
						},
						{
							path: '/angelremark',
							name: 'angelremark',
							meta: { title: '天使留言' },
							component: () => import ('../components/HealthCenter/AngelRemark/List')
						},
						{
							path: '/viewangelremark',
							name: 'viewangelremark',
							meta: { title: '查看天使留言' },
							component: () => import ('../components/HealthCenter/AngelRemark/Info')
						},
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
							component: () => import ('../components/Store/LessonSet/List')
						},
						{
							path: '/addlesson',
							name: 'addlesson',
							meta: { title: '添加课程' },
							component: () => import ('../components/Store/LessonSet/Add')
						},
						{
							path: '/editlesson',
							name: 'editlesson',
							meta: { title: '编辑课程' },
							component: () => import ('../components/Store/LessonSet/Edit')
						},
						{
							path: '/viewlesson',
							name: 'viewlesson',
							meta: { title: '查看课程' },
							component: () => import ('../components/Store/LessonSet/Info')
						},
						{
							path: '/platformproduct',
							name: 'platformproduct',
							meta: { title: '平台产品' },
							component: () => import ('../components/Store/PlatformProduct/List')
						},
						{
							path: '/addplatformproduct',
							name: 'addplatformproduct',
							meta: { title: '添加平台产品' },
							component: () => import ('../components/Store/PlatformProduct/Add')
						},
						{
							path: '/editplatformproduct',
							name: 'editplatformproduct',
							meta: { title: '编辑平台产品' },
							component: () => import ('../components/Store/PlatformProduct/Edit')
						},
						{
							path: '/viewplatformproduct',
							name: 'viewplatformproduct',
							meta: { title: '查看平台产品' },
							component: () => import ('../components/Store/PlatformProduct/Info')
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
							component: () => import ('../components/Member/Member/List')
						},
						{
							path: '/addmember',
							name: 'addmember',
							meta: { title: '添加会员' },
							component: () => import ('../components/Member/Member/Add')
						},
						{
							path: '/editmember',
							name: 'editmember',
							meta: { title: '编辑会员' },
							component: () => import ('../components/Member/Member/Edit')
						},
						{
							path: '/viewmember',
							name: 'viewmember',
							meta: { title: '查看会员' },
							component: () => import ('../components/Member/Member/Info')
						},
						{
							path: '/lesson',
							name: 'lesson',
							meta: { title: '会员课程' },
							component: () => import ('../components/Member/Lesson/List')
						},
						{
							path: '/viewmemlesson',
							name: 'viewmemlesson',
							meta: { title: '查看会员课程' },
							component: () => import ('../components/Member/Lesson/Info')
						},
						{
							path: '/order',
							name: 'order',
							meta: { title: '会员订单' },
							component: () => import ('../components/Member/Order/List')
						},
						{
							path: '/viewmemorder',
							name: 'viewmemorder',
							meta: { title: '查看会员订单' },
							component: () => import ('../components/Member/Order/Info')
						},
						{
							path: '/attendance',
							name: 'attendance',
							meta: { title: '会员考勤' },
							component: () => import ('../components/Member/Attendance/List')
						},
						{
							path: '/viewattendance',
							name: 'viewattendance',
							meta: { title: '查看会员考勤' },
							component: () => import ('../components/Member/Attendance/Info')
						}
					]
				},
				{
					path: '/personmanage',
					name: 'personmanage',
					meta: { title: '人员管理' },
					component: () => import ('../components/Person'),
					redirect: '/teacher',
					children: [
						{
							path: '/teacher',
							name: 'teacher',
							meta: { title: '老师列表' },
							component: () => import ('../components/Person/Teacher/List')
						},
						{
							path: '/addteacher',
							name: 'addteacher',
							meta: { title: '添加老师' },
							component: () => import ('../components/Person/Teacher/Add')
						},
						{
							path: '/editteacher',
							name: 'editteacher',
							meta: { title: '编辑老师' },
							component: () => import ('../components/Person/Teacher/Edit')
						},
						{
							path: '/viewteacher',
							name: 'viewteacher',
							meta: { title: '查看老师' },
							component: () => import ('../components/Person/Teacher/Info')
						},
						{
							path: '/doctor',
							name: 'doctor',
							meta: { title: '医生列表' },
							component: () => import ('../components/Person/Doctor/List')
						},
						{
							path: '/adddoctor',
							name: 'adddoctor',
							meta: { title: '添加医生' },
							component: () => import ('../components/Person/Doctor/Add')
						},
						{
							path: '/editdoctor',
							name: 'editdoctor',
							meta: { title: '编辑医生' },
							component: () => import ('../components/Person/Doctor/Edit')
						},
						{
							path: '/viewdoctor',
							name: 'viewdoctor',
							meta: { title: '查看医生' },
							component: () => import ('../components/Person/Doctor/Info')
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
							component: () => import ('../components/System/User/List')
						},
						{
							path: '/adduser',
							name: 'adduser',
							meta: { title: '添加用户' },
							component: () => import ('../components/System/User/Add')
						},
						{
							path: '/edituser',
							name: 'edituser',
							meta: { title: '编辑用户' },
							component: () => import ('../components/System/User/Edit')
						},
						{
							path: '/viewuser',
							name: 'viewuser',
							meta: { title: '查看用户' },
							component: () => import ('../components/System/User/Info')
						},
						{
							path: '/role',
							name: 'role',
							meta: { title: '角色列表' },
							component: () => import ('../components/System/Role/List')
						},
						{
							path: '/addrole',
							name: 'addrole',
							meta: { title: '添加角色' },
							component: () => import ('../components/System/Role/Add')
						},
						{
							path: '/editrole',
							name: 'editrole',
							meta: { title: '编辑角色' },
							component: () => import ('../components/System/Role/Edit')
						},
						{
							path: '/viewrole',
							name: 'viewrole',
							meta: { title: '查看角色' },
							component: () => import ('../components/System/Role/Info')
						},
						{
							path: '/stores',
							name: 'stores',
							meta: { title: '门店列表' },
							component: () => import ('../components/System/Stores/List')
						},
						{
							path: '/addstores',
							name: 'addstores',
							meta: { title: '添加门店' },
							component: () => import ('../components/System/Stores/Add')
						},
						{
							path: '/editstores',
							name: 'editstores',
							meta: { title: '编辑门店' },
							component: () => import ('../components/System/Stores/Edit')
						},
						{
							path: '/viewstores',
							name: 'viewstores',
							meta: { title: '查看门店' },
							component: () => import ('../components/System/Stores/Info')
						},
						{
							path: '/dict',
							name: 'dict',
							meta: { title: '字典列表' },
							component: () => import ('../components/System/Dict/List')
						},
						{
							path: '/adddict',
							name: 'adddict',
							meta: { title: '添加字典' },
							component: () => import ('../components/System/Dict/Add')
						},
						{
							path: '/editdict',
							name: 'editdict',
							meta: { title: '编辑字典' },
							component: () => import ('../components/System/Dict/Edit')
						},
						{
							path: '/viewdict',
							name: 'viewdict',
							meta: { title: '查看字典' },
							component: () => import ('../components/System/Dict/Info')
						}
					]
				}
			]
		}
	]
})

NProgress.configure({ showSpinner: false })// NProgress Configuration

router.beforeEach((to, from, next) => {
	NProgress.start()
	if (localStorage.getItem('token') && localStorage.getItem('token') != 'undefined') {
		if (to.path === '/login') {
			next({ path: '/' })
		} else {
			next()
		}
		NProgress.done()
	} else {
		/* has no token*/
		if (to.path === '/login') {
			next()
		} else {
			next('/login')
		}
		NProgress.done()
	}
})

export default router