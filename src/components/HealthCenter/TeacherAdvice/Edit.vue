<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">编辑老师建议</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="12" :offset="5">
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
								v-model="advice.teacherName"
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
export default {
	data() {
		return {
			advice: {
                memberName: '小明',
                teacherName: '王老师',
                remark: '治疗的同时注意不要吃辛辣的食物，注意具备的卫生治疗的同时治疗的同时注意不要吃辛辣的食物，注意具备的卫生治疗的同时'
			}
		}
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
			this.advice.memberId = data.id
			this.advice.memberName = data.name
		},
		handSelectTeacher(data) {
			this.advice.teacherId = data.id
			this.advice.teacherName = data.name
		},
		save() {
			Message.success('成功！')
			this.$router.push({name: 'teacheradvice'})
		},
		back() {
			this.$router.go(-1)
		}
	}
}
</script>

<style lang="stylus" scoped>

</style>
