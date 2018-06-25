<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">查看天使留言</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="12" :offset="5">
                        <el-form-item label="会员">
                            <p>{{remark.member}}</p>
						</el-form-item>
                        <el-form-item label="老师">
                            <p>{{remark.teacher}}</p>
						</el-form-item>
                        <el-form-item label="建议">
                            <p>{{remark.remark}}</p>
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
export default {
	data() {
		return {
			remark: {
                member: '小明',
                teacher: '大毛',
                remark: '感谢天使无忧的正姿老师王老师，祝老师万事如意身体健康！感谢天使无忧的正姿老师王老师，祝老师万事如意身体健康！'
			}
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
