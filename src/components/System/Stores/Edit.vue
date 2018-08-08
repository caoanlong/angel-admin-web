<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">编辑门店</div>
			<el-form label-width="120px" :model="store" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="LOGO">
							<ImageUpload :files="[store.logo]" @imgUrlBack="handleLogoSuccess" :fixed="true" :isUseCropper="true"/>
						</el-form-item>
						<el-form-item label="名称" prop="name">
							<el-input v-model="store.name"></el-input>
						</el-form-item>
						<el-form-item label="电话" prop="mobile">
							<el-input v-model="store.mobile"></el-input>
						</el-form-item>
						<el-form-item label="简介" prop="remark">
							<el-input type="textarea" v-model="store.remark"></el-input>
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
import SysStore from '../../../api/SysStore'
import { checkTel } from '../../../common/validator'
export default {
	data() {
		return {
			store: { 
				name: '',
				mobile: '',
				logo: '',
				remark: ''
			},
			rules: {
				name: [
					{ required: true, message: '请输入名称' },
					{ min: 1, max: 20, message: '长度在1到20之间' }
				],
				mobile: [
					{ required: true, message: '请输入电话' },
					{ validator: checkTel }
				],
				remark: [ { min: 1, max: 200, message: '长度在1到200之间' }]
			}
		}
	},
	components: { ImageUpload },
	created() {
		this.getInfo()
	},
	methods: {
		save() {
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				SysStore.update(this.store).then(res => {
					Message.success(res.data.msg)
					this.$router.push({name: 'stores'})
				})
			})
		},
		handleLogoSuccess(res) {
			this.store.logo = res[0]
		},
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

</style>
