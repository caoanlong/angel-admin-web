<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">添加老师</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="头像">
							<ImageUpload :files="[teacher.avatar]" @imgUrlBack="handleAvatarSuccess" :fixed="true" :isUseCropper="true"/>
						</el-form-item>
						<el-form-item label="姓名">
							<el-input v-model="teacher.name"></el-input>
						</el-form-item>
						<el-form-item label="手机号">
							<el-input v-model="teacher.mobile"></el-input>
						</el-form-item>
						<el-form-item label="年龄">
							<el-input v-model="teacher.age"></el-input>
						</el-form-item>
						<el-form-item label="性别">
							<el-select style="width:100%" v-model="teacher.sex">
								<el-option label="男" value="male"></el-option>
								<el-option label="女" value="female"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="简介">
							<el-input type="textarea" v-model="teacher.remark"></el-input>
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
import Person from '../../../api/Person'
export default {
	data() {
		return {
			teacher: {
				type: 'teacher',
				avatar: '',
				name: '',
				mobile: '',
				age: '',
				sex: '',
				remark: ''
			}
		}
	},
	components: { ImageUpload },
	methods: {
		save() {
			Person.add(this.teacher).then(res => {
				Message.success(res.data.msg)
				this.$router.push({name: 'teacher'})
			})
		},
		handleAvatarSuccess(res) {
			this.teacher.avatar = res[0]
		},
		back() {
			this.$router.go(-1)
		}
	}
}
</script>

<style lang="stylus" scoped>

</style>
