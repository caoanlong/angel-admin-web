<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">添加会员</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="头像">
							<ImageUpload :files="[member.avatar]" @imgUrlBack="handleAvatarSuccess" :fixed="true" :isUseCropper="true"/>
						</el-form-item>
						<el-form-item label="姓名">
							<el-input v-model="member.name"></el-input>
						</el-form-item>
						<el-form-item label="手机号">
							<el-input v-model="member.mobile"></el-input>
						</el-form-item>
						<el-form-item label="年龄">
							<el-input v-model="member.age"></el-input>
						</el-form-item>
						<el-form-item label="性别">
							<el-select style="width:100%" v-model="member.sex">
								<el-option label="男" value="male"></el-option>
								<el-option label="女" value="female"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="编码">
							<el-input v-model="member.code"></el-input>
						</el-form-item>
						<el-form-item label="家长姓名">
							<el-input v-model="member.parentName"></el-input>
						</el-form-item>
						<el-form-item label="家长手机">
							<el-input v-model="member.parentMobile"></el-input>
						</el-form-item>
						<el-form-item label="所属门店">
							<el-select style="width: 100%" v-model="member.storeId" placeholder="请选择" :disabled="!!storeId">
								<el-option v-for="store in stores" :key="store.storeId" :label="store.name" :value="store.storeId"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="来源">
							<el-input v-model="member.from"></el-input>
						</el-form-item>
						<el-form-item label="简介">
							<el-input type="textarea" v-model="member.remark"></el-input>
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
import ImageUpload from '../../CommonComponents/ImageUpload'
import Member from '../../../api/Member'
import SysStore from '../../../api/SysStore'
export default {
	data() {
		return {
			member: {
				avatar: '',
				name: '',
				mobile: '',
				age: '',
				sex: '',
				code: '',
				storeId: '',
				parentName: '',
				parentMobile: '',
				from: '',
				remark: ''
			},
			stores: []
		}
	},
	computed: {
		...mapGetters(['storeId'])
	},
	components: { ImageUpload },
	created() {
		this.getStores()
		if (this.storeId) this.member.storeId = this.storeId
	},
	methods: {
		save() {
			Member.add(this.member).then(res => {
				Message.success(res.data.msg)
				this.$router.push({name: 'member'})
			})
		},
		handleAvatarSuccess(res) {
			this.member.avatar = res[0]
		},
		getStores() {
			SysStore.find({
				pageSize: 1000
			}).then(res => {
				this.stores = res.rows
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
