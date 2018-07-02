const menus = [{
	"menu_id": "997539946208301056",
	"menu_pid": null,
	"name": "首页",
	"route_name": "home",
	"path": "/",
	"icon": "home-icon",
	"sort": 1,
	"is_show": true
  },
  {
	"menu_id": "997712280487596032",
	"menu_pid": null,
	"name": "健康助长",
	"route_name": "healthcenter",
	"path": "/healthcenter",
	"icon": "international",
	"sort": 2,
	"is_show": true,
	"children": [
		{
			"menu_id": "997712280487596033",
			"menu_pid": null,
			"name": "课间剪影",
			"route_name": "lessonphoto",
			"path": "/lessonphoto",
			"icon": "",
			"sort": 2,
			"is_show": true
		},
		{
			"menu_id": "997712280487596034",
			"menu_pid": null,
			"name": "健康报告",
			"route_name": "healthrecord",
			"path": "/healthrecord",
			"icon": "",
			"sort": 2,
			"is_show": true
		},
		{
			"menu_id": "997712280487596035",
			"menu_pid": null,
			"name": "老师建议",
			"route_name": "teacheradvice",
			"path": "/teacheradvice",
			"icon": "",
			"sort": 2,
			"is_show": true
		},
		{
			"menu_id": "997712280487596036",
			"menu_pid": null,
			"name": "天使留言",
			"route_name": "angelremark",
			"path": "/angelremark",
			"icon": "",
			"sort": 2,
			"is_show": true
		}
	]
  },
  {
	"menu_id": "997712280487596123",
	"menu_pid": null,
	"name": "商城管理",
	"route_name": "store",
	"path": "/store",
	"icon": "international",
	"sort": 2,
	"is_show": true,
	"children": [
		{
			"menu_id": "997712280487596033",
			"menu_pid": null,
			"name": "课程套餐",
			"route_name": "lessonset",
			"path": "/lessonset",
			"icon": "",
			"sort": 2,
			"is_show": true
		},
		{
			"menu_id": "997712280487596034",
			"menu_pid": null,
			"name": "平台产品",
			"route_name": "platformproduct",
			"path": "/platformproduct",
			"icon": "",
			"sort": 2,
			"is_show": true
		}
	]
  },
  {
	"menu_id": "997717173109657600",
	"menu_pid": null,
	"name": "会员管理",
	"route_name": "membermanage",
	"path": "/membermanage",
	"icon": "certification-icon",
	"sort": 3,
	"is_show": true,
	"children": [
		{
			"menu_id": "997712280487596039",
			"menu_pid": null,
			"name": "会员列表",
			"route_name": "member",
			"path": "/member",
			"icon": "",
			"sort": 1,
			"is_show": true
		},
		{
			"menu_id": "997712280487596033",
			"menu_pid": null,
			"name": "会员课程",
			"route_name": "lesson",
			"path": "/lesson",
			"icon": "",
			"sort": 2,
			"is_show": true
		},
		{
			"menu_id": "997712280487596034",
			"menu_pid": null,
			"name": "会员订单",
			"route_name": "order",
			"path": "/order",
			"icon": "",
			"sort": 3,
			"is_show": true
		},
		{
			"menu_id": "997712280487596055",
			"menu_pid": null,
			"name": "会员考勤",
			"route_name": "attendance",
			"path": "/attendance",
			"icon": "",
			"sort": 4,
			"is_show": true
		}
	]
  },
  {
	"menu_id": "997717173109657450",
	"menu_pid": null,
	"name": "人员管理",
	"route_name": "personmanage",
	"path": "/personmanage",
	"icon": "certification-icon",
	"sort": 3,
	"is_show": true,
	"children": [
		{
			"menu_id": "997712280487577039",
			"menu_pid": null,
			"name": "老师列表",
			"route_name": "teacher",
			"path": "/teacher",
			"icon": "",
			"sort": 1,
			"is_show": true
		},
		{
			"menu_id": "997712280487577139",
			"menu_pid": null,
			"name": "医生列表",
			"route_name": "doctor",
			"path": "/doctor",
			"icon": "",
			"sort": 2,
			"is_show": true
		}
	]
  },
  {
	"menu_id": "997714742409826304",
	"menu_pid": null,
	"name": "系统管理",
	"route_name": "system",
	"path": "/system",
	"icon": "system-icon",
	"sort": 4,
	"is_show": true,
	"children": [{
		"menu_id": "998401010542186496",
		"menu_pid": "997714742409826304",
		"name": "用户列表",
		"route_name": "user",
		"path": "/user",
		"icon": "",
		"sort": 1,
		"is_show": true
	  },
	  {
		"menu_id": "998401144487284736",
		"menu_pid": "997714742409826304",
		"name": "角色列表",
		"route_name": "role",
		"path": "/role",
		"icon": "",
		"sort": 2,
		"is_show": true
	  },
	  {
		"menu_id": "998403714739998720",
		"menu_pid": "997714742409826304",
		"name": "字典列表",
		"route_name": "dict",
		"path": "/dict",
		"icon": "",
		"sort": 3,
		"is_show": true
	  },
	//   {
	// 	"menu_id": "998404980811632640",
	// 	"menu_pid": "997714742409826304",
	// 	"name": "菜单管理",
	// 	"route_name": "menumanage",
	// 	"path": "/menumanage",
	// 	"icon": "",
	// 	"sort": 4,
	// 	"is_show": true
	//   }
	]
  }
]

export default menus
