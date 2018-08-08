<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">编辑产品</div>
			<el-form label-width="120px" :model="product" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="18" :offset="2">
						<el-form-item label="名称" prop="name">
							<el-input v-model="product.name"></el-input>
						</el-form-item>
						<el-form-item label="运费" prop="freight">
							<el-input v-model="product.freight"></el-input>
						</el-form-item>
						<el-form-item label="快递类型" prop="expressTypeId">
							<el-select style="width: 100%" placeholder="请选择" v-model="product.expressTypeId">
								<el-option v-for="item in types" :label="item.value" :value="item.dictId" :key="item.dictId"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="价格" prop="price">
							<el-input v-model="product.price"></el-input>
						</el-form-item>
						<el-form-item label="图片" prop="image">
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
import Product from '../../../api/Product'
import SysDict from '../../../api/SysDict'
import { checkFloat2, checkInt, checkFloatZero2 } from '../../../common/validator'
export default {
	data() {
		return {
			editor: null,
			product: {
				type: 'platformProduct',
                name: '',
                image: '',
                freight: '',
                expressTypeId: '',
                price: '',
                remark: ''
			},
			types: [],
			rules: {
				name: [
					{ required: true, message: '请输入名称' },
					{ min: 1, max: 50, message: '长度在1到50之间' }
				],
				freight: [ { validator: checkFloatZero2 } ],
				expressTypeId: [{ required: true, message: '请选择快递类型' }],
				price: [
					{ required: true, message: '请输入价格' },
					{ validator: checkFloat2 }
				],
				image: [{ required: true, message: '请选择图片' }]
			}
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
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				Product.update(data).then(res => {
					Message.success('成功！')
					this.$router.push({name: 'platformproduct'})
				})
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
			const productId = this.$route.query.productId
			Product.findById({ productId }).then(res => {
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
