```
// 概念说明：
// 防抖：就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
// 节流：就是指连续触发事件但是在 n 秒中只执行一次函数。

//参数说明
// type (fangdou防抖模式/jieliu节流模式),默认节流(因为上一版用的是节流)
// immediate  是否需要立即执行(true立即执行/false不立即执行),默认立即执行
// key 防抖的关键词(用于标记防抖的关键词,可以通过此关键词连链接任意的事件,比如用户点击立即付款,非常快的又点击了取消订单,两个方法传同样的key即可解决)
// time  防抖时间(多少时间内生效(防抖模式(默认300ms)/节流模式(默认不锁定,需要手动解锁))),

```

在main.js中引入jiuai-debounce.js文件，并注入vue实例中

```
//main.js 中引入 sdk，并挂载在Vue实例上

import jiuaiDebounce from '@/js_sdk/jiuai-debounce/jiuai-debounce.js'
Vue.prototype.$jiuaiDebounce=jiuaiDebounce;

```
需要使用的地方如下使用

```
//时间模式：一定时间内禁止重复调用模式（例：3秒内禁止重复执行）
this.$jiuaiDebounce.canDoFunction({
	key:"事件名",//基于此值判断是否可以操作，如两个方法传入了同样的key，则会混淆，建议传入调用此事件的方法名，简单好梳理
	time:3000,//如果传入time字段，则为定时器后，自动解除锁定状态，单位（毫秒）
	success:()=>{//成功中调用应该操作的方法，被锁定状态不会执行此代码块内的方法
		console.log('我被点击了')
	}
})

//js解锁模式：防重复请求（例：请求成功/失败后执行），不传time字段，或者time字段==false时是此逻辑
在需要解锁的时候，调用this.$jiuaiDebounce.releaseKey("事件名")；来解除事件锁定
this.$jiuaiDebounce.canDoFunction({
	key:"事件名",
	success:()=>{//成功中调用应该操作的方法，被锁定状态不会执行此代码块内的方法
		uni.request({
			success:()=>{
				//this.$jiuaiDebounce.releaseKey("事件名")
			},
			fail:()=>{
				//this.$jiuaiDebounce.releaseKey("事件名")
			},
			complete:()=>{
				//this.$jiuaiDebounce.releaseKey("事件名")
			}
		})
	}
})
```