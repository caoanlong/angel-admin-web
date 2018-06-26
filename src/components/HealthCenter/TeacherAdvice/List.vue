<template>
	<div class="main-content">
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="关键字">
					<el-input placeholder="建议/会员/老师" v-model="find.keywords"></el-input>
				</el-form-item>
				<el-form-item label="创建时间">
					<el-date-picker
						v-model="rangeDate"
						type="daterange" 
						value-format="timestamp" 
						range-separator="至"
						start-placeholder="开始时间"
						end-placeholder="结束时间"
						@change="selectDateRange">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getList">查询</el-button>
					<el-button type="default" @click="reset">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="tableControl">
			<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
			<el-button type="default" size="mini" icon="el-icon-delete" @click="del">批量删除</el-button>
		</div>
		<div class="F-table">
			<el-table 
				:data="list" 
				border style="width: 100%" 
				size="mini" stripe>
				<el-table-column label="id" type="selection" align="center" width="40"></el-table-column>
				<el-table-column prop="member" label="会员" align="center" width="90"></el-table-column>
				<el-table-column prop="teacher" label="老师" align="center" width="90"></el-table-column>
				<el-table-column prop="remark" label="建议" align="center" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column prop="create_user.name" label="创建人" align="center" width="90"></el-table-column>
				<el-table-column prop="update_user.name" label="更新人" align="center" width="90"></el-table-column>
				<el-table-column prop="create_time" label="创建时间" align="center"  width="140">
					<template slot-scope="scope">
						<span v-if="scope.row.create_time">{{ new Date(scope.row.create_time).getTime() | getdatefromtimestamp()}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="update_time" label="更新时间" align="center" width="140">
					<template slot-scope="scope">
						<span v-if="scope.row.update_time">{{ new Date(scope.row.update_time).getTime() | getdatefromtimestamp()}}</span>
					</template>
				</el-table-column>
				<el-table-column width="180" align="center" fixed="right">
					<template slot-scope="scope">
						<el-button type="success" size="mini" @click="view()">查看</el-button>
						<el-button type="primary" size="mini" @click="edit()">编辑</el-button>
						<el-button type="danger" size="mini" @click="del()">删除</el-button>
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
import { deleteConfirm } from '../../../common/utils'
export default {
	data() {
		return {
			pageIndex: 1,
			pageSize: 10,
			count: 10,
			find: {
				keywords: '',
				startDate: '',
				endDate: ''
			},
			list: [],
			rangeDate: []
		}
	},
	components: { Page },
	created() {
		this.getList()
	},
	methods: {
		selectDateRange(date) {
			this.find.startDate = date[0]
			this.find.endDate = date[1]
		},
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
					member: '小明',
					teacher: '大毛',
					remark: '治疗的同时注意不要吃辛辣的食物，注意具备的卫生治疗的同时治疗的同时注意不要吃辛辣的食物，注意具备的卫生治疗的同时',
					create_user: {
						name: '龙哥'
					},
					update_user: {
						name: '龙哥'
					}
				}
				item.id = i
				item.record_date = new Date().getTime() + (i * 1000000)
				item.create_time = new Date().getTime() + (i * 1000000)
				item.update_time = new Date().getTime() + (i * 1000000)
				this.list.push(item)
			}
		},
		add() {
			this.$router.push({name: 'addteacheradvice'})
		},
		view() {
			this.$router.push({name: 'viewteacheradvice'})
		},
		edit() {
			this.$router.push({name: 'editteacheradvice'})
		},
		del() {
			deleteConfirm('id', ids => {
				Message.success('成功！')
			})
		}
	}
}
</script>

<style lang="stylus" scoped>

</style>
