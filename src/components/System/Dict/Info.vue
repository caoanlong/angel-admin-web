<template>
    <div class="main-content">
		<el-card class="box-card">
			<div slot="header">查看字典</div>
            <el-form label-width="120px">
                <el-row>
                    <el-col :span="14" :offset="4">
                        <el-form-item label="键">
                            <p v-text="dict.key"></p>
                        </el-form-item>
                        <el-form-item label="值">
                            <p v-text="dict.value"></p>
                        </el-form-item>
                        <el-form-item label="类型">
                            <p v-text="dict.type"></p>
                        </el-form-item>
                        <el-form-item label="描述">
                            <p v-text="dict.description"></p>
                        </el-form-item>
                        <el-form-item label="排序">
                            <p v-text="dict.sort"></p>
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
import SysDict from '../../../api/SysDict'
export default {
    data() {
		return {
			dict: { 
                key: '',
                value: '',
                type: '',
                description: '',
                sort: 1,
            }
		}
    },
    created() {
		this.getInfo()
	},
    methods: {
        getInfo() {
			const dictId = this.$route.query.dictId
			SysDict.findById({ dictId }).then(res => {
				this.dict = res
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
