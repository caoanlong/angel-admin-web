<template>
    <div class="main-content">
		<el-card class="box-card">
			<div slot="header">编辑用户</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="10" :offset="6">
						<el-form-item label="头像">
							<ImageUpload :files="[user.avatar]" @imgUrlBack="handleAvatarSuccess" :fixed="true" />
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
							<el-switch v-model="user.is_disabled"></el-switch>
						</el-form-item>
						<el-form-item label="角色权限">
							<el-select style="width: 100%" v-model="user.role_id" placeholder="请选择">
								<el-option label="管理员" value="1"></el-option>
								<el-option label="运营人员" value="2"></el-option>
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
export default {
    data() {
		return {
			user: {
				name: '张三',
				mobile: '15026263535',
				password: '',
				is_disabled: true,
				role_id: '1',
				avatar: '#'
			},
			roles: []
		}
    },
    components: { ImageUpload },
    methods: {
        save() {
            this.$router.push({name: 'user'})
        },
        handleAvatarSuccess(res) {
			this.user.avatar = res[0]
        },
        back() {
			this.$router.go(-1)
		}
    }
}
</script>

<style lang="stylus" scoped>

</style>
