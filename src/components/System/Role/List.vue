<template>
    <div class="main-content">
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="角色名称">
					<el-input placeholder="角色名称" v-model="find.name"></el-input>
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
				<el-table-column prop="name" label="角色名称"></el-table-column>
				<el-table-column prop="createUser.name" label="创建人" align="center"></el-table-column>
				<el-table-column prop="updateUser.name" label="更新人" align="center"></el-table-column>
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
						<el-button type="success" size="mini" @click="view(scope.row.roleId)">查看</el-button>
						<el-button type="primary" size="mini" @click="edit(scope.row.roleId)">编辑</el-button>
						<el-button type="danger" size="mini" @click="del(scope.row.roleId)">删除</el-button>
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
import SysRole from '../../../api/SysRole'
export default {
    data() {
        return {
            pageIndex: 1,
            pageSize: 10,
            count: 0,
            selectedList: [],
            find: {
                name: '',
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
        selectionChange(data) {
            this.selectedList = data.map(item => item.id)
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
            this.getList()
        },
        getList() {
            SysRole.find({
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                name: this.find.name,
                startTime: this.find.startTime,
                endTime: this.find.endTime,
            }).then(res => {
                this.list = res.rows
                this.count = res.count
            })
        },
        add() {
            this.$router.push({name: 'addrole'})
        },
        view(roleId) {
            this.$router.push({name: 'viewrole', query: { roleId }})
        },
        edit(roleId) {
            this.$router.push({name: 'editrole', query: { roleId }})
        },
        del(roleId) {
            deleteConfirm(roleId, ids => {
                Message.success('成功！')
            })
        },
    }
}
</script>

<style lang="stylus" scoped>

</style>
