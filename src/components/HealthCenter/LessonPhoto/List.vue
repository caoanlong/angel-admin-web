<template>
	<div class="main-content">
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="关键字">
					<el-input placeholder="标题/学员/创建人" v-model="find.title"></el-input>
				</el-form-item>
				<el-form-item label="课程类型">
					<el-select placeholder="请选择" v-model="find.lessonType">
						<el-option label="正姿舞蹈" value="正姿舞蹈"></el-option>
						<el-option label="正姿跆拳道" value="正姿跆拳道"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="上传时间">
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
				<el-table-column prop="title" label="标题" align="center"></el-table-column>
				<el-table-column prop="studentName" label="学生" align="center"></el-table-column>
				<el-table-column prop="createTime" label="创建时间" align="center"  width="140">
					<template slot-scope="scope">
						<span v-if="scope.row.createTime">{{ new Date(scope.row.createTime).getTime() | getdatefromtimestamp()}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="updateTime" label="更新时间" align="center" width="140">
					<template slot-scope="scope">
						<span v-if="scope.row.updateTime">{{ new Date(scope.row.updateTime).getTime() | getdatefromtimestamp()}}</span>
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
				title: '',
				lessonType: '',
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
			this.find.title = ''
		},
		getList() {
			for (let i = 0; i < 10; i++) {
				const item = {
					title: '正姿中心摄影',
					studentName: '小明'
				}
				item.id = i
				item.createTime = new Date().getTime() + (i * 1000000)
				item.updateTime = new Date().getTime() + (i * 1000000)
				this.list.push(item)
			}
		},
		add() {
			this.$router.push({name: 'addlessonphoto'})
		},
		view() {
			this.$router.push({name: 'viewlessonphoto'})
		},
		edit() {
			this.$router.push({name: 'editlessonphoto'})
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
