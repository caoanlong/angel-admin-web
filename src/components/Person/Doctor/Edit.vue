<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">编辑医生</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="头像">
							<ImageUpload :files="[doctor.avatar]" @imgUrlBack="handleAvatarSuccess" :fixed="true" :isUseCropper="true"/>
						</el-form-item>
						<el-form-item label="姓名">
							<el-input v-model="doctor.name"></el-input>
						</el-form-item>
						<el-form-item label="手机号">
							<el-input v-model="doctor.mobile"></el-input>
						</el-form-item>
						<el-form-item label="简介">
							<el-input type="textarea" v-model="doctor.remark"></el-input>
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
import Doctor from '../../../api/Doctor'
export default {
	data() {
		return {
			doctor: {
				avatar: '',
				name: '',
				mobile: '',
				remark: ''
			}
		}
	},
	components: { ImageUpload },
	created() {
		this.getInfo()
	},
	methods: {
		getInfo() {
			const doctorId = this.$route.query.doctorId
			Doctor.findById({ doctorId }).then(res => {
				this.doctor = res
			})
		},
		save() {
			Doctor.update(this.doctor).then(res => {
				Message.success(res.data.msg)
				this.$router.push({name: 'doctor'})
			})
		},
		handleAvatarSuccess(res) {
			this.doctor.avatar = res[0]
		},
		back() {
			this.$router.go(-1)
		}
	}
}
</script>

<style lang="stylus" scoped>

</style>
