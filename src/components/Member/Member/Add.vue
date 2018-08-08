<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">添加会员</div>
			<el-form label-width="120px" :model="member" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="头像">
							<ImageUpload :files="[member.avatar]" @imgUrlBack="handleAvatarSuccess" :fixed="true" :isUseCropper="true"/>
						</el-form-item>
						<el-form-item label="姓名" prop="name">
							<el-input v-model="member.name"></el-input>
						</el-form-item>
						<el-form-item label="手机号" prop="mobile">
							<el-input v-model="member.mobile"></el-input>
						</el-form-item>
						<el-form-item label="年龄" prop="age">
							<el-input v-model="member.age"></el-input>
						</el-form-item>
						<el-form-item label="性别" prop="sex">
							<el-select style="width:100%" v-model="member.sex">
								<el-option label="男" value="男"></el-option>
								<el-option label="女" value="女"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="编码" prop="code">
							<el-input v-model="member.code"></el-input>
						</el-form-item>
						<el-form-item label="家长姓名" prop="parentName">
							<el-input v-model="member.parentName"></el-input>
						</el-form-item>
						<el-form-item label="家长手机" prop="parentMobile">
							<el-input v-model="member.parentMobile"></el-input>
						</el-form-item>
						<el-form-item label="所属门店" prop="storeId">
							<el-select style="width: 100%" v-model="member.storeId" placeholder="请选择" :disabled="storeId != null && storeId != 'null'">
								<el-option v-for="store in stores" :key="store.storeId" :label="store.name" :value="store.storeId"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="来源" prop="from">
							<el-input v-model="member.from"></el-input>
						</el-form-item>
						<el-form-item label="简介" prop="remark">
							<el-input type="textarea" v-model="member.remark"></el-input>
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
import Member from '../../../api/Member'
import SysStore from '../../../api/SysStore'
import { checkAge, checkMobile } from '../../../common/validator'
export default {
	data() {
		return {
			member: {
				avatar: '',
				name: '',
				mobile: '',
				age: '',
				sex: '',
				code: '',
				storeId: '',
				parentName: '',
				parentMobile: '',
				from: '',
				remark: ''
			},
			stores: [],
			rules: {
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
				code: [ { min: 1, max: 20, message: '长度在1到20之间' }],
				parentName: [ { min: 1, max: 20, message: '长度在1到20之间' }],
				parentMobile: [ { validator: checkMobile } ],
				storeId: [{ required: true, message: '请选择门店' }],
				from: [ { min: 1, max: 20, message: '长度在1到20之间' }],
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
		this.member.storeId = (this.storeId != null && this.storeId != 'null') ? Number(this.storeId) : ''
	},
	methods: {
		save() {
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				Member.add(this.member).then(res => {
					Message.success(res.data.msg)
					this.$router.push({name: 'member'})
				})
			})
		},
		handleAvatarSuccess(res) {
			this.member.avatar = res[0]
		},
		getStores() {
			SysStore.find({
				pageSize: 1000
			}).then(res => {
				this.stores = res.rows
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
