<template>
    <div class="main-content">
		<el-card class="box-card">
			<div slot="header">编辑用户</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="头像">
							<ImageUpload :files="[user.avatar]" :isPreview="true"/>
						</el-form-item>
						<el-form-item label="姓名">
                            <p>{{user.name}}</p>
						</el-form-item>
						<el-form-item label="手机号码">
                            <p>{{user.mobile}}</p>
						</el-form-item>
						<el-form-item label="是否禁用">
                            <p>{{user.isDisabled ? '是' : '否'}}</p>
						</el-form-item>
						<el-form-item label="角色权限">
                            <p>{{user.role.name}}</p>
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
import SysUser from '../../../api/SysUser'
export default {
    data() {
		return {
			user: {
				name: '',
				mobile: '',
				password: '',
				isDisabled: false,
				roleId: '',
				avatar: ''
			},
			roles: []
		}
    },
	components: { ImageUpload },
	created() {
		this.getInfo()
	},
    methods: {
		getInfo() {
			const userId = this.$route.query.userId
			SysUser.findById({ userId }).then(res => {
				this.user = res
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
