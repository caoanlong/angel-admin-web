<template>
	<el-menu class="navbar" mode="horizontal">
		<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
		<breadcrumb class="breadcrumb-container"></breadcrumb>
		<div class="right-menu">
			<el-tooltip effect="dark" content="navbar.theme" placement="bottom"></el-tooltip>
			<el-dropdown class="avatar-container right-menu-item">
				<div class="avatar-wrapper">
					<img class="user-avatar" :src="avatar 
						? imgUrl + avatar
						: require('../../../assets/imgs/avatar.gif')">
					<span class="user-text">你好！{{name}}</span>
					<i class="el-icon-caret-bottom"></i>
				</div>
				<el-dropdown-menu slot="dropdown">
					<router-link to="/userinfo">
						<el-dropdown-item>个人资料</el-dropdown-item>
					</router-link>
					<router-link to="/updatepassword">
						<el-dropdown-item>修改密码</el-dropdown-item>
					</router-link>
					<el-dropdown-item divided>
						<span @click="logout" style="display:block;">退出</span>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '../Breadcrumb'
import Hamburger from '../Hamburger'

export default {
	components: {
		Breadcrumb,
		Hamburger
	},
	computed: {
		...mapGetters([
			'sidebar',
			'name',
			'avatar'
		])
	},
	methods: {
		toggleSideBar() {
			this.$store.dispatch('toggleSideBar')
		},
		logout() {
			this.$store.dispatch('logout').then(() => {
				this.$router.push({name: 'login'})
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
.navbar
	height 50px
	line-height 50px
	border-radius 0px !important
	.hamburger-container
		line-height 58px
		height 50px
		float left
		padding 0 10px
	.breadcrumb-container
		float left
	.errLog-container
		display inline-block
		vertical-align top
	.right-menu
		float right
		height 100%
		&:focus
		 outline none
		.right-menu-item
			display inline-block
			margin 0 8px
		.screenfull
			height 20px
		.international
			vertical-align top
		.theme-switch
			vertical-align 15px
		.avatar-container
			height 50px
			margin-right 30px
			.avatar-wrapper
				cursor pointer
				margin-top 5px
				position relative
				.user-avatar
					width 40px
					height 40px
					border-radius 20px
				.user-text
					position relative
					top -15px
					padding-left 5px
				.el-icon-caret-bottom
					position absolute
					right -20px
					top 15px
					font-size 12px
</style>
