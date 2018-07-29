<template>
	<div class="main-content">
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="关键字">
					<el-input placeholder="用户名/手机号" v-model="find.keywords"></el-input>
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
		<div class="tableControl">
			<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
			<el-button type="default" size="mini" icon="el-icon-delete" @click="del">批量删除</el-button>
		</div>
		<div class="F-table">
			<el-table 
				:data="list" 
				border style="width: 100%" 
				size="mini" stripe>
				<el-table-column prop="name" label="学员名" align="center"></el-table-column>
				<el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
				<el-table-column prop="parentName" label="家长姓名" align="center"></el-table-column>
				<el-table-column prop="parentMobile" label="家长电话" align="center"></el-table-column>
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
				<el-table-column width="220" align="center" fixed="right">
					<template slot-scope="scope">
						<el-button type="success" size="mini" @click="view(scope.row.memberId)">查看</el-button>
						<el-button type="primary" size="mini" @click="edit(scope.row.memberId)">编辑</el-button>
						<el-button type="danger" size="mini" @click="del(scope.row.memberId)">删除</el-button>
						<el-button type="info" size="mini" @click="disable(scope.row.memberId, true)" v-if="!scope.row.isDisabled">禁用</el-button>
						<el-button type="warning" size="mini" @click="disable(scope.row.memberId, false)" v-else>启用</el-button>
						<!-- <el-button type="primary" size="mini" @click="sendReport(scope.row.memberId, scope.row.name)">发送报告</el-button>
						<el-button type="primary" size="mini" @click="sendPhoto(scope.row.memberId, scope.row.name)">发送剪影</el-button>
						<el-button type="primary" size="mini" @click="teacherAdvice(scope.row.memberId, scope.row.name)">老师建议</el-button> -->
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
import Member from '../../../api/Member'
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
			Member.find({
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
		
		add() {
			this.$router.push({name: 'addmember'})
		},
		view(memberId) {
			this.$router.push({name: 'viewmember', query: { memberId }})
		},
		edit(memberId) {
			this.$router.push({name: 'editmember', query: { memberId } })
		},
		del(memberId) {
			deleteConfirm(memberId, ids => {
				Member.del({ ids }).then(res => {
					Message.success('成功！')
					this.getList()
				})
			}, this.selectedList)
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
		getStores() {
			SysStore.find({
				pageSize: 1000
			}).then(res => {
				this.stores = res.rows
			})
		},
		sendReport(memberId, name) {
			this.$router.push({name: 'addhealthrecord', query: { memberId, name }})
		},
		sendPhoto(memberId, name) {
			this.$router.push({name: 'addlessonphoto', query: { memberId, name }})
		},
		teacherAdvice(memberId, name) {
			this.$router.push({name: 'addteacheradvice', query: { memberId, name }})
		}
	}
}
</script>

<style lang="stylus" scoped>

</style>
