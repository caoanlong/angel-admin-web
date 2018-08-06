<template>
    <div class="main-content">
		<el-card class="box-card">
			<div slot="header">个人资料</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="头像">
							<ImageUpload :files="[user.avatar]" @imgUrlBack="handleAvatarSuccess" :fixed="true" :isUseCropper="true"/>
						</el-form-item>
						<el-form-item label="姓名">
							<el-input v-model="user.name" disabled></el-input>
						</el-form-item>
						<el-form-item label="手机号码">
							<el-input v-model="user.mobile"></el-input>
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
import ImageUpload from '../CommonComponents/ImageUpload'
import Auth from '../../api/Auth'
export default {
    data() {
		return {
			user: {}
		}
    },
	components: { ImageUpload },
	created() {
		this.getInfo()
	},
    methods: {
        save() {
			Auth.update({
                mobile: this.user.mobile,
                avatar: this.user.avatar
            }).then(res => {
				Message.success(res.data.msg)
				this.$store.dispatch('getUserInfo')
            	this.$router.go(-1)
			})
        },
        handleAvatarSuccess(res) {
			this.user.avatar = res[0]
		},
		getInfo() {
			Auth.info().then(res => {
				this.user = res.data.data
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
