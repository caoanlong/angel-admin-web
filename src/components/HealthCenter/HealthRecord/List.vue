<template>
	<div class="main-content">
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="关键字">
					<el-input placeholder="名称/会员/医生" v-model="find.keyword"></el-input>
				</el-form-item>
                <el-form-item label="类型">
					<el-select placeholder="请选择" v-model="find.typeId">
						<el-option v-for="item in types" :label="item.value" :value="item.dictId" :key="item.dictId"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所属门店" v-if="storeId == null || storeId == 'null'">
					<el-select style="width: 100%" v-model="find.storeId" placeholder="请选择">
						<el-option v-for="store in stores" :key="store.storeId" :label="store.name" :value="store.storeId"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="上传时间">
					<el-date-picker
						v-model="rangeDate"
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
				border style="width: 100%" 
				size="mini" stripe 
				@selection-change="selectionChange">
				<el-table-column label="id" type="selection" align="center" width="40"></el-table-column>
				<el-table-column prop="name" label="名称" :show-overflow-tooltip="true" align="center"></el-table-column>
				<el-table-column prop="member.name" label="会员" align="center" width="90"></el-table-column>
				<el-table-column prop="person.name" label="医生" align="center" width="90"></el-table-column>
				<el-table-column prop="type.value" label="类型" align="center" width="90"></el-table-column>
				<el-table-column prop="recordDate" label="报告日期" align="center"  width="140">
					<template slot-scope="scope">
						<span v-if="scope.row.recordDate">{{ new Date(scope.row.recordDate).getTime() | getdatefromtimestamp(true)}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="store.name" label="所属门店" align="center"></el-table-column>
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
						<el-button type="success" size="mini" @click="view(scope.row.healthRecordId)">查看</el-button>
						<el-button type="primary" size="mini" @click="edit(scope.row.healthRecordId)">编辑</el-button>
						<el-button type="danger" size="mini" @click="del(scope.row.healthRecordId)">删除</el-button>
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
import { deleteConfirm } from '../../../common/utils'
import HealthRecord from '../../../api/HealthRecord'
import SysDict from '../../../api/SysDict'
import SysStore from '../../../api/SysStore'
export default {
	data() {
		return {
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			selectedList: [],
			find: {
				keyword: '',
				typeId: '',
				storeId: '',
				startTime: '',
				endTime: ''
			},
			list: [],
			rangeDate: [],
			types: [],
			stores: []
		}
	},
	computed: {
		...mapGetters(['storeId'])
	},
	components: { Page },
	created() {
		this.find.storeId = (this.storeId != null && this.storeId != 'null') ? this.storeId : ''
		this.getList()
		this.getTypes()
		this.getStores()
	},
	methods: {
		selectDateRange(date) {
			this.find.startTime = date[0]
			this.find.endTime = date[1]
		},
		selectionChange(data) {
			this.selectedList = data.map(item => item.healthRecordId)
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
			this.find.typeId = ''
			this.find.storeId = (this.storeId != null && this.storeId != 'null') ? this.storeId : ''
			this.find.startTime = ''
			this.find.endTime = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.rangeDate = []
			this.getList()
		},
		getList() {
			HealthRecord.find({
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				keyword: this.find.keyword,
				typeId: this.find.typeId,
				startTime: this.find.startTime,
				endTime: this.find.endTime,
				storeId: this.find.storeId
			}).then(res => {
				this.list = res.rows
				this.count = res.count
			})
		},
		getTypes() {
			SysDict.findListByType({ type: 'recordType' }).then(res => {
				this.types = res
			})
		},
		add() {
			this.$router.push({name: 'addhealthrecord'})
		},
		view(healthRecordId) {
			this.$router.push({name: 'viewhealthrecord', query: { healthRecordId } })
		},
		edit(healthRecordId) {
			this.$router.push({name: 'edithealthrecord', query: { healthRecordId } })
		},
		del(healthRecordId) {
			deleteConfirm(healthRecordId, ids => {
				HealthRecord.del({ ids }).then(res => {
					Message.success('成功！')
					this.getList()
				})
			}, this.selectedList)
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
