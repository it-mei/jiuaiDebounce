export default {
	keyList: {},
	canDoFunction(b = {}) {
		this.keyList[b.key] ? b.fail && b.fail() : (this.lockKey(b.key), b.success && b.success(), b.time && setTimeout(() => {
			this.releaseKey(b.key)
		}, b.time))
	},
	releaseKey(b) {
		delete this.keyList[b]
	},
	lockKey(b) {
		this.keyList[b] = !0
	}
};
