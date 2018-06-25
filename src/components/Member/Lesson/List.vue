<template>
	<div class="main-content">
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="关键字">
					<el-input placeholder="会员/课程名称" v-model="find.keywords"></el-input>
				</el-form-item>
				<el-form-item label="课程类型">
					<el-select placeholder="请选择" v-model="find.lessonType">
						<el-option label="48节课半年卡" value="48节课半年卡"></el-option>
						<el-option label="96节课年卡" value="96节课年卡"></el-option>
					</el-select>
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
				<el-table-column prop="memberName" label="会员" align="center"></el-table-column>
				<el-table-column prop="lessonName" label="课程名称" align="center"></el-table-column>
				<el-table-column prop="lessonType" label="课程类型" align="center"></el-table-column>
				<el-table-column prop="num" label="已上课时" align="center"></el-table-column>
				<el-table-column prop="totalNum" label="总课时" align="center"></el-table-column>
				<el-table-column prop="valid_time" label="有效期至" align="center"  width="140">
					<template slot-scope="scope">
						<span v-if="scope.row.create_time">{{ new Date(scope.row.create_time).getTime() | getdatefromtimestamp(true)}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="create_time" label="创建时间" align="center"  width="140">
					<template slot-scope="scope">
						<span v-if="scope.row.create_time">{{ new Date(scope.row.create_time).getTime() | getdatefromtimestamp()}}</span>
					</template>
				</el-table-column>
				<el-table-column width="180" align="center" fixed="right">
					<template slot-scope="scope">
						<el-button type="success" size="mini" @click="view()">查看</el-button>
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
				keywords: '',
				lessonType: ''
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
			this.find.lessonType = ''
		},
		getList() {
			for (let i = 0; i < 10; i++) {
				const item = {
					memberName: '王五',
					lessonName: '正姿舞蹈',
					lessonType: '48节课半年卡',
					num: 12,
					totalNum: 48
				}
				item.id = i
				item.create_time = new Date().getTime() + (i * 1000000)
				this.list.push(item)
			}
		},
		view() {
			this.$router.push({name: 'viewmemlesson'})
		},
	}
}
</script>

<style lang="stylus" scoped>

</style>
