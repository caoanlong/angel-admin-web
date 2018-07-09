<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">查看医生</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="头像">
							<ImageUpload :files="[doctor.avatar]" :isPreview="true"/>
						</el-form-item>
						<el-form-item label="姓名">
							<p>{{doctor.name}}</p>
						</el-form-item>
						<el-form-item label="手机号">
							<p>{{doctor.mobile}}</p>
						</el-form-item>
						<el-form-item label="简介">
							<p>{{doctor.remark}}</p>
						</el-form-item>
						<el-form-item>
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
		back() {
			this.$router.go(-1)
		}
	}
}
</script>

<style lang="stylus" scoped>
.el-form-item__content
	p
		margin 0
		border 1px solid #fff
		border-bottom-color #dcdfe6
		padding 0 15px
		min-height 40px
		font-family 'sans-serif'
		line-height 40px
		color #999
	.el-input__inner
		vertical-align top
</style>
