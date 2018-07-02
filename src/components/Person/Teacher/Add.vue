<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">添加老师</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="头像">
							<ImageUpload :files="[teacher.avatar]" @imgUrlBack="handleAvatarSuccess" :fixed="true" />
						</el-form-item>
						<el-form-item label="姓名">
							<el-input v-model="teacher.name"></el-input>
						</el-form-item>
						<el-form-item label="手机号">
							<el-input v-model="teacher.mobile"></el-input>
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
import { Message } from 'element-ui'
import ImageUpload from '../../CommonComponents/ImageUpload'
export default {
	data() {
		return {
			teacher: {
				avatar: '',
				name: '',
				mobile: '',
				remark: ''
			}
		}
	},
	components: { ImageUpload },
	methods: {
		save() {
			Message.success('成功！')
			this.$router.push({name: 'teacher'})
		},
		handleAvatarSuccess(res) {
			this.teacher.avatar = res[0]
		},
		back() {
			this.$router.go(-1)
		}
	}
}
</script>

<style lang="stylus" scoped>

</style>
