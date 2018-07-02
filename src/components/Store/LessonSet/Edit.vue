<template>
    <div class="main-content">
		<el-card class="box-card">
			<div slot="header">编辑课程</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="18" :offset="2">
                        <el-form-item label="图片">
							<ImageUpload :files="[lesson.image]" @imgUrlBack="handleImageSuccess" :fixed="true" />
						</el-form-item>
						<el-form-item label="名称">
							<el-input v-model="lesson.name"></el-input>
						</el-form-item>
                        <el-form-item label="类型">
							<el-input v-model="lesson.type"></el-input>
						</el-form-item>
                        <el-form-item label="价格">
							<el-input v-model="lesson.price"></el-input>
						</el-form-item>
						<el-form-item label="课时数">
							<el-input v-model="lesson.num"></el-input>
						</el-form-item>
                        <el-form-item label="使用有效期">
							<el-select style="width:100%" placeholder="请选择" v-model="lesson.expiryDate">
                                <el-option label="1个月" :value="1"></el-option>
                                <el-option label="6个月" :value="6"></el-option>
                                <el-option label="12个月" :value="12"></el-option>
                            </el-select>
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
export default {
    data() {
		return {
			lesson: {
                image: '#',
                name: '正姿舞蹈',
                type: '48节课半年卡',
				price: 278,
				num: 48,
                expiryDate: 6,
                detail: '教授正姿舞蹈教授正姿舞蹈教授正姿舞蹈'
            }
		}
    },
    components: { ImageUpload },
    mounted() {
		const editor = new E('#editor')
		editor.create()
		editor.txt.html(this.lesson.detail)
	},
    methods: {
        save() {
            Message.success('成功！')
            this.$router.push({name: 'lessonset'})
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
