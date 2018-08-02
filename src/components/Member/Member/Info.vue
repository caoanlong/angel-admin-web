<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">查看会员</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="头像">
							<ImageUpload :files="[member.avatar]" :isPreview="true"/>
						</el-form-item>
						<el-form-item label="姓名">
							<p>{{member.name}}</p>
						</el-form-item>
						<el-form-item label="手机号">
							<p>{{member.mobile}}</p>
						</el-form-item>
						<el-form-item label="年龄">
							<p>{{member.age}}</p>
						</el-form-item>
						<el-form-item label="性别">
							<p>{{member.sex}}</p>
						</el-form-item>
						<el-form-item label="编码">
							<p>{{member.code}}</p>
						</el-form-item>
						<el-form-item label="家长姓名">
							<p>{{member.parentName}}</p>
						</el-form-item>
						<el-form-item label="家长手机">
							<p>{{member.parentMobile}}</p>
						</el-form-item>
						<el-form-item label="所属门店">
							<p>{{member.store.name}}</p>
						</el-form-item>
						<el-form-item label="来源">
							<p>{{member.from}}</p>
						</el-form-item>
						<el-form-item label="简介">
							<p>{{member.remark}}</p>
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
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import ImageUpload from '../../CommonComponents/ImageUpload'
import Member from '../../../api/Member'
export default {
	data() {
		return {
			member: {
				avatar: '',
				name: '',
				mobile: '',
				age: '',
				sex: '',
				code: '',
				store: '',
				storeId: '',
				parentName: '',
				parentMobile: '',
				from: '',
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
			const memberId = this.$route.query.memberId
			Member.findById({ memberId }).then(res => {
				this.member = res
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
