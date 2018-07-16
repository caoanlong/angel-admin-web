<template>
	<div class="main-content">
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="关键字">
					<el-input placeholder="用户名/手机号" v-model="find.keywords"></el-input>
				</el-form-item>
				<el-form-item label="注册时间">
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
				<el-table-column prop="name" label="学员名" align="center"></el-table-column>
				<el-table-column prop="father" label="家长姓名" align="center"></el-table-column>
				<el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
				<el-table-column prop="createTime" label="注册时间" align="center"  width="140">
					<template slot-scope="scope">
						<span v-if="scope.row.createTime">{{ new Date(scope.row.createTime).getTime() | getdatefromtimestamp()}}</span>
					</template>
				</el-table-column>
				<el-table-column width="320" align="center" fixed="right">
					<template slot-scope="scope">
						<el-button type="success" size="mini" @click="view(scope.row.memberId)">查看</el-button>
						<el-button type="danger" size="mini" @click="disable(scope.row.memberId, true)" v-if="!scope.row.isDisabled">禁用</el-button>
						<el-button type="warning" size="mini" @click="disable(scope.row.memberId, false)" v-else>启用</el-button>
						<el-button type="primary" size="mini" @click="sendReport(scope.row.memberId)">发送报告</el-button>
						<el-button type="primary" size="mini" @click="sendPhoto(scope.row.memberId)">发送剪影</el-button>
						<el-button type="primary" size="mini" @click="teacherAdvice(scope.row.memberId)">老师建议</el-button>
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
import Member from '../../../api/Member'
export default {
	data() {
		return {
			pageIndex: 1,
			pageSize: 10,
			count: 10,
			find: {
				keywords: '',
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
			this.find.startTime = ''
			this.find.endTime = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.createRangeDate = []
			this.getList()
		},
		getList() {
			Member.find({
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
		view(memberId) {
			this.$router.push({name: 'viewmember', query: { memberId }})
		},
		disable(memberId, isDisabled) {
			Member.disable({
				memberId,
				isDisabled
			}).then(res => {
				Message.success(res.data.msg)
				this.getList()
			})
		},
		sendReport(memberId) {
			this.$router.push({name: 'addhealthrecord', query: { memberId }})
		},
		sendPhoto(memberId) {
			this.$router.push({name: 'addlessonphoto', query: { memberId }})
		},
		teacherAdvice(memberId) {
			this.$router.push({name: 'addteacheradvice', query: { memberId }})
		}
	}
}
</script>

<style lang="stylus" scoped>

</style>
