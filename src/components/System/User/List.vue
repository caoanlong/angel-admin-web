<template>
    <div class="main-content">
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="关键字">
					<el-input placeholder="姓名/手机号" v-model="find.keyword"></el-input>
				</el-form-item>
                <el-form-item label="角色类型">
                    <el-select placeholder="请选择" v-model="find.roleType" >
                        <el-option 
                            v-for="role in roles" 
                            :label="role.name" 
                            :value="role.roleId" 
                            :key="role.roleId">
                        </el-option>
                    </el-select>
                </el-form-item>
				<el-form-item label="状态">
					<el-select placeholder="请选择" v-model="find.status" >
						<el-option label="正常" :value="false"></el-option>
						<el-option label="禁用" :value="true"></el-option>
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
                @selection-change="selectionChange" 
                border style="width: 100%" 
                size="mini" stripe>
				<el-table-column label="id" type="selection" align="center" width="40" :selectable="row => row.userId != '1'"></el-table-column>
				<el-table-column prop="name" label="姓名"></el-table-column>
				<el-table-column prop="mobile" label="电话" align="center" width="100"></el-table-column>
                <el-table-column prop="role.name" label="角色" align="center"></el-table-column>
				<el-table-column prop="store.name" label="所属门店" align="center"></el-table-column>
				<el-table-column prop="isDisabled" label="状态" align="center" width="60">
					<template slot-scope="scope">
						<el-tag size="mini" type="info" v-if="scope.row.isDisabled">禁用</el-tag>
						<el-tag size="mini" type="success" v-else>正常</el-tag>
					</template>
				</el-table-column>
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
					<template slot-scope="scope" v-if="scope.row.userId != '1'">
						<el-button type="success" size="mini" @click="view(scope.row.userId)">查看</el-button>
						<el-button type="primary" size="mini" @click="edit(scope.row.userId)">编辑</el-button>
						<el-button type="danger" size="mini" @click="del(scope.row.userId)">删除</el-button>
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
import SysUser from '../../../api/SysUser'
import SysRole from '../../../api/SysRole'
export default {
    data() {
        return {
            pageIndex: 1,
            pageSize: 10,
            count: 0,
            selectedList: [],
            find: {
                keyword: '',
                roleType: '',
                status: '',
                startTime: '',
                endTime: ''
            },
            list: [],
            roles: [],
            createRangeDate: []
        }
    },
    components: { Page },
    created() {
        this.getList()
        this.getRoles()
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
            this.find.keyword = ''
            this.find.roleType = ''
            this.find.status = ''
            this.find.startTime = ''
            this.find.endTime = ''
            this.createRangeDate = []
            this.getList()
        },
        getList() {
            SysUser.find({
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                keyword: this.find.keyword,
                roleId: this.find.roleType,
                isDisabled: this.find.status,
                startTime: this.find.startTime,
                endTime: this.find.endTime,
            }).then(res => {
                this.list = res.rows
                this.count = res.count
            })
        },
        getRoles() {
            SysRole.find({
                pageSize: 1000
            }).then(res => {
				this.roles = res.rows
            })
        },
        add() {
            this.$router.push({name: 'adduser'})
        },
        view(userId) {
            this.$router.push({name: 'viewuser', query: { userId }})
        },
        edit(userId) {
            this.$router.push({name: 'edituser', query: { userId }})
        },
        del(userId) {
            deleteConfirm(userId, ids => {
				SysUser.del({ ids }).then(res => {
                    Message.success('成功！')
                    this.getList()
				})
			}, this.selectedList)
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
