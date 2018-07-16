<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">查看会员</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="头像">
							<ImageUpload :files="[member.avatar]" :isPreview="true"/>
						</el-form-item>
						<el-form-item label="用户名">
							<p>{{member.name}}</p>
						</el-form-item>
						<el-form-item label="手机号">
							<p>{{member.mobile}}</p>
						</el-form-item>
						<el-form-item label="性别">
							<p>{{member.sex == 'male' ? '男' : '女'}}</p>
						</el-form-item>
						<el-form-item label="年龄">
							<p>{{member.age}}</p>
						</el-form-item>
						<el-form-item label="简介">
							<p>{{member.remark}}</p>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="sendReport(member.memberId)">发送报告</el-button>
							<el-button type="primary" @click="sendPhoto(member.memberId)">发送剪影</el-button>
							<el-button type="primary" @click="teacherAdvice(member.memberId)">老师建议</el-button>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
	</div>
</template>

<script>
import Member from '../../../api/Member'
export default {
	data() {
		return {
			member: {
				avatar: '',
				name: '',
				mobile: '',
				sex: '',
				age: '',
				remark: ''
			}
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		getInfo() {
			const memberId = this.$route.query.memberId
			Member.findById({ memberId }).then(res => {
				this.member = res
			})
		},
		sendReport(memberId) {
			this.$router.push({name: 'addhealthrecord', query: { memberId }})
		},
		sendPhoto(memberId) {
			this.$router.push({name: 'addlessonphoto', query: { memberId }})
		},
		teacherAdvice(memberId) {
			this.$router.push({name: 'addteacheradvice', query: { memberId }})
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
