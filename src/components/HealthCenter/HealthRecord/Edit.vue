<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">编辑健康报告</div>
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
								v-model="record.personName"
								:fetch-suggestions="getPersons"
								placeholder="请输入..."
								@select="handSelectPerson">
							</el-autocomplete>
						</el-form-item>
						<el-form-item label="类型">
							<el-select style="width:100%" placeholder="请选择" v-model="record.typeId">
								<el-option v-for="item in types" :label="item.value" :value="item.dictId" :key="item.dictId"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="报告日期">
							<el-date-picker
								style="width:100%"
								v-model="record.recordDate"
								type="date" 
								value-format="timestamp">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="所属门店">
							<el-select style="width: 100%" v-model="record.storeId" placeholder="请选择" :disabled="storeId != null && storeId != 'null'">
								<el-option v-for="store in stores" :key="store.storeId" :label="store.name" :value="store.storeId"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="报告文件">
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
			stores: []
		}
	},
	computed: {
		...mapGetters(['storeId'])
	},
	components: { pdfUpload },
	created() {
		this.getTypes()
		this.getStores()
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
				this.getInfo()
			})
		},
		getInfo() {
			const healthRecordId = this.$route.query.healthRecordId
			HealthRecord.findById({ healthRecordId }).then(res => {
				this.record = res
				this.record.memberName = res.member.name
				this.record.personName = res.person.name
				this.record.recordDate = new Date(res.recordDate).getTime()
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
			HealthRecord.update(this.record).then(res => {
				Message.success('成功！')
				this.$router.push({name: 'healthrecord'})
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
