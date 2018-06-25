<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">查看会员订单</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="10" :offset="6">
						<el-form-item label="会员">
							<p>{{order.memberName}}</p>
						</el-form-item>
						<el-form-item label="订单号">
							<p>{{order.orderNo}}</p>
						</el-form-item>
						<el-form-item label="名称">
							<p>{{order.name}}</p>
						</el-form-item>
						<el-form-item label="描述">
							<p>{{order.info}}</p>
						</el-form-item>
						<el-form-item label="价格">
							<p>{{order.price}}</p>
						</el-form-item>
						<el-form-item label="状态">
							<p>{{order.status}}</p>
						</el-form-item>
						<el-form-item label="下单时间">
							<p>{{order.sale_time | getdatefromtimestamp()}}</p>
						</el-form-item>
						<el-form-item>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			order: {
				memberName: '王五',
				orderNo: '201806091234567788',
				name: '正姿舞蹈',
				info: '10节课体验卡',
				price: 200,
				status: '支付成功',
				sale_time: new Date().getTime()
			}
		}
	},
	methods: {
		back() {
			this.$router.go(-1)
		}
	}
}
</script>

<style lang="stylus" scoped>
.el-form-item__content
	p
		margin 0
		border 1px solid #fff
		border-bottom-color #dcdfe6
		padding 0 15px
		min-height 40px
		font-family 'sans-serif'
		line-height 40px
		color #999
	.el-input__inner
		vertical-align top
</style>
