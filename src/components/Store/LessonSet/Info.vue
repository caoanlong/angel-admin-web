<template>
    <div class="main-content">
		<el-card class="box-card">
			<div slot="header">查看课程</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="10" :offset="6">
                        <el-form-item label="图片">
							<ImageUpload :files="[lesson.image]" :isPreview="true"/>
						</el-form-item>
						<el-form-item label="名称">
							<p>{{lesson.name}}</p>
						</el-form-item>
                        <el-form-item label="类型">
							<p>{{lesson.type}}</p>
						</el-form-item>
                        <el-form-item label="价格">
							<p>{{lesson.price}}</p>
						</el-form-item>
						<el-form-item label="使用有效期">
							<p>{{lesson.expiryDate}}</p>
						</el-form-item>
                        <el-form-item label="详情">
							<p>{{lesson.detail}}</p>
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
export default {
    data() {
		return {
			lesson: {
                image: '#',
                name: '正姿舞蹈',
                type: '48节课半年卡',
                price: 278,
                expiryDate: '6个月',
                detail: '教授正姿舞蹈教授正姿舞蹈教授正姿舞蹈教授正姿舞蹈教授正姿舞蹈教授正姿舞蹈'
            }
		}
    },
    components: { ImageUpload },
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
