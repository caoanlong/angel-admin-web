<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">编辑产品</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="10" :offset="6">
						<el-form-item label="图片">
							<ImageUpload :files="[product.image]" @imgUrlBack="handleImageSuccess" :fixed="true" />
						</el-form-item>
						<el-form-item label="名称">
							<el-input v-model="product.name"></el-input>
						</el-form-item>
						<el-form-item label="运费">
							<el-input v-model="product.express"></el-input>
						</el-form-item>
						<el-form-item label="价格">
							<el-input v-model="product.price"></el-input>
						</el-form-item>
						<el-form-item label="详情">
							<el-input type="textarea" v-model="product.detail"></el-input>
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
import ImageUpload from '../../CommonComponents/ImageUpload'
export default {
	data() {
		return {
			product: {
				image: '#',
				name: '七彩虹GTX750Ti 2G限量版',
				price: 278,
				express: 0,
				detail: '游戏发烧友必备游戏发烧友必备游戏发烧友必备游戏发烧友必备游戏发烧友必备'
			}
		}
	},
	components: { ImageUpload },
	methods: {
		save() {
			Message.success('成功！')
			this.$router.push({name: 'platformproduct'})
		},
		handleImageSuccess(res) {
			this.lesson.image = res[0]
		},
		back() {
			this.$router.go(-1)
		}
	}
}
</script>

<style lang="stylus" scoped>

</style>
