<template>
    <div class="main-content">
		<el-card class="box-card">
			<div slot="header">查看用户</div>
            <el-form label-width="120px">
                <el-row>
                    <el-col :span="14" :offset="5">
                        <el-form-item label="头像">
                            <ImageUpload :files="[user.avatar]" :isPreview="true" />
                        </el-form-item>
                        <el-form-item label="姓名">
                            <p v-text="user.name"></p>
                        </el-form-item>
                        <el-form-item label="手机号码">
                            <p v-text="user.mobile"></p>
                        </el-form-item>
                        <el-form-item label="是否禁用">
                            <p v-text="user.is_disabled"></p>
                        </el-form-item>
                        <el-form-item label="角色权限">
                            <p v-text="user.role_id"></p>
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
