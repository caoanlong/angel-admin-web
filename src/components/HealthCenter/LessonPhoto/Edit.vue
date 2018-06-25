<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">编辑课间剪影</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="10" :offset="6">
						<el-form-item label="标题">
							<el-input v-model="lessonPhoto.title"></el-input>
						</el-form-item>
						<el-form-item label="图片">
							<ImageUpload :files="lessonPhoto.image" :limit="10" @imgUrlBack="handleImageSuccess" :fixed="true" />
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="save">保存</el-button>
							<el-button @click="back">取消</el-button>
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
			lessonPhoto: {
				title: '正姿中心摄影',
				image: ['#', '#', '#']
			}
		}
	},
	components: { ImageUpload },
	methods: {
		save() {
			Message.success('成功！')
			this.$router.push({name: 'lessonphoto'})
		},
		handleImageSuccess(res) {
			this.lessonPhoto.image = res
		},
		back() {
			this.$router.go(-1)
		}
	}
}
</script>

<style lang="stylus" scoped>

</style>
