<template>
	<el-dialog title="权限设置" :visible.sync="showSetAuth" width="30%">
		<el-tree
			:data="menus"
			show-checkbox
			default-expand-all
			node-key="menuID"
			ref="tree"
			highlight-current 
			:default-checked-keys="selectedMenuId"
			:props="defaultProps"
			@check-change="selectMenu" style="height:400px;overflow-y:auto">
		</el-tree>
		<span slot="footer" class="dialog-footer">
			<el-button @click="cancelAuth">取 消</el-button>
			<el-button type="primary" @click="submitSetAuth">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
import { Message } from 'element-ui'
import SysRole from '../../../../api/SysRole'
export default {
	props: {
		showSetAuth: {
			type: Boolean,
			default: false
		},
		setRoleId: {
			type: String,
		}
	},
	data() {
		return {
			menus: [],
			selectedMenuId: [],
			defaultProps: {
				children: 'children',
				label: 'name'
			}
		}
	},
	watch: {
		showSetAuth(newVal) {
			// newVal && this.getAllMenus()
			console.log(newVal)
		}
	},
	methods: {
		cancelAuth() {
			this.$emit('selected-auth')
		},
		submitSetAuth() {
			SysRole.addAuthority({
				roleId: this.setRoleId,
				menuIds: this.selectedMenuId
			}).then(res => {
				Message.success(res.data.msg)
				this.$emit('selected-auth', true)
			})
		},
		// getAllMenus() {
		// 	console.log(this.setRoleId)
		// 	SysRole.findMenuList({ roleId: this.setRoleId }).then(res => {
		// 		this.menus = res.menuList
		// 		this.selectedMenuId = res.menuIDList
		// 	})
		// },
		selectMenu(data, isSelected) {
			if (isSelected) {
				this.selectedMenuId.push(data.menuId)
			} else {
				this.selectedMenuId.splice(this.selectedMenuId.indexOf(data.menuId), 1)
			}
		}
	}
}
</script>

<style lang="stylus" scoped>

</style>
<template>
	<el-dialog title="权限设置" :visible.sync="showSetAuth" width="30%">
		<el-tree
			:data="menus"
			show-checkbox
			default-expand-all
			node-key="menuID"
			ref="tree"
			highlight-current 
			:default-checked-keys="selectedMenuId"
			:props="defaultProps"
			@check-change="selectMenu" style="height:400px;overflow-y:auto">
		</el-tree>
		<span slot="footer" class="dialog-footer">
			<el-button @click="cancelAuth">取 消</el-button>
			<el-button type="primary" @click="submitSetAuth">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
import { Message } from 'element-ui'
import SysRole from '../../../../api/SysRole'
export default {
	props: {
		showSetAuth: {
			type: Boolean,
			default: false
		},
		setRoleId: {
			type: String,
		}
	},
	data() {
		return {
			menus: [],
			selectedMenuId: [],
			defaultProps: {
				children: 'children',
				label: 'name'
			}
		}
	},
	watch: {
		showSetAuth(newVal) {
			newVal && this.getAllMenus()
		}
	},
	methods: {
		cancelAuth() {
			this.$emit('selected-auth')
		},
		submitSetAuth() {
			SysRole.addAuthority({
				roleID: this.setRoleId,
				menuIDs: this.selectedMenuId
			}).then(res => {
				Message.success(res.data.msg)
				this.$emit('selected-auth', true)
			})
		},
		getAllMenus() {
			SysRole.findMenuList({ roleID: this.setRoleId }).then(res => {
				this.menus = res.menuList
				this.selectedMenuId = res.menuIds
			})
		},
		selectMenu(data, isSelected) {
			if (isSelected) {
				this.selectedMenuId.push(data.menuID)
			} else {
				this.selectedMenuId.splice(this.selectedMenuId.indexOf(data.menuID), 1)
			}
		}
	}
}
</script>

<style lang="stylus" scoped>

</style>
