<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">添加老师建议</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="会员">
							<el-autocomplete style="width:100%"
								value-key="name" 
								v-model="advice.memberName"
								:fetch-suggestions="getMembers"
								placeholder="请输入..."
								@select="handSelectMember">
							</el-autocomplete>
						</el-form-item>
						<el-form-item label="老师">
							<el-autocomplete style="width:100%"
								value-key="name" 
								v-model="advice.personName"
								:fetch-suggestions="getTeachers"
								placeholder="请输入..."
								@select="handSelectTeacher">
							</el-autocomplete>
						</el-form-item>
						<el-form-item label="建议">
							<el-input type="textarea" :rows="5" v-model="advice.remark"></el-input>
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
import TeacherAdvice from '../../../api/TeacherAdvice'
import Member from '../../../api/Member'
import Person from '../../../api/Person'
export default {
	data() {
		return {
			advice: {
				memberId: '',
				memberName: '',
				personId: '',
				personName: '',
				remark: ''
			}
		}
	},
	created() {
		if (this.$route.query.name) this.advice.memberName = this.$route.query.name
	},
	methods: {
		getMembers(queryString, cb) {
			Member.suggest({
				keyword: queryString
			}).then(res => { cb(res) })
		},
		getTeachers(queryString, cb) {
			Person.suggest({
				keyword: queryString,
				type: 'teacher'
			}).then(res => { cb(res) })
		},
		handSelectMember(data) {
			this.advice.memberId = data.memberId
			this.advice.memberName = data.name
		},
		handSelectTeacher(data) {
			this.advice.personId = data.personId
			this.advice.personName = data.name
		},
		save() {
			TeacherAdvice.add(this.advice).then(res => {
				Message.success('成功！')
				this.$router.push({name: 'teacheradvice'})
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
