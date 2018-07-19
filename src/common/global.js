export default function install(Vue) {
	// 图片地址
	Vue.prototype.imgUrl = process.env.IMG_URL
	// Vue.prototype.imgUrlMini = process.env.IMG_API + '/image/uploads_mini'
	// 图片api地址
	Vue.prototype.imgApi = process.env.IMG_API + '/image'
	Vue.prototype.fileApi = process.env.IMG_API + '/file'
}