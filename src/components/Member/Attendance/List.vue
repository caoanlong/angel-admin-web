<template>
	<div class="main-content">
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="关键字">
					<el-input placeholder="姓名/手机号" v-model="find.keyword"></el-input>
				</el-form-item>
				<el-form-item label="考勤状态">
					<el-select placeholder="请选择" v-model="find.status" >
						<el-option label="打卡成功" :value="false"></el-option>
						<el-option label="打卡失败" :value="true"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="考勤时间">
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
		<div class="F-table">
			<el-table 
				:data="list" 
				border style="width: 100%" 
				size="mini" stripe>
				<el-table-column prop="member.name" label="会员姓名" align="center"></el-table-column>
				<el-table-column prop="member.mobile" label="手机号" align="center"></el-table-column>
				<el-table-column prop="status" label="考勤状态" align="center">
					<template slot-scope="scope">
						<el-tag size="mini" type="success" v-if="scope.row.status == 'success'">打卡成功</el-tag>
						<el-tag size="mini" type="info" v-else>打卡失败</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="考勤时间" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.createTime">{{ new Date(scope.row.createTime).getTime() | getdatefromtimestamp()}}</span>
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
import Attendance from '../../../api/Attendance'
export default {
	data() {
		return {
			pageIndex: 1,
			pageSize: 10,
			count: 10,
			find: {
				keyword: '',
				status: '',
				startTime: '',
				endTime: ''
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
			this.find.startTime = date[0]
			this.find.endTime = date[1]
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
			this.find.status = ''
			this.find.startTime = ''
			this.find.endTime = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.createRangeDate = []
			this.getList()
		},
		getList() {
			Attendance.find({
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				keyword: this.find.keyword,
				status: this.find.status,
				startTime: this.find.startTime,
				endTime: this.find.endTime
			}).then(res => {
				this.list = res.rows
				this.count = res.count
			})
		},
		view() {
			this.$router.push({name: 'viewattendance'})
		}
	}
}
</script>

<style lang="stylus" scoped>

</style>
