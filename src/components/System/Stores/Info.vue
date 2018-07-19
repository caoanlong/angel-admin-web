<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">查看门店</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="LOGO">
							<ImageUpload :files="[store.logo]" :isPreview="true"/>
						</el-form-item>
						<el-form-item label="名称">
							<p>{{store.name}}</p>
						</el-form-item>
						<el-form-item label="电话">
							<p>{{store.mobile}}</p>
						</el-form-item>
						<el-form-item label="简介">
							<p>{{store.remark}}</p>
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
import SysStore from '../../../api/SysStore'
export default {
	data() {
		return {
			store: { 
				name: '',
				mobile: '',
				logo: '',
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
			const storeId = this.$route.query.storeId
			SysStore.findById({ storeId }).then(res => {
				this.store = res
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
