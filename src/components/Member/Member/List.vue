<template>
	<div class="main-content">
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="关键字">
					<el-input placeholder="用户名/手机号" v-model="find.keywords"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getList">查询</el-button>
					<el-button type="default" @click="reset">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="F-table">
			<el-table 
				:data="list" 
				border style="width: 100%" 
				size="mini" stripe>
				<el-table-column prop="name" label="用户名" align="center"></el-table-column>
				<el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
				<el-table-column prop="create_time" label="创建时间" align="center"  width="140">
					<template slot-scope="scope">
						<span v-if="scope.row.create_time">{{ new Date(scope.row.create_time).getTime() | getdatefromtimestamp()}}</span>
					</template>
				</el-table-column>
				<el-table-column width="320" align="center" fixed="right">
					<template slot-scope="scope">
						<el-button type="success" size="mini" @click="view()">查看</el-button>
						<el-button type="warning" size="mini" @click="disable()">禁用</el-button>
						<el-button type="primary" size="mini">发送报告</el-button>
						<el-button type="primary" size="mini">发送剪影</el-button>
						<el-button type="primary" size="mini">老师建议</el-button>
					</template>
				</el-table-column>
			</el-table>
			<Page :total="count" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
		</div>
	</div>
</template>

<script>
import { Message } from 'element-ui'
import Page from '../../CommonComponents/Page'
export default {
	data() {
		return {
			pageIndex: 1,
			pageSize: 10,
			count: 10,
			find: {
				keywords: ''
			},
			list: []
		}
	},
	components: { Page },
	created() {
		this.getList()
	},
	methods: {
		pageChange(index) {
			this.pageIndex = index
		},
		pageSizeChange(size) {
			this.pageSize = size
		},
		reset() {
			this.find.keywords = ''
		},
		getList() {
			for (let i = 0; i < 10; i++) {
				const item = {
					name: '王五',
					mobile: '15036366969',
					openid: 'wxlljffkjflhklkhlkh'
				}
				item.id = i
				item.create_time = new Date().getTime() + (i * 1000000)
				this.list.push(item)
			}
		},
		view() {
			this.$router.push({name: 'viewmember'})
		},
		disable() {
			
		}
	}
}
</script>

<style lang="stylus" scoped>

</style>
