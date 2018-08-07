<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">添加健康报告</div>
			<el-form label-width="120px" :model="record" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="名称" prop="name">
							<el-input placeholder="请输入..." v-model="record.name"></el-input>
						</el-form-item>
						<el-form-item label="会员" prop="memberId">
							<el-autocomplete style="width:100%"
								value-key="name" 
								v-model="record.memberName"
								:fetch-suggestions="getMembers"
								placeholder="请输入..."
								@select="handSelectMember">
								<template slot-scope="{ item }">
									<div>{{ item.name }}<span style="font-size:13px;color:#999">({{ item.mobile }})</span></div>
								</template>
							</el-autocomplete>
						</el-form-item>
						<el-form-item label="医生" prop="personId">
							<el-autocomplete style="width:100%"
								value-key="name" 
								v-model="record.personName"
								:fetch-suggestions="getPersons"
								placeholder="请输入..."
								@select="handSelectPerson">
								<template slot-scope="{ item }">
									<div>{{ item.name }}<span style="font-size:13px;color:#999">({{ item.mobile }})</span></div>
								</template>
							</el-autocomplete>
						</el-form-item>
						<el-form-item label="类型" prop="typeId">
							<el-select style="width:100%" placeholder="请选择" v-model="record.typeId">
								<el-option v-for="item in types" :label="item.value" :value="item.dictId" :key="item.dictId"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="报告日期" prop="recordDate">
							<el-date-picker
								style="width:100%"
								v-model="record.recordDate"
								type="date" 
								value-format="timestamp">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="所属门店" prop="storeId">
							<el-select style="width: 100%" v-model="record.storeId" placeholder="请选择" :disabled="storeId != null && storeId != 'null'">
								<el-option v-for="store in stores" :key="store.storeId" :label="store.name" :value="store.storeId"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="报告文件" prop="file">
							<pdfUpload :file="record.file" @fileUrlBack="handleFileSuccess"/>
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
import pdfUpload from '../../CommonComponents/PDFUpload'
import HealthRecord from '../../../api/HealthRecord'
import Member from '../../../api/Member'
import Person from '../../../api/Person'
import SysDict from '../../../api/SysDict'
import SysStore from '../../../api/SysStore'
export default {
	data() {
		return {
			record: {
				name: '',
				memberId: '',
				memberName: '',
				personId: '',
				personName: '',
				typeId: '',
				storeId: '',
				recordDate: '',
				file: ''
			},
			types: [],
			stores: [],
			rules: {
				name: [
					{ required: true, message: '请输入名称'},
					{ min: 1, max: 50, message: '长度在1到50之间'}
				],
				memberId: [{ required: true, message: '请选择会员'}],
				personId: [{ required: true, message: '请选择医生'}],
				typeId: [{ required: true, message: '请选择类型'}],
				recordDate: [{ required: true, message: '请选择报告日期'}],
				storeId: [{ required: true, message: '请选择门店'}],
				file: [{ required: true, message: '请选择文件'}]
			}
		}
	},
	computed: {
		...mapGetters(['storeId'])
	},
	components: { pdfUpload },
	created() {
		if (this.$route.query.memberId) this.record.memberId = this.$route.query.memberId
		if (this.$route.query.name) this.record.memberName = this.$route.query.name
		this.getTypes()
		this.getStores()
		this.record.storeId = (this.storeId != null && this.storeId != 'null') ? Number(this.storeId) : ''
	},
	methods: {
		getMembers(queryString, cb) {
			Member.suggest({
				keyword: queryString
			}).then(res => { cb(res) })
		},
		getPersons(queryString, cb) {
			Person.suggest({
				keyword: queryString,
				type: 'doctor'
			}).then(res => { cb(res) })
		},
		getTypes() {
			SysDict.findListByType({ type: 'recordType' }).then(res => {
				this.types = res
			})
		},
		getStores() {
			SysStore.find({
				pageSize: 1000
			}).then(res => {
				this.stores = res.rows
			})
		},
		handSelectMember(data) {
			this.record.memberId = data.memberId
			this.record.memberName = data.name
		},
		handSelectPerson(data) {
			this.record.personId = data.personId
			this.record.personName = data.name
		},
		save() {
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				HealthRecord.add(this.record).then(res => {
					Message.success('成功！')
					this.$router.push({name: 'healthrecord'})
				})
			})
		},
		handleFileSuccess(res) {
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
