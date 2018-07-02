<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">查看健康报告</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="名称">
                            <p>{{record.name}}</p>
						</el-form-item>
                        <el-form-item label="会员">
                            <p>{{record.member}}</p>
						</el-form-item>
                        <el-form-item label="老师">
                            <p>{{record.teacher}}</p>
						</el-form-item>
                        <el-form-item label="类型">
                            <p>{{record.type}}</p>
						</el-form-item>
                        <el-form-item label="报告日期">
                            <p>{{record.record_date | getdatefromtimestamp(true)}}</p>
                        </el-form-item>
                        <el-form-item label="报告图">
							<ImageUpload :files="record.file" :isPreview="true"/>
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
export default {
	data() {
		return {
			record: {
				name: '小明足疾筛查报告',
                member: '小明',
                teacher: '大毛',
                type: '筛查报告',
                record_date: new Date(),
                image: '#',
                file: ['#', '#']
			}
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
