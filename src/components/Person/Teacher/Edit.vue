<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">编辑老师</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="头像">
							<ImageUpload :files="[teacher.avatar]" @imgUrlBack="handleAvatarSuccess" :fixed="true" :isUseCropper="true"/>
						</el-form-item>
						<el-form-item label="姓名">
							<el-input v-model="teacher.name"></el-input>
						</el-form-item>
						<el-form-item label="手机号">
							<el-input v-model="teacher.mobile"></el-input>
						</el-form-item>
						<el-form-item label="年龄">
							<el-input v-model="teacher.age"></el-input>
						</el-form-item>
						<el-form-item label="性别">
							<el-select style="width:100%" v-model="teacher.sex">
								<el-option label="男" value="male"></el-option>
								<el-option label="女" value="female"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="所属门店">
							<el-select style="width: 100%" v-model="teacher.storeId" placeholder="请选择" :disabled="storeId != null && storeId != 'null'">
								<el-option v-for="store in stores" :key="store.storeId" :label="store.name" :value="store.storeId"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="简介">
							<el-input type="textarea" v-model="teacher.remark"></el-input>
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
import Person from '../../../api/Person'
import SysStore from '../../../api/SysStore'
export default {
	data() {
		return {
			teacher: {
				avatar: '',
				name: '',
				mobile: '',
				age: '',
				sex: '',
				storeId: '',
				remark: ''
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
		getInfo() {
			const personId = this.$route.query.personId
			Person.findById({ personId }).then(res => {
				this.teacher = res
			})
		},
		save() {
			Person.update(this.teacher).then(res => {
				Message.success(res.data.msg)
				this.$router.push({name: 'teacher'})
			})
		},
		handleAvatarSuccess(res) {
			this.teacher.avatar = res[0]
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
