<template>
	<div class="main-content">
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="关键字">
					<el-input placeholder="姓名/手机号" v-model="find.keyword"></el-input>
				</el-form-item>
				<el-form-item label="创建时间">
					<el-date-picker
						v-model="createRangeDate"
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
				@selection-change="selectionChange" 
				border style="width: 100%" 
				size="mini" stripe>
				<el-table-column label="id" type="selection" align="center" width="40"></el-table-column>
				<el-table-column prop="name" label="姓名" align="center"></el-table-column>
				<el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
				<el-table-column prop="remark" label="简介" align="center"></el-table-column>
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
						<el-button type="success" size="mini" @click="view(scope.row.teacherId)">查看</el-button>
						<el-button type="primary" size="mini" @click="edit(scope.row.teacherId)">编辑</el-button>
						<el-button type="danger" size="mini" @click="del(scope.row.teacherId)">删除</el-button>
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
import Teacher from '../../../api/Teacher'
export default {
	data() {
		return {
			pageIndex: 1,
			pageSize: 10,
			count: 10,
			selectedList: [],
			find: {
				keyword: '',
				startDate: '',
				endDate: ''
			},
			list: [],
			createRangeDate: []
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
		selectionChange(data) {
			this.selectedList = data.map(item => item.teacherId)
		},
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		pageSizeChange(size) {
			this.pageSize = size
			this.getList()
		},
		reset() {
			this.find.keyword = ''
			this.find.startTime = ''
            this.find.endTime = ''
            this.pageIndex = 1
			this.pageSize = 10
			this.createRangeDate = []
			this.getList()
		},
		getList() {
			Teacher.find({
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				keyword: this.find.keyword,
				startTime: this.find.startTime,
				endTime: this.find.endTime
			}).then(res => {
				this.list = res.rows
				this.count = res.count
			})
		},
		add() {
			this.$router.push({name: 'addteacher'})
		},
		view(teacherId) {
			this.$router.push({name: 'viewteacher', query: { teacherId }})
		},
		edit(teacherId) {
			this.$router.push({name: 'editteacher', query: { teacherId }})
		},
		del(teacherId) {
            deleteConfirm(teacherId, ids => {
				Teacher.del({ ids }).then(res => {
					Message.success('成功！')
					this.getList()
				})
			}, this.selectedList)
        }
	}
}
</script>

<style lang="stylus" scoped>

</style>
