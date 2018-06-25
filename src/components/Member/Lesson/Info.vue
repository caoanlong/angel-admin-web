<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">查看会员课程</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="10" :offset="6">
						<el-form-item label="会员">
							<p>{{memLesson.memberName}}</p>
						</el-form-item>
						<el-form-item label="课程名称">
							<p>{{memLesson.lessonName}}</p>
						</el-form-item>
						<el-form-item label="课程类型">
							<p>{{memLesson.lessonType}}</p>
						</el-form-item>
						<el-form-item label="已上课时">
							<p>{{memLesson.num}}</p>
						</el-form-item>
						<el-form-item label="总课时">
							<p>{{memLesson.totalNum}}</p>
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
			memLesson: {
				memberName: '王五',
				lessonName: '正姿舞蹈',
				lessonType: '48节课半年卡',
				num: 12,
				totalNum: 48
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
