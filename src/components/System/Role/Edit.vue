<template>
    <div class="main-content">
		<el-card class="box-card">
			<div slot="header">编辑角色</div>
			<el-form label-width="120px" :model="role" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="角色名称" prop="name">
							<el-input v-model="role.name"></el-input>
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
import SysRole from '../../../api/SysRole'
export default {
    data() {
		return {
			role: { name: '' },
			rules: {
				name: [
					{ required: true, message: '请输入名称' },
					{ min: 1, max: 50, message: '长度在1到50之间' }
				]
			}
		}
	},
	created() {
		this.getInfo()
	},
    methods: {
		getInfo() {
			const roleId = this.$route.query.roleId
			SysRole.findById({ roleId }).then(res => {
				this.role = res
			})
		},
        save() {
			const roleId = this.$route.query.roleId
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				SysRole.update(this.role).then(res => {
					Message.success(res.data.msg)
					this.$router.push({name: 'role'})
				})
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
