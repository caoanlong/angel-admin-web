<template>
	<scroll-bar>
		<el-menu 
			mode="vertical" 
			:unique-opened="true" 
			:default-active="$route.name" 
			:collapse="isCollapse" 
			background-color="#304156" 
			text-color="#bfcbd9" 
			active-text-color="#409EFF"
			@select="selectIndex">
			<sidebar-item :routes="menus"></sidebar-item>
		</el-menu>
	</scroll-bar>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import ScrollBar from '../ScrollBar'
import SidebarItem from './SidebarItem'
export default {
	name: 'sideBar',
	computed: {
		...mapGetters([
			'menus',
			'sidebar'
		]),
		isCollapse() {
			return !this.sidebar.opened
		}
	},
	methods: {
		selectIndex(index) {
			this.$router.push({name: index})
		}
	},
	components: { 
		ScrollBar,
		SidebarItem
	}
}
</script>