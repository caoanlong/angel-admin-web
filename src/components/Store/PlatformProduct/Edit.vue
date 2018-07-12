<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">编辑产品</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="18" :offset="2">
						<el-form-item label="名称">
							<el-input v-model="product.name"></el-input>
						</el-form-item>
						<el-form-item label="运费">
							<el-input v-model="product.freight"></el-input>
						</el-form-item>
						<el-form-item label="快递类型">
							<el-select style="width: 100%" placeholder="请选择" v-model="product.expressTypeId">
								<el-option v-for="item in types" :label="item.value" :value="item.dictId" :key="item.dictId"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="价格">
							<el-input v-model="product.price"></el-input>
						</el-form-item>
						<el-form-item label="图片">
							<ImageUpload :files="[product.image]" @imgUrlBack="handleImageSuccess" :isUseCropper="true"/>
						</el-form-item>
						<el-form-item label="详情">
							<div id="editor"></div>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="save">保存</el-button>
							<el-button @click="back">取消</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
	</div>
</template>

<script>
import { Message } from 'element-ui'
import E from 'wangeditor'
import ImageUpload from '../../CommonComponents/ImageUpload'
import PlatformProduct from '../../../api/PlatformProduct'
import SysDict from '../../../api/SysDict'
export default {
	data() {
		return {
			editor: null,
			product: {
				image: '',
				name: '',
				freight: '',
				expressTypeId: '',
				price: '',
				remark: ''
			},
			types: []
		}
	},
	components: { ImageUpload },
	created() {
		this.getExpressTypes()
	},
	mounted() {
		this.editor = new E('#editor')
		this.editor.customConfig.zIndex = 100
		this.editor.customConfig.uploadImgServer = `${this.imgApi}/upload/multiple`
		this.editor.customConfig.uploadFileName = 'files'
		this.editor.customConfig.uploadImgHooks = {
			customInsert: (insertImg, result, editor) => {
				result.data.forEach(item => {
					insertImg(this.imgUrl + item)
				})
			}
		}
		this.editor.create()
	},
	beforeDestroy() {
		this.editor = null
	},
	methods: {
		save() {
			const data = this.product
			data.remark = this.editor.txt.html()
			PlatformProduct.update(data).then(res => {
				Message.success('成功！')
				this.$router.push({name: 'platformproduct'})
			})
		},
		handleImageSuccess(res) {
			this.product.image = res[0]
		},
		getExpressTypes() {
			SysDict.findListByType({ type: 'expressType' }).then(res => {
				this.types = res
				this.getInfo()
			})
		},
		getInfo() {
			const platformProductId = this.$route.query.platformProductId
			PlatformProduct.findById({ platformProductId }).then(res => {
				this.product = res
				this.$nextTick(() => {
					this.editor.txt.html(this.product.remark)
				})
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
