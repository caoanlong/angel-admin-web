<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">查看会员</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="10" :offset="6">
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
