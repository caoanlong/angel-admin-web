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
							<p>{{lesson.label && lesson.label.value}}</p>
						</el-form-item>
						<el-form-item label="使用有效期">
							<p>{{lesson.validDate}}</p>
						</el-form-item>
						<el-form-item label="价格">
							<p>{{lesson.price}}</p>
						</el-form-item>
						<el-form-item label="课时数">
							<p>{{lesson.lessonNum}}</p>
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
import Product from '../../../api/Product'
export default {
	data() {
		return {
			lesson: {
				type: 'lessonSet',
                name: '',
                labelId: '',
                image: '',
                lessonNum: '',
                price: '',
                validDate: '',
                remark: ''
			},
		}
	},
	components: { ImageUpload },
	created() {
		this.getInfo()
	},
	methods: {
		getInfo() {
			const productId = this.$route.query.productId
			Product.findById({ productId }).then(res => {
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
