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
								v-model="lessonPhoto.memberName"
								:fetch-suggestions="getMembers"
								placeholder="请输入内容"
								@select="handSelectMember">
							</el-autocomplete>
						</el-form-item>
						<el-form-item label="所属门店">
							<el-select style="width: 100%" v-model="lessonPhoto.storeId" placeholder="请选择" :disabled="storeId != null && storeId != 'null'">
								<el-option v-for="store in stores" :key="store.storeId" :label="store.name" :value="store.storeId"></el-option>
							</el-select>
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
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import ImageUpload from '../../CommonComponents/ImageUpload'
import LessonPhoto from '../../../api/LessonPhoto'
import Member from '../../../api/Member'
import SysStore from '../../../api/SysStore'
export default {
	data() {
		return {
			lessonPhoto: {
				title: '',
				memberId: '',
				memberName: '',
				storeId: '',
				photos: []
			},
			stores: []
		}
	},
	computed: {
		...mapGetters(['storeId'])
	},
	components: { ImageUpload },
	created() {
		this.getStores()
	},
	methods: {
		getMembers(queryString, cb) {
			Member.suggest({
				keyword: queryString
			}).then(res => { cb(res) })
		},
		getInfo() {
			const lessonPhotoId = this.$route.query.lessonPhotoId
			LessonPhoto.findById({ lessonPhotoId }).then(res => {
				this.lessonPhoto = res
				this.lessonPhoto.memberName = res.member.name
				this.lessonPhoto.photos = res.photos.split(',')
			})
		},
		handSelectMember(data) {
			this.lessonPhoto.memberId = data.memberId
			this.lessonPhoto.memberName = data.name
		},
		save() {
			const data = Object.assign({}, this.lessonPhoto)
			data.photos = this.lessonPhoto.photos.join(',')
			LessonPhoto.update(data).then(res => {
				Message.success('成功！')
				this.$router.push({name: 'lessonphoto'})
			})
		},
		handleImageSuccess(res) {
			this.lessonPhoto.photos = res
		},
		getStores() {
			SysStore.find({
				pageSize: 1000
			}).then(res => {
				this.stores = res.rows
				this.getInfo()
			})
		},
		back() {
			this.$router.go(-1)
		}
	}
}
</script>

<style lang="stylus" scoped>

</style>
