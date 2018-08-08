<template>
    <div class="main-content">
		<el-card class="box-card">
			<div slot="header">添加字典</div>
			<el-form label-width="120px" :model="dict" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="键" prop="key">
							<el-input v-model="dict.key"></el-input>
						</el-form-item>
						<el-form-item label="值" prop="value">
							<el-input v-model="dict.value"></el-input>
						</el-form-item>
						<el-form-item label="类型" prop="type">
							<el-input v-model="dict.type"></el-input>
						</el-form-item>
						<el-form-item label="描述" prop="description">
							<el-input v-model="dict.description"></el-input>
						</el-form-item>
						<el-form-item label="排序">
                            <el-input-number v-model="dict.sort" :min="1"></el-input-number>
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
import SysDict from '../../../api/SysDict'
export default {
    data() {
		return {
			dict: { 
                key: '',
                value: '',
                type: '',
                description: '',
                sort: 1
			},
			rules: {
				key: [
					{ required: true, message: '请输入键' },
					{ min: 1, max: 20, message: '长度在1到20之间' }
				],
				value: [
					{ required: true, message: '请输入值' },
					{ min: 1, max: 20, message: '长度在1到20之间' }
				],
				type: [
					{ required: true, message: '请输入类型' },
					{ min: 1, max: 20, message: '长度在1到20之间' }
				],
				description: [
					{ required: true, message: '请输入描述' },
					{ min: 1, max: 20, message: '长度在1到20之间' }
				]
			}
		}
    },
    methods: {
        save() {
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				SysDict.add(this.dict).then(res => {
					Message.success(res.data.msg)
					this.$router.push({name: 'dict'})
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
