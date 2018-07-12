<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">查看课程</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="18" :offset="2">
						<el-form-item label="名称">
							<p>{{lesson.name}}</p>
						</el-form-item>
						<el-form-item label="类型">
							<p>{{lesson.type.value}}</p>
						</el-form-item>
						<el-form-item label="使用有效期">
							<p>{{lesson.validDate.value}}</p>
						</el-form-item>
						<el-form-item label="价格">
							<p>{{lesson.price}}</p>
						</el-form-item>
						<el-form-item label="课时数">
							<p>{{lesson.num}}</p>
						</el-form-item>
						<el-form-item label="图片">
							<ImageUpload :files="[lesson.image]" :isPreview="true"/>
						</el-form-item>
						<el-form-item label="详情">
							<p v-html="lesson.remark"></p>
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
import ImageUpload from '../../CommonComponents/ImageUpload'
import LessonSet from '../../../api/LessonSet'
export default {
	data() {
		return {
			lesson: {
				image: '',
				name: '',
				typeId: '',
				price: '',
				num: '',
				validityDate: '',
				remark: ''
			}
		}
	},
	components: { ImageUpload },
	created() {
		this.getInfo()
	},
	methods: {
		getInfo() {
			const lessonSetId = this.$route.query.lessonSetId
			LessonSet.findById({ lessonSetId }).then(res => {
				this.lesson = res
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
