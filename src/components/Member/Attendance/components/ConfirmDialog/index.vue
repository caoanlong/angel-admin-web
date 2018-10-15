<template>
    <div>
        <el-dialog 
            width="70%"
            title="选择课程" 
            :visible="isVisible" 
            :show-close="false" 
            :close-on-click-modal="false">
            <table class="dialog-table">
                <thead>
                    <tr>
                        <th width="60">选择</th>
                        <th>会员</th>
                        <th>课程名称</th>
                        <th>课程类型</th>
                        <th>已上课时</th>
                        <th>总课时</th>
                        <th>有效期至</th>
                        <th>所属门店</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in list" :key="item.lessonId">
                        <td class="wf-check">
                            <span 
                                class="checkbox" 
                                :class="selected.lessonId == item.lessonId ? 'selected' : ''"
                                @click="handSelect(item)">
                            </span>
                        </td>
                        <td align="center">{{item.member.name}}</td>
                        <td align="center">{{item.product.name}}</td>
                        <td align="center">{{item.product.label.value}}</td>
                        <td align="center">{{item.num}}</td>
                        <td align="center">{{item.totalNum}}</td>
                        <td align="center">{{new Date(item.validityDate).getTime() | getdatefromtimestamp(true)}}</td>
                        <td align="center">{{item.store.name}}</td>
                    </tr>
                </tbody>
            </table>
			<Page :total="count" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close(false)">取消</el-button>
                <el-button type="primary" @click="close(true)">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { Message } from 'element-ui'
import Page from '../../../../CommonComponents/Page'
import Lesson from '../../../../../api/Lesson'
import Attendance from '../../../../../api/Attendance'
export default {
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
		callback: Function,
		attendanceId: String,
		memberId: String | Number
	},
    data() {
        return {
            pageIndex: 1,
			pageSize: 10,
			count: 0,
			find: {
				keywords: '',
				storeId: '',
				startTime: '',
				endTime: ''
			},
            list: [],
            selected: {}
        }
    },
    watch: {
        isVisible(bool) {
            bool && this.getList()
        }
    },
    components: { Page },
    methods: {
        pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		pageSizeChange(size) {
			this.pageSize = size
			this.getList()
		},
		getList() {
			Lesson.find({
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				memberId: this.memberId,
			}).then(res => {
				this.list = res.rows
				this.count = res.count
			})
        },
        handSelect(data) {
            this.selected = data
        },
        close(bool) {
            if (bool) {
                Attendance.confirm({
                    attendanceId: this.attendanceId,
                    lessonId: this.selected.lessonId
                }).then(res => {
                    Message.success(res.data.msg)
                })
            }
            this.callback(bool)
        }
    }
}
</script>

<style lang="stylus" scoped>
.wf-check
    position relative
    text-align center
    .checkbox
        display block
        width 14px
        height 14px
        margin 0 auto
        background url("../../../../../assets/imgs/checkbox.png") no-repeat 0 0
        cursor pointer
        &:hover
            background-position -14px 0
        &.selected
            background-position -28px 0
.dialog-table
    font-size 12px
    background #dcdfe6
    border-spacing 1px
    width 100%
    th
        background #f2f2f2
        color #666
        padding 10px 15px
    td
        padding 10px 15px
        background #fff
    .add-btn,.del-btn
        color #409EFF
        cursor pointer
</style>
