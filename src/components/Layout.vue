<template>
	<div class="app-wrapper clearfix" :class="{hideSidebar: !sidebar.opened}">
		<sidebar class="sidebar-container"></sidebar>
		<div class="main-container">
			<navbar></navbar>
			<tags-view></tags-view>
			<app-main></app-main>
		</div>
	</div>
</template>
<script type="text/javascript">
import Sidebar from './CommonComponents/SideBar'
import Navbar from './CommonComponents/NavBar'
import AppMain from './CommonComponents/AppMain'
import TagsView from './CommonComponents/TagsView'
export default {
	name: 'layout',
	computed: {
		sidebar() {
			return this.$store.state.app.sidebar
		}
	},
	components: {
		Navbar,
		Sidebar,
		AppMain,
		TagsView
	}
}
</script>
<style lang="stylus" scoped>
	.app-wrapper
		position relative
		height 100%
		width 100%
</style>