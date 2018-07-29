<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">查看会员订单</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="会员">
							<p>{{order.member && order.member.name}}</p>
						</el-form-item>
						<el-form-item label="订单号">
							<p>{{order.orderNo}}</p>
						</el-form-item>
						<el-form-item label="名称">
							<p>{{order.product && order.product.name}}</p>
						</el-form-item>
						<el-form-item label="价格">
							<p>{{order.totalPrice}}</p>
						</el-form-item>
						<el-form-item label="所属门店">
							<p>{{order.store.name}}</p>
						</el-form-item>
						<el-form-item label="状态">
							<p>{{order.status == 'success' ? '支付成功' : '支付失败'}}</p>
						</el-form-item>
						<el-form-item label="下单时间">
							<p>{{new Date(order.createTime).getTime() | getdatefromtimestamp()}}</p>
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
import Order from '../../../api/Order'
export default {
	data() {
		return {
			order: {
				store: {}
			}
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		getInfo() {
			const orderId = this.$route.query.orderId
			Order.findById({ orderId }).then(res => {
				this.order = res
			})
		},
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
