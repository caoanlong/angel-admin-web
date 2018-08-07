<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">添加老师建议</div>
			<el-form label-width="120px" :model="advice" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="会员" prop="memberId">
							<el-autocomplete style="width:100%"
								value-key="name" 
								v-model="advice.memberName"
								:fetch-suggestions="getMembers"
								placeholder="请输入..."
								@select="handSelectMember">
								<template slot-scope="{ item }">
									<div>{{ item.name }}<span style="font-size:13px;color:#999">({{ item.mobile }})</span></div>
								</template>
							</el-autocomplete>
						</el-form-item>
						<el-form-item label="老师" prop="personId">
							<el-autocomplete style="width:100%"
								value-key="name" 
								v-model="advice.personName"
								:fetch-suggestions="getTeachers"
								placeholder="请输入..."
								@select="handSelectTeacher">
								<template slot-scope="{ item }">
									<div>{{ item.name }}<span style="font-size:13px;color:#999">({{ item.mobile }})</span></div>
								</template>
							</el-autocomplete>
						</el-form-item>
						<el-form-item label="所属门店" prop="storeId">
							<el-select style="width: 100%" v-model="advice.storeId" placeholder="请选择" :disabled="storeId != null && storeId != 'null'">
								<el-option v-for="store in stores" :key="store.storeId" :label="store.name" :value="store.storeId"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="建议" prop="remark">
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
			stores: [],
			rules: {
				memberId: [{ required: true, message: '请选择学生'}],
				storeId: [{ required: true, message: '请选择门店'}],
				personId: [{ required: true, message: '请选择老师'}],
				remark: [
					{ required: true, message: '请输入建议'},
					{ min: 1, max: 50, message: '长度在1到200之间'}
				]
			}
		}
	},
	computed: {
		...mapGetters(['storeId'])
	},
	created() {
		if (this.$route.query.memberId) this.advice.memberId = this.$route.query.memberId
		if (this.$route.query.name) this.advice.memberName = this.$route.query.name
		this.getStores()
		this.advice.storeId = (this.storeId != null && this.storeId != 'null') ? Number(this.storeId) : ''
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
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				TeacherAdvice.add(this.advice).then(res => {
					Message.success('成功！')
					this.$router.push({name: 'teacheradvice'})
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
