<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">编辑课程</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="18" :offset="2">
						<el-form-item label="名称">
							<el-input v-model="lesson.name"></el-input>
						</el-form-item>
						<el-form-item label="类型">
							<el-select style="width: 100%" placeholder="请选择" v-model="lesson.labelId">
								<el-option v-for="item in types" :label="item.value" :value="item.dictId" :key="item.dictId"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="使用有效期">
							<el-input v-model="lesson.validDate"></el-input>
						</el-form-item>
						<el-form-item label="价格">
							<el-input v-model="lesson.price"></el-input>
						</el-form-item>
						<el-form-item label="课时数">
							<el-input v-model="lesson.lessonNum"></el-input>
						</el-form-item>
						<el-form-item label="图片">
							<ImageUpload :files="[lesson.image]" @imgUrlBack="handleImageSuccess" :isUseCropper="true"/>
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
import SysDict from '../../../api/SysDict'
import Product from '../../../api/Product'
export default {
	data() {
		return {
			editor: null,
			lesson: {
				type: 'lessonSet',
                name: '',
                labelId: '',
                image: '',
                lessonNum: '',
                price: '',
                validDate: '',
                remark: ''
			},
			types: []
		}
	},
	components: { ImageUpload },
	created() {
		this.getTypes()
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
			const data = this.lesson
			data.remark = this.editor.txt.html()
			Product.update(data).then(res => {
				Message.success('成功！')
				this.$router.push({name: 'lessonset'})
			})
		},
		handleImageSuccess(res) {
			this.lesson.image = res[0]
		},
		getTypes() {
			SysDict.findListByType({ type: 'lessonType' }).then(res => {
				this.types = res
				this.getInfo()
			})
		},
		getInfo() {
			const productId = this.$route.query.productId
			Product.findById({ productId }).then(res => {
				this.lesson = res
				this.$nextTick(() => {
					this.editor.txt.html(this.lesson.remark)
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
#editor
	min-width 700px
</style>
