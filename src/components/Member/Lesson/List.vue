<template>
	<div class="main-content">
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="关键字">
					<el-input placeholder="会员/课程名称" v-model="find.keywords"></el-input>
				</el-form-item>
				<el-form-item label="所属门店" v-if="storeId == null || storeId == 'null'">
					<el-select style="width: 100%" v-model="find.storeId" placeholder="请选择">
						<el-option v-for="store in stores" :key="store.storeId" :label="store.name" :value="store.storeId"></el-option>
					</el-select>
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
				<el-table-column prop="store.name" label="所属门店" align="center"></el-table-column>
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
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import Page from '../../CommonComponents/Page'
import Lesson from '../../../api/Lesson'
import SysStore from '../../../api/SysStore'
export default {
	data() {
		return {
			pageIndex: 1,
			pageSize: 10,
			count: 10,
			find: {
				keywords: '',
				storeId: '',
				startTime: '',
				endTime: ''
			},
			list: [],
			stores: [],
			createRangeDate: []
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
			this.find.storeId = (this.storeId != null && this.storeId != 'null') ? this.storeId : ''
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
				endTime: this.find.endTime,
				storeId: this.find.storeId
			}).then(res => {
				this.list = res.rows
				this.count = res.count
			})
		},
		view(lessonId) {
			this.$router.push({name: 'viewmemlesson', query: { lessonId }})
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
