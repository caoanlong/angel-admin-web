<template>
	<div class="main-content">
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="名称">
					<el-input placeholder="名称" v-model="find.name"></el-input>
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
				<el-table-column prop="name" label="名称" align="center" width="180"></el-table-column>
				<el-table-column prop="express" label="快递" align="center" width="70">
					<template slot-scope="scope">
						<span>{{scope.row.express == 0 ? '免运费' : scope.row.express}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="price" label="价格" align="center"></el-table-column>
				<el-table-column prop="saleNum" label="月销" align="center"></el-table-column>
				<el-table-column prop="create_user.name" label="创建人" align="center"></el-table-column>
				<el-table-column prop="update_user.name" label="更新人" align="center"></el-table-column>
				<el-table-column prop="create_time" label="创建时间" align="center"  width="140">
					<template slot-scope="scope">
						<span v-if="scope.row.create_time">{{ new Date(scope.row.create_time).getTime() | getdatefromtimestamp()}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="update_time" label="更新时间" align="center" width="140">
					<template slot-scope="scope">
						<span v-if="scope.row.update_time">{{ new Date(scope.row.update_time).getTime() | getdatefromtimestamp()}}</span>
					</template>
				</el-table-column>
				<el-table-column width="180" align="center" fixed="right">
					<template slot-scope="scope">
						<el-button type="success" size="mini" @click="view()">查看</el-button>
						<el-button type="primary" size="mini" @click="edit()">编辑</el-button>
						<el-button type="danger" size="mini" @click="del()">删除</el-button>
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
				name: ''
			},
			list: []
		}
	},
	components: { Page },
	created() {
		this.getList()
	},
	methods: {
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
			this.find.name = ''
		},
		getList() {
			for (let i = 0; i < 10; i++) {
				const item = {
					name: '七彩虹GTX750Ti 2G限量版',
					express: 0,
					saleNum: 56,
					price: 278,
					detail: '游戏发烧友必备游戏发烧友必备游戏发烧友必备游戏发烧友必备游戏发烧友必备',
					create_user: {
						name: '龙哥'
					},
					update_user: {
						name: '龙哥'
					}
				}
				item.id = i
				item.create_time = new Date().getTime() + (i * 1000000)
				item.update_time = new Date().getTime() + (i * 1000000)
				this.list.push(item)
			}
		},
		add() {
			this.$router.push({name: 'addplatformproduct'})
		},
		view() {
			this.$router.push({name: 'viewplatformproduct'})
		},
		edit() {
			this.$router.push({name: 'editplatformproduct'})
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
