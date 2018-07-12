<template>
	<div class="main-content">
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="名称">
					<el-input placeholder="名称" v-model="find.name"></el-input>
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
				<el-table-column prop="name" label="名称" align="center">
					<template slot-scope="scope">
						<span class="overflow-ellipsis-simple">{{scope.row.name}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="expressType.value" label="快递" align="center" width="120"></el-table-column>
				<el-table-column prop="freight" label="运费" align="center" width="120">
					<template slot-scope="scope">
						<span>{{scope.row.freight == 0 ? '免运费' : scope.row.freight}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="price" label="价格" align="center" width="90"></el-table-column>
				<el-table-column prop="saleNum" label="销量" align="center" width="80"></el-table-column>
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
						<el-button type="success" size="mini" @click="view(scope.row.platformProductId)">查看</el-button>
						<el-button type="primary" size="mini" @click="edit(scope.row.platformProductId)">编辑</el-button>
						<el-button type="danger" size="mini" @click="del(scope.row.platformProductId)">删除</el-button>
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
import PlatformProduct from '../../../api/PlatformProduct'
export default {
	data() {
		return {
			pageIndex: 1,
			pageSize: 10,
			count: 10,
			selectedList: [],
			find: {
				name: '',
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
			this.selectedList = data.map(item => item.platformProductId)
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
			this.find.name = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList() {
			PlatformProduct.find({
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				name: this.find.name,
				startTime: this.find.startTime,
				endTime: this.find.endTime
			}).then(res => {
				this.list = res.rows
				this.count = res.count
			})
		},
		add() {
			this.$router.push({name: 'addplatformproduct'})
		},
		view(platformProductId) {
			this.$router.push({name: 'viewplatformproduct', query: { platformProductId } })
		},
		edit(platformProductId) {
			this.$router.push({name: 'editplatformproduct', query: { platformProductId } })
		},
		del(platformProductId) {
			deleteConfirm(platformProductId, ids => {
				PlatformProduct.del({ ids }).then(res => {
					Message.success('成功！')
					this.getList()
				})
			}, this.selectedList)
		},
	}
}
</script>

<style lang="stylus" scoped>

</style>
