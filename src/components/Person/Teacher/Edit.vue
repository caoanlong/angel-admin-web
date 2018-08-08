<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">编辑老师</div>
			<el-form label-width="120px" :model="teacher" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="头像" prop="avatar">
							<ImageUpload :files="[teacher.avatar]" @imgUrlBack="handleAvatarSuccess" :fixed="true" :isUseCropper="true"/>
						</el-form-item>
						<el-form-item label="姓名" prop="name">
							<el-input v-model="teacher.name"></el-input>
						</el-form-item>
						<el-form-item label="手机号" prop="mobile">
							<el-input v-model="teacher.mobile"></el-input>
						</el-form-item>
						<el-form-item label="年龄" prop="age">
							<el-input v-model="teacher.age"></el-input>
						</el-form-item>
						<el-form-item label="性别" prop="sex">
							<el-select style="width:100%" v-model="teacher.sex">
								<el-option label="男" value="male"></el-option>
								<el-option label="女" value="female"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="所属门店" prop="storeId">
							<el-select style="width: 100%" v-model="teacher.storeId" placeholder="请选择" :disabled="storeId != null && storeId != 'null'">
								<el-option v-for="store in stores" :key="store.storeId" :label="store.name" :value="store.storeId"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="简介" prop="remark">
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
import { checkAge, checkMobile } from '../../../common/validator'
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
			stores: [],
			rules: {
				avatar: [ { required: true, message: '请选择头像' }],
				name: [
					{ required: true, message: '请输入姓名' },
					{ min: 1, max: 20, message: '长度在1到20之间' }
				],
				mobile: [
					{ required: true, message: '请输入手机号' },
					{ validator: checkMobile }
				],
				age: [
					{ required: true, message: '请输入年龄' },
					{ validator: checkAge }
				],
				sex: [{ required: true, message: '请选择性别' }],
				storeId: [{ required: true, message: '请选择门店' }],
				remark: [ { min: 1, max: 200, message: '长度在1到200之间' }]
			}
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
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				Person.update(this.teacher).then(res => {
					Message.success(res.data.msg)
					this.$router.push({name: 'teacher'})
				})
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
