<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">编辑课间剪影</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="标题">
							<el-input v-model="lessonPhoto.title"></el-input>
						</el-form-item>
						<el-form-item label="学生">
							<el-autocomplete style="width:100%"
								value-key="name" 
								v-model="lessonPhoto.studentName"
								:fetch-suggestions="getStudents"
								placeholder="请输入内容"
								@select="handSelectStudent">
							</el-autocomplete>
						</el-form-item>
						<el-form-item label="图片">
							<ImageUpload :files="lessonPhoto.image" :limitNum="10" @imgUrlBack="handleImageSuccess" :fixed="true" />
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
				studentName: '小明',
				image: ['#', '#', '#']
			}
		}
	},
	components: { ImageUpload },
	methods: {
		getStudents(queryString, cb) {
			let list = [
				{ id: 1, name: '小明' },
				{ id: 2, name: '小花' },
				{ id: 3, name: '狗蛋' }
			]
			setTimeout(() => { cb(list) }, 500)
		},
		handSelectStudent(data) {
			this.lessonPhoto.studentId = data.id
			this.lessonPhoto.studentName = data.name
		},
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
