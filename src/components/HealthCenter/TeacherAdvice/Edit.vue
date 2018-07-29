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
						<el-form-item label="所属门店">
							<el-select style="width: 100%" v-model="advice.storeId" placeholder="请选择" :disabled="storeId != null && storeId != 'null'">
								<el-option v-for="store in stores" :key="store.storeId" :label="store.name" :value="store.storeId"></el-option>
							</el-select>
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
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import TeacherAdvice from '../../../api/TeacherAdvice'
import Member from '../../../api/Member'
import Person from '../../../api/Person'
import SysStore from '../../../api/SysStore'
export default {
	data() {
		return {
			advice: {
				memberId: '',
				memberName: '',
				personId: '',
				personName: '',
				remark: ''
			},
			stores: []
		}
	},
	computed: {
		...mapGetters(['storeId'])
	},
	created() {
		this.getStores()
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
		getStores() {
			SysStore.find({
				pageSize: 1000
			}).then(res => {
				this.stores = res.rows
				this.getInfo()
			})
		},
		getInfo() {
			const teacherAdviceId = this.$route.query.teacherAdviceId
			TeacherAdvice.findById({ teacherAdviceId }).then(res => {
				this.advice = res
				this.advice.memberName = res.member.name
				this.advice.personName = res.person.name
			})
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
			TeacherAdvice.update(this.advice).then(res => {
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
