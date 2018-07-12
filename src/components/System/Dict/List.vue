<template>
    <div class="main-content">
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="描述">
					<el-input placeholder="描述" v-model="find.description"></el-input>
				</el-form-item>
                <el-form-item label="类型">
					<el-select placeholder="请选择" v-model="find.type">
						<el-option 
                            v-for="type in types" 
                            :key="type.type"
                            :label="type.description" 
                            :value="type.type">
                        </el-option>
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
				<el-table-column label="id" type="selection" align="center" width="40"></el-table-column>
				<el-table-column label="键" prop="key"></el-table-column>
				<el-table-column label="值" prop="value"></el-table-column>
				<el-table-column label="类型" prop="type"></el-table-column>
                <el-table-column label="描述" prop="description"></el-table-column>
                <el-table-column label="排序" prop="sort" align="center" width="60"></el-table-column>
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
						<el-button type="success" size="mini" @click="view(scope.row.dictId)">查看</el-button>
						<el-button type="primary" size="mini" @click="edit(scope.row.dictId)">编辑</el-button>
						<el-button type="danger" size="mini" @click="del(scope.row.dictId)">删除</el-button>
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
import SysDict from '../../../api/SysDict'
export default {
    data() {
        return {
            pageIndex: 1,
            pageSize: 10,
            count: 10,
            selectedList: [],
            find: {
                type: '',
                description: '',
                startTime: '',
                endTime: ''
            },
            list: [],
            types: [],
            createRangeDate: []
        }
    },
    components: { Page },
    created() {
        this.getList()
        this.getTypes()
    },
    methods: {
        selectDateRange(date) {
            this.find.startTime = date[0]
            this.find.endTime = date[1]
        },
        selectionChange(data) {
            this.selectedList = data.map(item => item.dictId)
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
            this.find.type = ''
            this.find.description = ''
			this.find.startTime = ''
            this.find.endTime = ''
            this.pageIndex = 1
			this.pageSize = 10
			this.createRangeDate = []
			this.getList()
        },
        getList() {
            SysDict.find({
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				type: this.find.type,
				description: this.find.description,
				startTime: this.find.startTime,
				endTime: this.find.endTime
			}).then(res => {
				this.list = res.rows
				this.count = res.count
			})
        },
        getTypes() {
            SysDict.findTypeList().then(res => {
                this.types = res
            })
        },
        add() {
            this.$router.push({name: 'adddict'})
        },
        view(dictId) {
            this.$router.push({name: 'viewdict', query: { dictId } })
        },
        edit(dictId) {
            this.$router.push({name: 'editdict', query: { dictId } })
        },
        del(dictId) {
            deleteConfirm(dictId, ids => {
				SysDict.del({ ids }).then(res => {
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
