<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">查看会员</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="用户名">
							<p>{{member.name}}</p>
						</el-form-item>
						<el-form-item label="手机号">
							<p>{{member.mobile}}</p>
						</el-form-item>
						<el-form-item label="openid">
							<p>{{member.openid}}</p>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="sendReport(member.name)">发送报告</el-button>
							<el-button type="primary" @click="sendPhoto(member.name)">发送剪影</el-button>
							<el-button type="primary" @click="teacherAdvice(member.name)">老师建议</el-button>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			member: {
				name: '王五',
				mobile: '15036366969',
				openid: 'wxlljffkjflhklkhlkh'
			}
		}
	},
	methods: {
		sendReport(name) {
			this.$router.push({name: 'addhealthrecord', query: { name }})
		},
		sendPhoto(name) {
			this.$router.push({name: 'addlessonphoto', query: { name }})
		},
		teacherAdvice(name) {
			this.$router.push({name: 'addteacheradvice', query: { name }})
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
