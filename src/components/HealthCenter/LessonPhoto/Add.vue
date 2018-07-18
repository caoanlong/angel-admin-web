<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">添加课间剪影</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="标题">
							<el-input v-model="lessonPhoto.title"></el-input>
						</el-form-item>
						<el-form-item label="学生">
							<el-autocomplete style="width:100%"
								value-key="name" 
								v-model="lessonPhoto.memberName"
								:fetch-suggestions="getMembers"
								placeholder="请输入内容"
								@select="handSelectMember">
							</el-autocomplete>
						</el-form-item>
						<el-form-item label="图片">
							<ImageUpload :files="lessonPhoto.photos" :limitNum="10" @imgUrlBack="handleImageSuccess" :fixed="true" />
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
import LessonPhoto from '../../../api/LessonPhoto'
import Member from '../../../api/Member'
export default {
	data() {
		return {
			lessonPhoto: {
				title: '',
				memberId: '',
				memberName: '',
				photos: []
			}
		}
	},
	components: { ImageUpload },
	created() {
		if (this.$route.query.name) this.lessonPhoto.memberName = this.$route.query.name
	},
	methods: {
		getMembers(queryString, cb) {
			Member.suggest({
				keyword: queryString
			}).then(res => { cb(res) })
		},
		handSelectMember(data) {
			this.lessonPhoto.memberId = data.memberId
			this.lessonPhoto.memberName = data.name
		},
		save() {
			const data = Object.assign({}, this.lessonPhoto)
			data.photos = this.lessonPhoto.photos.join(',')
			LessonPhoto.add(data).then(res => {
				Message.success('成功！')
				this.$router.push({name: 'lessonphoto'})
			})
		},
		handleImageSuccess(res) {
			this.lessonPhoto.photos = res
		},
		back() {
			this.$router.go(-1)
		}
	}
}
</script>

<style lang="stylus" scoped>

</style>
