<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">添加老师建议</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="12" :offset="5">
                        <el-form-item label="会员">
							<el-input v-model="advice.member"></el-input>
						</el-form-item>
                        <el-form-item label="老师">
							<el-input v-model="advice.teacher"></el-input>
						</el-form-item>
                        <el-form-item label="建议">
							<el-input type="textarea" :rows="5" v-model="advice.remark"></el-input>
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
export default {
	data() {
		return {
			advice: {
                member: '',
                teacher: '',
                remark: ''
			}
		}
	},
	methods: {
		save() {
			Message.success('成功！')
			this.$router.push({name: 'teacheradvice'})
		},
		back() {
			this.$router.go(-1)
		}
	}
}
</script>

<style lang="stylus" scoped>

</style>
