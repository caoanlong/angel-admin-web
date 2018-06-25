<template>
	<div class="main-content">
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="关键字">
					<el-input placeholder="会员/订单号/名称" v-model="find.keywords"></el-input>
				</el-form-item>
				<el-form-item label="下单时间">
					<el-date-picker
						v-model="saleRangeDate"
						type="daterange" 
						value-format="timestamp" 
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
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
				<el-table-column prop="memberName" label="会员" align="center"></el-table-column>
				<el-table-column prop="orderNo" label="订单号" align="center"></el-table-column>
				<el-table-column prop="name" label="名称" align="center"></el-table-column>
				<el-table-column prop="info" label="描述" align="center"></el-table-column>
				<el-table-column prop="price" label="价格" align="center"></el-table-column>
				<el-table-column prop="status" label="状态" align="center"></el-table-column>
				<el-table-column prop="sale_time" label="下单时间" align="center"  width="140">
					<template slot-scope="scope">
						<span v-if="scope.row.create_time">{{ new Date(scope.row.create_time).getTime() | getdatefromtimestamp()}}</span>
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
				startDate: '',
				endDate: '',
			},
			list: [],
			saleRangeDate: []
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
					memberName: '王五',
					orderNo: '201806091234567788',
					name: '正姿舞蹈',
					info: '10节课体验卡',
					price: 200,
					status: '支付成功',
				}
				item.id = i
				item.sale_time = new Date().getTime() + (i * 1000000)
				item.create_time = new Date().getTime() + (i * 1000000)
				this.list.push(item)
			}
		},
		view() {
			this.$router.push({name: 'viewmemorder'})
		},
	}
}
</script>

<style lang="stylus" scoped>

</style>
