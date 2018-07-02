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
				<el-table-column prop="name" label="会员姓名" align="center"></el-table-column>
				<el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
				<el-table-column prop="status" label="考勤状态" align="center">
					<template slot-scope="scope">
						<el-tag size="mini" type="info" v-if="scope.row.status">打卡失败</el-tag>
						<el-tag size="mini" type="success" v-else>打卡成功</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="create_time" label="考勤时间" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.create_time">{{ new Date(scope.row.create_time).getTime() | getdatefromtimestamp()}}</span>
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
			this.selectedList = data.map(item => item.id)
		},
		pageChange(index) {
			this.pageIndex = index
		},
		pageSizeChange(size) {
			this.pageSize = size
		},
		reset() {
			this.find.keyword = ''
		},
		getList() {
			for (let i = 0; i < 10; i++) {
				const item = {
					name: '王小明',
					mobile: '15023235656',
					status: i % 2 == 0 ? true : false,
				}
				item.id = i
				item.create_time = new Date().getTime() + (i * 1000000)
				this.list.push(item)
			}
		},
		add() {
			this.$router.push({name: 'adddoctor'})
		},
		view() {
			this.$router.push({name: 'viewdoctor'})
		},
		edit() {
			this.$router.push({name: 'editdoctor'})
		},
		del() {
			deleteConfirm('id', ids => {
				Message.success('成功！')
			})
		},
	}
}
</script>

<style lang="stylus" scoped>

</style>
