<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">查看会员课程</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="会员">
							<p>{{memLesson.member.name}}</p>
						</el-form-item>
						<el-form-item label="课程名称">
							<p>{{memLesson.lessonSet.name}}</p>
						</el-form-item>
						<el-form-item label="课程类型">
							<p>{{memLesson.lessonSet.type.value}}</p>
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
import Lesson from '../../../api/Lesson'
export default {
	data() {
		return {
			memLesson: {
				memberName: '',
				lessonName: '',
				lessonType: '',
				num: '',
				totalNum: ''
			}
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		getInfo() {
			const lessonId = this.$route.query.lessonId
			Lesson.findById({ lessonId }).then(res => {
				this.memLesson = res
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
