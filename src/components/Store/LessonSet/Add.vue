<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">添加课程</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="10" :offset="6">
						<el-form-item label="图片">
							<ImageUpload :files="[lesson.image]" @imgUrlBack="handleImageSuccess" :fixed="true" />
						</el-form-item>
						<el-form-item label="名称">
							<el-input v-model="lesson.name"></el-input>
						</el-form-item>
						<el-form-item label="类型">
							<el-input v-model="lesson.type"></el-input>
						</el-form-item>
						<el-form-item label="价格">
							<el-input v-model="lesson.price"></el-input>
						</el-form-item>
						<el-form-item label="使用有效期">
							<el-select style="width:100%" placeholder="请选择" v-model="lesson.expiryDate">
								<el-option label="1个月" :value="1"></el-option>
								<el-option label="6个月" :value="6"></el-option>
								<el-option label="12个月" :value="12"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="详情">
							<el-input type="textarea" v-model="lesson.detail"></el-input>
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
			lesson: {
				image: '',
				name: '',
				type: '',
				price: '',
				expiryDate: '',
				detail: ''
			}
		}
	},
	components: { ImageUpload },
	methods: {
		save() {
			Message.success('成功！')
			this.$router.push({name: 'lessonset'})
		},
		handleImageSuccess(res) {
			this.lesson.image = res[0]
		},
		back() {
			this.$router.go(-1)
		}
	}
}
</script>

<style lang="stylus" scoped>

</style>
