<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">查看产品</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="18" :offset="2">
						<el-form-item label="名称">
							<p>{{product.name}}</p>
						</el-form-item>
						<el-form-item label="运费">
							<p>{{product.freight}}</p>
						</el-form-item>
						<el-form-item label="快递类型">
							<p>{{product.expressType && product.expressType.value}}</p>
						</el-form-item>
						<el-form-item label="价格">
							<p>{{product.price}}</p>
						</el-form-item>
						<el-form-item label="图片">
							<ImageUpload :files="[product.image]" :isPreview="true"/>
						</el-form-item>
						<el-form-item label="详情">
							<p v-html="product.remark"></p>
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
import PlatformProduct from '../../../api/PlatformProduct'
export default {
	data() {
		return {
			product: {
				image: '',
				name: '',
				freight: '',
				expressTypeId: '',
				price: '',
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
			const platformProductId = this.$route.query.platformProductId
			PlatformProduct.findById({ platformProductId }).then(res => {
				this.product = res
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
