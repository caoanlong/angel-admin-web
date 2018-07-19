<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">添加用户</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="头像">
							<ImageUpload :files="[user.avatar]" @imgUrlBack="handleAvatarSuccess" :fixed="true" :isUseCropper="true"/>
						</el-form-item>
						<el-form-item label="姓名">
							<el-input v-model="user.name"></el-input>
						</el-form-item>
						<el-form-item label="手机号码">
							<el-input v-model="user.mobile"></el-input>
						</el-form-item>
						<el-form-item label="密码">
							<el-input v-model="user.password"></el-input>
						</el-form-item>
						<el-form-item label="是否禁用">
							<el-switch v-model="user.isDisabled"></el-switch>
						</el-form-item>
						<el-form-item label="所属门店">
							<el-select style="width: 100%" v-model="user.storeId" placeholder="请选择">
								<el-option v-for="store in stores" :key="store.storeId" :label="store.name" :value="store.storeId"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="角色权限">
							<el-select style="width: 100%" v-model="user.roleId" placeholder="请选择">
								<el-option v-for="role in roles" :key="role.roleId" :label="role.name" :value="role.roleId" :disabled="role.roleId == '1'"></el-option>
							</el-select>
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
import SysUser from '../../../api/SysUser'
import SysRole from '../../../api/SysRole'
import SysStore from '../../../api/SysStore'
export default {
	data() {
		return {
			user: {
				name: '',
				mobile: '',
				password: '',
				isDisabled: false,
				roleId: '',
				storeId: '',
				avatar: ''
			},
			roles: [],
			stores: []
		}
	},
	components: { ImageUpload },
	created() {
		this.getRoles()
		this.getStores()
	},
	methods: {
		save() {
			SysUser.add(this.user).then(res => {
				Message.success(res.data.msg)
				this.$router.push({name: 'user'})
			})
		},
		handleAvatarSuccess(res) {
			this.user.avatar = res[0]
		},
		getRoles() {
			SysRole.find({
				pageSize: 1000
			}).then(res => {
				this.roles = res.rows
			})
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
