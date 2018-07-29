<template>
	<div class="main-content">
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="关键字">
					<el-input placeholder="会员/订单号/名称" v-model="find.keyword"></el-input>
				</el-form-item>
				<el-form-item label="所属门店" v-if="storeId == null || storeId == 'null'">
					<el-select style="width: 100%" v-model="find.storeId" placeholder="请选择">
						<el-option v-for="store in stores" :key="store.storeId" :label="store.name" :value="store.storeId"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="下单时间">
					<el-date-picker
						v-model="saleRangeDate"
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
				<el-table-column prop="orderNo" label="订单号" align="center"></el-table-column>
				<el-table-column label="名称" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.lessonSet">{{scope.row.lessonSet.name}}</span>
						<span v-else-if="scope.row.product">{{scope.row.product.name}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="totalPrice" label="价格" align="center"></el-table-column>
				<el-table-column prop="store.name" label="所属门店" align="center"></el-table-column>
				<el-table-column label="状态" align="center">
					<template slot-scope="scope">
						<el-tag size="mini" type="success" v-if="scope.row.status == 'success'">支付成功</el-tag>
						<el-tag size="mini" type="info" v-else>支付失败</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="下单时间" align="center"  width="140">
					<template slot-scope="scope">
						<span v-if="scope.row.createTime">{{ new Date(scope.row.createTime).getTime() | getdatefromtimestamp()}}</span>
					</template>
				</el-table-column>
				<el-table-column width="80" align="center" fixed="right">
					<template slot-scope="scope">
						<el-button type="success" size="mini" @click="view(scope.row.orderId)">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
			<Page :total="count" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import Page from '../../CommonComponents/Page'
import Order from '../../../api/Order'
import SysStore from '../../../api/SysStore'
export default {
	data() {
		return {
			pageIndex: 1,
			pageSize: 10,
			count: 10,
			find: {
				keyword: '',
				storeId: '',
				startTime: '',
				endTime: ''
			},
			list: [],
			stores: [],
			saleRangeDate: []
		}
	},
	computed: {
		...mapGetters(['storeId'])
	},
	components: { Page },
	created() {
		this.find.storeId = (this.storeId != null && this.storeId != 'null') ? this.storeId : ''
		this.getList()
		this.getStores()
	},
	methods: {
		selectDateRange(date) {
			this.find.startDate = date[0]
			this.find.endDate = date[1]
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
			this.find.storeId = (this.storeId != null && this.storeId != 'null') ? this.storeId : ''
			this.find.startTime = ''
			this.find.endTime = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.saleRangeDate = []
			this.getList()
		},
		getList() {
			Order.find({
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				keyword: this.find.keyword,
				startTime: this.find.startTime,
				endTime: this.find.endTime,
				storeId: this.find.storeId
			}).then(res => {
				this.list = res.rows
				this.count = res.count
			})
		},
		view(orderId) {
			this.$router.push({name: 'viewmemorder', query: { orderId }})
		},
		getStores() {
			SysStore.find({
				pageSize: 1000
			}).then(res => {
				this.stores = res.rows
			})
		}
	}
}
</script>

<style lang="stylus" scoped>

</style>
