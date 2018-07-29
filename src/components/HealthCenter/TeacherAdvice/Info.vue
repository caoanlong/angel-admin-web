<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">查看老师建议</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="会员">
							<p>{{advice.memberName}}</p>
						</el-form-item>
						<el-form-item label="老师">
							<p>{{advice.personName}}</p>
						</el-form-item>
						<el-form-item label="所属门店">
							<p>{{advice.store.name}}</p>
						</el-form-item>
						<el-form-item label="建议">
							<p>{{advice.remark}}</p>
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
import TeacherAdvice from '../../../api/TeacherAdvice'
export default {
	data() {
		return {
			advice: {
				memberId: '',
				memberName: '',
				personId: '',
				personName: '',
				store: {},
				remark: ''
			}
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		getInfo() {
			const teacherAdviceId = this.$route.query.teacherAdviceId
			TeacherAdvice.findById({ teacherAdviceId }).then(res => {
				this.advice = res
				this.advice.memberName = res.member.name
				this.advice.personName = res.person.name
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
