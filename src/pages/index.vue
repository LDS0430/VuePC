<template>
	<div class="index-wrap">
		<div class="index-left">
			<div class="index-left-block">
				<h2>全部产品</h2>
				<template v-for="product in productList">
					<h3>{{product.title}}</h3>
					<ul>
						<li v-for="item in product.list">
							<a :href="item.url">{{item.name}}</a>
							<span v-if="item.hot" class="hot-tag">HOT</span>
						</li>
					</ul>
					<div v-if="!product.last" class="hr"></div>
				</template>
			</div>
			<div class="index-left-block lastest-news">
				<h2>最新消息</h2>
				<ul>
					<li v-for="item in getNewsList">
						<a :mhref="item.url" class="new-item">{{item.title}}</a>
					</li>
				</ul>
			</div>
		</div>

		<div class="index-right">
			<slider-show :slides="slides" :inv="slideSpeed" @onchange="doSomethingOnSlideChange()"></slider-show>
			<div class="index-board-list">
				<div v-for="(item,index) in boardList" class="index-board-item" :class="[{'line-last':index % 2 !== 0},'index-board-'+item.id]">
					<div class="index-board-item-inner">
						<h2>{{item.title}}</h2>
						<p>{{item.description}}</p>
						<div class="index-board-button">
							<a :href="item.toKey" class="button">立即购买</a>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import sliderShow from '../components/slideShow'
	export default {
		methods: {
			doSomethingOnSlideChange() {
				console.log("doSomethingOnSlideChange things run!")
			}
		},
		components: {
			sliderShow
		},
		created: function() {
			this.$http.get('http://localhost:3000/getNewsList')
				.then((response) => {
					this.getNewsList = response.body
				})
				
		},
		data() {
			return {
				slideSpeed: 5000,
				slides: [{
						src: require('../assets/slideShow/pic1.jpg'),
						title: 'xxx1',
						href: 'datail/analysis'
					},
					{
						src: require('../assets/slideShow/pic2.jpg'),
						title: 'xxx2',
						href: 'datail/count'
					},
					{
						src: require('../assets/slideShow/pic3.jpg'),
						title: 'xxx3',
						href: 'datail/publish'
					},
					{
						src: require('../assets/slideShow/pic4.jpg'),
						title: 'xxx4',
						href: 'datail/forecast'
					}
				],
				getNewsList: [],
				boardList: [{
						title: '开放产品',
						description: '开放产品是一款开放产品',
						id: 'car',
						toKey: 'datail/count',
						saleout: false
					},
					{
						title: '品牌营销',
						description: '品牌营销帮助你的产品更好地找到定位',
						id: 'earth',
						toKey: 'datail/analysis',
						saleout: false
					},
					{
						title: '使命必达',
						description: '使命必达快速迭代永远保持最前端的速度',
						id: 'loud',
						toKey: 'datail/forecast',
						saleout: true
					},
					{
						title: '勇攀高峰',
						description: '帮你勇闯高峰，到达事业的顶峰',
						id: 'hill',
						toKey: 'datail/publish',
						saleout: false
					}
				],

				productList: {
					pc: {
						title: 'PC产品',
						list: [{
								name: '数据统计',
								url: 'datail/count'
							},
							{
								name: '数据预测',
								url: 'datail/forecast'
							},
							{
								name: '流量分析',
								url: 'datail/analysis',
								hot: true
							},
							{
								name: '广告发布',
								url: 'datail/publish'
							}
						]
					},
					app: {
						title: '移动产品',
						last: true,
						list: [{
								name: '91助手',
								url: 'http://weixin.com'
							},
							{
								name: '产品助手',
								url: 'http://twitter.com',
								hot: true
							},
							{
								name: '智能地图',
								url: 'http://maps.com'
							},
							{
								name: '团队语音',
								url: 'http://phone.com'
							}
						]
					}
				}
			}
		}
	}
</script>

<style scoped>
	/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
	
	.index-wrap {
		width: 1200px;
		margin: 0 auto;
		overflow: hidden;
	}
	
	.index-left {
		float: left;
		width: 300px;
		text-align: left;
	}
	
	.index-right {
		float: left;
		width: 900px;
	}
	
	.index-left-block {
		margin: 15px;
		background: #fff;
		box-shadow: 0 0 1px #ddd;
	}
	
	.index-left-block .hr {
		margin-bottom: 20px;
	}
	
	.index-left-block h2 {
		background: #4fc08d;
		color: #fff;
		padding: 10px 15px;
		margin-bottom: 20px;
	}
	
	.index-left-block h3 {
		padding: 0 15px 5px 15px;
		font-weight: bold;
		color: #222;
	}
	
	.index-left-block ul {
		padding: 10px 15px;
	}
	
	.index-left-block li {
		padding: 5px;
	}
	
	.index-board-list {
		overflow: hidden;
	}
	
	.index-board-item {
		float: left;
		width: 400px;
		background: #fff;
		box-shadow: 0 0 1px #ddd;
		padding: 20px;
		margin-right: 20px;
		margin-bottom: 20px;
	}
	
	.index-board-item-inner {
		min-height: 125px;
		padding-left: 120px;
	}
	
	.index-board-car .index-board-item-inner {
		background: url(../assets/images/1.png) no-repeat;
	}
	
	.index-board-loud .index-board-item-inner {
		background: url(../assets/images/2.png) no-repeat;
	}
	
	.index-board-earth .index-board-item-inner {
		background: url(../assets/images/3.png) no-repeat;
	}
	
	.index-board-hill .index-board-item-inner {
		background: url(../assets/images/4.png) no-repeat;
	}
	
	.index-board-item h2 {
		font-size: 18px;
		font-weight: bold;
		color: #000;
		margin-bottom: 15px;
	}
	
	.line-last {
		margin-right: 0;
	}
	
	.index-board-button {
		margin-top: 20px;
	}
	
	.lastest-news {
		min-height: 512px;
	}
	
	.hot-tag {
		background: red;
		color: #fff;
		font-size: 8px;
		border-radius: 3px;
	}
	
	.new-item {
		display: inline-block;
		width: 230px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>