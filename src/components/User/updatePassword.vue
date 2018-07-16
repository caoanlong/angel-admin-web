<template>
    <div class="main-content">
		<el-card class="box-card">
			<div slot="header">修改密码</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="原密码">
							<el-input v-model="oldPassword"></el-input>
						</el-form-item>
						<el-form-item label="新密码">
							<el-input v-model="newPassword"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="save">保存</el-button>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
	</div>
</template>

<script>
import { Message } from 'element-ui'
import Auth from '../../api/Auth'
export default {
    data() {
		return {
			oldPassword: '',
			newPassword: ''
		}
    },
    methods: {
        save() {
			Auth.updatePassword({
                oldPassword: this.oldPassword,
                newPassword: this.newPassword
            }).then(res => {
				Message.success(res.data.msg)
                localStorage.clear()
                this.$router.push({name: 'login'})
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
