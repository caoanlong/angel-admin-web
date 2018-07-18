<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">查看天使留言</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="12" :offset="5">
                        <el-form-item label="会员">
                            <p>{{remark.memberName}}</p>
						</el-form-item>
                        <el-form-item label="老师">
                            <p>{{remark.personName}}</p>
						</el-form-item>
                        <el-form-item label="建议">
                            <p>{{remark.remark}}</p>
						</el-form-item>
						<el-form-item>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
	</div>
</template>

<script>
import { Message } from 'element-ui'
import AngelRemark from '../../../api/AngelRemark'
export default {
	data() {
		return {
			angelRemark: {
				memberId: '',
                memberName: '',
                personId: '',
                personName: '',
                remark: ''
			}
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		getInfo() {
			const angelRemarkId = this.$route.query.angelRemarkId
			AngelRemark.findById({ angelRemarkId }).then(res => {
				this.angelRemark = res
				this.angelRemark.memberName = res.member.name
				this.angelRemark.personName = res.person.name
			})
		},
		back() {
			this.$router.go(-1)
		}
	}
}
</script>

<style lang="stylus" scoped>
.el-form-item__content
	p
		margin 0
		border 1px solid #fff
		border-bottom-color #dcdfe6
		padding 0 15px
		min-height 40px
		font-family 'sans-serif'
		line-height 40px
		color #999
	.el-input__inner
		vertical-align top
</style>
