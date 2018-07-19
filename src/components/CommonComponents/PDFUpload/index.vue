<template>
	<div class="imgUpload clearfix">
		<div class="imgLi" :style="{'width': width+'px','height': height+'px'}" v-if="file">
			<img src="../../../assets/imgs/pdf.svg">
			<div class="controller">
				<div class="controllerBtn">
					<a class="perviewBtn" target="_blank" :href="imgUrl + file"></a>
					<div class="delBtn" @click.stop="delImg()" v-if="!isPreview"></div>
				</div>
			</div>
		</div>
		<div class="addBtn" :style="{'width':width+'px','height':height+'px'}" v-else>
			<div class="addIcon">
				<i style="font-size: 30px; position: relative; top: 10px" class="el-icon-plus avatar-uploader-icon"></i>
			</div>
			<input type="file" name="" @change.stop="addImg" ref="uploadFile"/>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
import { Message } from 'element-ui'
import { formDataReq } from '../../../common/utils'
export default {
    props: {
        width: {
            type: Number,
            default: 100
        },
        height: {
            type: Number,
            default: 100
        },
        file: {
            type: String,
            default: ''
        },
        isPreview: {
        	type: Boolean,
        	default: false
        }
    },
    data() {
        return {
        }
	},
    methods: {
        addImg(e) {
            if (this.$refs.uploadFile.value != '') {
                const arr = this.$refs.uploadFile.files[0].name.split('.')
                const suffix = arr[arr.length-1].toLowerCase()
                if (suffix != 'pdf') {
                    Message.error('文件格式只支持pdf！')
                    return
                }
                this.uploadFile(this.$refs.uploadFile.files[0])
                this.$refs.uploadFile.value = ''
            }
        },
        uploadFile(data) {
            const url = `${this.fileApi}/upload/single`
            const headers = {'Content-type':'multipart/form-data;charset=UTF-8'}
            const params = formDataReq({ "file": data })
            // axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
            axios.post(url, params, headers).then(res => {
                this.$emit('fileUrlBack', res.data.data)
            }).catch(err => {
                console.log('服务器异常' + err)
            })
		},
        delImg() {
            this.$emit('fileUrlBack', '')
        }
    }
}
</script>
<style lang="stylus" scoped>
	.imgUpload
		.imgLi
			float left
			border 1px solid #f0f0f0
			border-radius 6px
			text-align center
			position relative
			margin 0 5px 5px 0
			.controller
				position absolute
				top 0
				left 0
				width 100%
				height 100%
				border-radius 6px
				background-color rgba(0, 0, 0, .5)
				display none
				.controllerBtn
					position absolute
					left 0
					top 0
					right 0
					bottom 0
					margin auto
					width 80px
					height 40px
					cursor pointer
					display flex
					.perviewBtn
						flex 1
						width 40px
						height 40px
						background-image url('./imgs/perview.png')
						background-repeat no-repeat
						background-size 26px
						background-position center
					.delBtn
						flex 1
						width 40px
						height 40px
						background-image url('./imgs/trush.png')
						background-repeat no-repeat
						background-size 26px
						background-position center
			img
				display block
				width 100%
				height 100%
				border-radius 6px
			&:hover
				.controller
					display block
		.addBtn
			float left
			border 1px dashed #d9d9d9
			border-radius 6px
			color #8c939d
			position relative
			text-align center
			margin 0 5px 5px 0
			&:hover
				border-color #409eff
			.addIcon
				position absolute
				left 0
				top 0
				right 0
				bottom 0
				margin auto
				width 100%
				height 52px
			input
				display block
				width 100%
				height 100%
				opacity 0
.userFace
	.imgLi
		margin 0
</style>