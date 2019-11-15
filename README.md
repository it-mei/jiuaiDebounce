# jiuaiDebounce
防重复提交，防抖函数

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
