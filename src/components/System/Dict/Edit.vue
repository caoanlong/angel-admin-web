<template>
    <div class="main-content">
		<el-card class="box-card">
			<div slot="header">编辑字典</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="键">
							<el-input v-model="dict.key"></el-input>
						</el-form-item>
						<el-form-item label="值">
							<el-input v-model="dict.value"></el-input>
						</el-form-item>
						<el-form-item label="类型">
							<el-input v-model="dict.type"></el-input>
						</el-form-item>
						<el-form-item label="描述">
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
export default {
    data() {
		return {
			dict: { 
                key: '成功',
                value: 'success',
                type: 'goodsStatus',
                description: '商品购买状态',
                sort: 1,
            }
		}
    },
    methods: {
        save() {
            Message.success('成功！')
            this.$router.push({name: 'dict'})
        },
        back() {
			this.$router.go(-1)
		}
    }
}
</script>

<style lang="stylus" scoped>

</style>
