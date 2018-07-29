<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">查看课间剪影</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="标题">
							<p>{{lessonPhoto.title}}</p>
						</el-form-item>
						<el-form-item label="学生">
							<p>{{lessonPhoto.memberName}}</p>
						</el-form-item>
						<el-form-item label="所属门店">
							<p>{{lessonPhoto.store.name}}</p>
						</el-form-item>
						<el-form-item label="图片">
							<ImageUpload :files="lessonPhoto.photos" :isPreview="true"/>
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
import ImageUpload from '../../CommonComponents/ImageUpload'
import LessonPhoto from '../../../api/LessonPhoto'
export default {
	data() {
		return {
			lessonPhoto: {
				title: '',
				memberId: '',
				memberName: '',
				store: '',
				photos: []
			}
		}
	},
	components: { ImageUpload },
	created() {
		this.getInfo()
	},
	methods: {
		getInfo() {
			const lessonPhotoId = this.$route.query.lessonPhotoId
			LessonPhoto.findById({ lessonPhotoId }).then(res => {
				this.lessonPhoto = res
				this.lessonPhoto.memberName = res.member.name
				this.lessonPhoto.photos = res.photos.split(',')
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
