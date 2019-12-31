<template>
	<view class="big-box">
		
		
		<view class="type-box">
			<view class="big-title">
				名词解释
			</view>
			<view class="info">节流模式，锁定事件后无法触发，解锁后才可以触发</view>
			<view class="info1">1.传入time字段为指定时间后自动解锁</view>
			<view class="info1">2.不传time字段，需要执行this.$jiuaiDebounce.releaseKey(key)来解锁，用于请求结束后解锁这种</view>
			<view class="info1">3.传入immediate字段为true，则会立即执行一次，默认为true</view>
			<view class="info1">4.传入immediate字段为false，则不会立即执行，time结束后才会执行，理解为延时执行</view>
			<view class="info1">5.由于节流模式，不传时间，且非立即执行，所以没有无time且不立即执行这种模式</view>
			
			<view class="info">防抖模式</view>
			<view class="info1">1.如果不传time则默认time字段为300毫秒</view>
			<view class="info1">2.传入immediate字段为true，则会立即执行一次，time结束后会再执行一次，默认为true</view>
			<view class="info1">3.传入immediate字段为false，则不会立即执行，time结束后才会执行，理解为延时执行</view>
			
			<view class="info3">注意：请查看console，如事件写了fail回调，则重复提交时，被锁定的事件会执行fail回调</view>
		</view>
		
		<view class="type-box">
			<view class="big-title">
				节流模式↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
			</view>
			<view class="info">由于节流模式，不传时间，且非立即执行，所以没有无time且不立即执行这种模式</view>
			<view class="line">
				<button @click="jieliuTime">节流time（非立即执行）配置了3000毫秒后执行</button>
			</view>
			<view class="line">
				<button @click="jieliuTimeImmediate">节流time（立即执行）配置了3000毫秒后才能再次执行</button>
			</view>
			<!-- <view class="line">
				<button @click="jieliuNoTime">节流无time（非立即执行）</button>
			</view> -->
			<view class="line">
				<button @click="jieliuNoTimeImmediate">节流无time（立即执行）</button>
				<button @click="unLock('jieliuNoTimeImmediate')">解锁左侧被锁定的事件</button>
			</view>
		</view>
		
		<view class="type-box">
			<view class="big-title">
				防抖模式↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
			</view>
			<view class="info">由于防抖模式，不传时间，setTimeout默认为下一次操作就执行，所以这里默认了300毫秒，不存在不传time的模式</view>
			<view class="line">
				<button @click="fangdouTime">防抖time（非立即执行）300毫秒后才会执行</button>
			</view>
			<view class="line">
				<button @click="fangdouTimeImmediate">防抖time（立即执行）300毫秒后再次执行</button>
			</view>
		</view>
		
		
		<view class="type-box">
			<view class="big-title">
				混合使用↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
			</view>
			<view class="info">例如，立即支付与取消订单，不同方法传入相同的key，可以做到混合拦截</view>
			<view class="line">
				<button @click="payOrder">立即支付</button>
			</view>
			<view class="line">
				<button @click="cancelOrder">取消订单</button>
			</view>
		</view>
		
	</view>
</template>

<!-- type
immediate
key
time -->


<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			jieliuTime(){//节流time（非立即执行）
				this.$jiuaiDebounce.canDoFunction({
					type:'jieliu',
					immediate:false,
					key:'jieliuTime',
					time:3000,
					success:()=>{
						this.showMsg('由于我传了time，并且非立即执行，所以我在time时间（当前配置为3秒）后触发了')
					}
				})
			},
			jieliuTimeImmediate(){//节流time（立即执行）
				this.$jiuaiDebounce.canDoFunction({
					type:'jieliu',
					immediate:true,
					key:'jieliuTimeImmediate',
					time:3000,
					success:()=>{
						this.showMsg('由于我传了time，并且立即执行，所以我被console了，且time时间内（3000毫秒）不会重复触发')
					}
				})
			},
			jieliuNoTimeImmediate(){//节流无time（立即执行）
				this.$jiuaiDebounce.canDoFunction({
					type:'jieliu',
					immediate:true,
					key:'jieliuNoTimeImmediate',
					success:()=>{
						this.showMsg('由于我没有传time，并且立即执行，所以我被console了，且time时间内（3000毫秒）不会重复触发')
					}
				})
			},
			fangdouTime(){//防抖time（非立即执行）
				this.$jiuaiDebounce.canDoFunction({
					type:'fangdou',
					immediate:false,
					key:'fangdouTime',
					time:300,
					success:()=>{
						this.showMsg('由于我非立即执行，所以我被console了，且time时间内（300毫秒）不会重复触发，这期间就不会被触发了，期间点击，会重新刷新time时间的定时器')
					}
				})
			},
			fangdouTimeImmediate(){//防抖time（立即执行）
				this.$jiuaiDebounce.canDoFunction({
					type:'fangdou',
					immediate:true,
					key:'fangdouTimeImmediate',
					time:300,
					success:()=>{
						this.showMsg('由于我立即执行，所以我立刻被console了，且time时间后（300毫秒）我还会被触发一次，这期间就不会被触发了，期间点击，会重新刷新time时间的定时器')
					}
				})
			},
			unLock(key){
				this.$jiuaiDebounce.releaseKey(key)
			},
			payOrder(){//支付订单
				this.$jiuaiDebounce.canDoFunction({
					time:3000,
					key:"orderAction",
					success:()=>{
						uni.showToast({
							title:'支付订单'
						})
					},
					fail:()=>{
						console.log('频繁操作')
					}
				})
			},
			cancelOrder(){//取消订单
				this.$jiuaiDebounce.canDoFunction({
					time:3000,
					key:"orderAction",
					success:()=>{
						uni.showToast({
							title:'取消订单'
						})
					},
					fail:()=>{
						console.log('频繁操作')
					}
				})
			},
			showMsg(str){
				uni.showToast({
					title:'请查看控制台的console'
				})
				console.log(str)
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50upx;
	}

	.button-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
	.line{
		font-size: 24upx;
		display: flex;
		align-items: center;
		margin-bottom: 10upx;
		text-align: left;
	}
	.btn{
		display: inline-block;
		width: 100upx;
		font-size: 24upx;
		padding: 0;
		margin: 0 10upx;
	}
	.type-box{
		background-color: #F1F1F1;
		margin: 5vw 0;
		padding: 5vw;
	}
	.big-box{
		padding: 5vw;
	}
	button{
		display: inline-block;
		font-size: 20upx;
	}
	.big-title{
		font-size: 30upx;
		margin-bottom: 10upx;
	}
	.info{
		font-size: 20upx;
		color: #DD524D;
		margin-bottom: 10upx;
	}
	.info1{
		font-size: 20upx;
		color: #000000;
		margin-bottom: 10upx;
	}
	.info3{
		color:#ff0000;
		font-size: 40upx;
	}
</style>
