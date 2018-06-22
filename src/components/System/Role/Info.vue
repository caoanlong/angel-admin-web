<template>
    <div class="main-content">
		<el-card class="box-card">
			<div slot="header">查看角色</div>
            <el-form label-width="120px">
                <el-row>
                    <el-col :span="14" :offset="5">
                        <el-form-item label="角色名称">
                            <p v-text="role.name"></p>
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
export default {
    data() {
		return {
			role: { name: '管理员' }
		}
    },
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
