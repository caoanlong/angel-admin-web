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
							<p>{{record.memberName}}</p>
						</el-form-item>
						<el-form-item label="老师">
							<p>{{record.personName}}</p>
						</el-form-item>
						<el-form-item label="类型">
							<p>{{record.type && record.type.value}}</p>
						</el-form-item>
						<el-form-item label="报告日期">
							<p>{{record.recordDate | getdatefromtimestamp(true)}}</p>
						</el-form-item>
						<el-form-item label="所属门店">
							<p>{{record.store.name}}</p>
						</el-form-item>
						<el-form-item label="报告文件">
							<pdfUpload :file="record.file" :isPreview="true"/>
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
import pdfUpload from '../../CommonComponents/PDFUpload'
import HealthRecord from '../../../api/HealthRecord'
export default {
	data() {
		return {
			record: {
				name: '',
				memberName: '',
				personId: '',
				personName: '',
				typeId: '',
				store: '',
				recordDate: '',
				file: ''
			}
		}
	},
	components: { pdfUpload },
	created() {
		this.getInfo()
	},
	methods: {
		getInfo() {
			const healthRecordId = this.$route.query.healthRecordId
			HealthRecord.findById({ healthRecordId }).then(res => {
				this.record = res
				this.record.memberName = res.member.name
				this.record.personName = res.person.name
				this.record.recordDate = new Date(res.recordDate).getTime()
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
