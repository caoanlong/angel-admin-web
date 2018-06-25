<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">编辑健康报告</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="10" :offset="6">
						<el-form-item label="名称">
							<el-input v-model="record.name"></el-input>
						</el-form-item>
                        <el-form-item label="会员">
							<el-input v-model="record.member"></el-input>
						</el-form-item>
                        <el-form-item label="老师">
							<el-input v-model="record.teacher"></el-input>
						</el-form-item>
                        <el-form-item label="类型">
							<el-input v-model="record.type"></el-input>
						</el-form-item>
                        <el-form-item label="报告日期">
                            <el-date-picker
                                style="width:100%"
                                v-model="record.record_date"
                                type="date" 
                                value-format="timestamp">
                            </el-date-picker>
                        </el-form-item>
						<el-form-item label="缩略图">
							<ImageUpload :files="[record.image]" @imgUrlBack="handleImageSuccess" :fixed="true" :isUseCropper="true"/>
						</el-form-item>
                        <el-form-item label="报告图">
							<ImageUpload :files="record.recordImage" :limit="10" @imgUrlBack="handleRecordImageSuccess" :fixed="true" />
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
			record: {
				name: '小明足疾筛查报告',
                member: '小明',
                teacher: '大毛',
                type: '筛查报告',
                record_date: new Date(),
                image: '#',
                recordImage: ['#', '#']
			}
		}
	},
	components: { ImageUpload },
	methods: {
		save() {
			Message.success('成功！')
			this.$router.push({name: 'healthrecord'})
		},
		handleImageSuccess(res) {
			this.record.image = res[0]
        },
        handleRecordImageSuccess(res) {
			this.record.recordImage = res
		},
		back() {
			this.$router.go(-1)
		}
	}
}
</script>

<style lang="stylus" scoped>

</style>
