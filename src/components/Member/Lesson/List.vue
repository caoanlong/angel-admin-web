<template>
	<div class="main-content">
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="关键字">
					<el-input placeholder="会员/课程名称" v-model="find.keywords"></el-input>
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
		<div class="F-table">
			<el-table 
				:data="list" 
				border style="width: 100%" 
				size="mini" stripe>
				<el-table-column prop="member.name" label="会员" align="center"></el-table-column>
				<el-table-column prop="product.name" label="课程名称" align="center"></el-table-column>
				<el-table-column prop="product.label.value" label="课程类型" align="center"></el-table-column>
				<el-table-column prop="num" label="已上课时" align="center"></el-table-column>
				<el-table-column prop="totalNum" label="总课时" align="center"></el-table-column>
				<el-table-column prop="validityDate" label="有效期至" align="center"  width="140">
					<template slot-scope="scope">
						<span v-if="scope.row.validityDate">{{ new Date(scope.row.validityDate).getTime() | getdatefromtimestamp(true)}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间" align="center"  width="140">
					<template slot-scope="scope">
						<span v-if="scope.row.createTime">{{ new Date(scope.row.createTime).getTime() | getdatefromtimestamp()}}</span>
					</template>
				</el-table-column>
				<el-table-column width="180" align="center" fixed="right">
					<template slot-scope="scope">
						<el-button type="success" size="mini" @click="view(scope.row.lessonId)">查看</el-button>
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
import Lesson from '../../../api/Lesson'
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
			Lesson.find({
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
		view(lessonId) {
			this.$router.push({name: 'viewmemlesson', query: { lessonId }})
		},
	}
}
</script>

<style lang="stylus" scoped>

</style>
