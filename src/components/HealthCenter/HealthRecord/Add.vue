<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">添加健康报告</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="名称">
							<el-input placeholder="请输入..." v-model="record.name"></el-input>
						</el-form-item>
                        <el-form-item label="会员">
							<el-autocomplete style="width:100%"
								value-key="name" 
								v-model="record.memberName"
								:fetch-suggestions="getMembers"
								placeholder="请输入..."
								@select="handSelectMember">
							</el-autocomplete>
						</el-form-item>
                        <el-form-item label="老师">
							<el-autocomplete style="width:100%"
								value-key="name" 
								v-model="record.teacherName"
								:fetch-suggestions="getTeachers"
								placeholder="请输入..."
								@select="handSelectTeacher">
							</el-autocomplete>
						</el-form-item>
                        <el-form-item label="类型">
							<el-select style="width:100%" placeholder="请选择" v-model="record.type">
								<el-option label="筛查报告" value="筛查报告"></el-option>
								<el-option label="检测报告" value="检测报告"></el-option>
							</el-select>
						</el-form-item>
                        <el-form-item label="报告日期">
                            <el-date-picker
                                style="width:100%"
                                v-model="record.record_date"
                                type="date" 
                                value-format="timestamp">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="报告文件">
							<ImageUpload :files="record.file" :limitNum="10" @imgUrlBack="handleRecordSuccess"/>
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
				name: '',
                memberName: '',
                teacherName: '',
                type: '',
                record_date: '',
                file: []
			}
		}
	},
	components: { ImageUpload },
	created() {
		if (this.$route.query.name) this.record.memberName = this.$route.query.name
	},
	methods: {
		getMembers(queryString, cb) {
			let list = [
				{ id: 1, name: '小明' },
				{ id: 2, name: '小花' },
				{ id: 3, name: '狗蛋' }
			]
			setTimeout(() => { cb(list) }, 500)
		},
		getTeachers(queryString, cb) {
			let list = [
				{ id: 1, name: '王老师' },
				{ id: 2, name: '张老师' },
				{ id: 3, name: '苟老师' }
			]
			setTimeout(() => { cb(list) }, 500)
		},
		handSelectMember(data) {
			this.record.memberId = data.id
			this.record.memberName = data.name
		},
		handSelectTeacher(data) {
			this.record.teacherId = data.id
			this.record.teacherName = data.name
		},
		save() {
			Message.success('成功！')
			this.$router.push({name: 'healthrecord'})
		},
        handleRecordSuccess(res) {
			this.record.file = res
		},
		back() {
			this.$router.go(-1)
		}
	}
}
</script>

<style lang="stylus" scoped>

</style>
