const timerMap = {}

export default {
	//倒计时
	//params: {
	//	el: 原生dom元素，显示倒计时的
	//	time: 倒计时的数字，不能小于0，默认60
	//	callback: 倒计时结束后的回调
	//	step: 间隔，单位：毫秒 ，默认为1000,
	//	text: 数字后面显示的文本内容
	//}
	go: function (params) {
		if (typeof params.time != 'number' || params.time <= 0) {
			params.time = 60;
		}
		params.time = params.time || 60;
		typeof params.beforeStart == 'function' && params.beforeStart();
		let tickerKey = params.el.getAttribute('ticker') || params.el.getAttribute('accesskey')
		this.stop(tickerKey);
		timerMap[tickerKey] = setInterval(function () {
			if (params.time > 0) {
				params.time--;
				params.el.innerText = params.time + (params.text || '');
				typeof params.getNowTime == 'function' && params.getNowTime(params.time);
			} else {
				clearInterval(timerMap[tickerKey]);
				try {
					typeof params.callback == 'function' && params.callback();
				} catch (e) { }
			}
		}, params.step || 1000);
	},

	//停止某个计时器
	//key: 元素的ticker属性值或accessKey值（或者HTML元素对象）
	stop: function (key) {
		if (typeof key !== 'string') {
			key = key.getAttribute('ticker') || key.getAttribute('accesskey')
		}
		clearInterval(timerMap[key]);
	},

	//停止所有的计时器
	clear: function () {
		$$whzxLog.info('停止所有的定时器')
		for (let k in timerMap) {
			clearInterval(timerMap[k])
		}
	},

	// 显示时间
	// el: 原生dom元素，显示时间的，要有一个ticker属性
	// time: 指定开始的时间，时间戳或Date对象
	// format: 要展示的日期格式，例如：yyyy-MM-dd hh:mm等等
	showTime: function (config) {
		if (typeof config.time === 'number') {
			config.time = new Date(config.time)
		} else if (Object.prototype.toString.call(config.time) !== '[object Date]') {
			config.time = new Date()
		}
		!config.format && (config.format = 'yyyy-MM-dd hh:mm:ss')
		let tickerKey = config.el.getAttribute('ticker')
		this.stop(tickerKey)
		config.el.innerText = config.time.Format(config.format)
		timerMap[tickerKey] = setInterval(function () {
			config.time.setSeconds(config.time.getSeconds() + 1)
			config.el.innerText = config.time.Format(config.format)
		}, 1000);
	},

	// callback: 每次的回调，参数：{count, ticker, config}
	// ticker: 名称
	// step: 多久执行一次，单位：毫秒，默认1000
	// stopCount: 多少次后停止，默认不会停止
	// endCallback: 结束时的回调
	ticker: function (config) {
		this.stop(config.ticker)
		config.count = config.count || 1
		config.stopCount = config.stopCount || -1
		timerMap[config.ticker] = setInterval(() => {
			if (config.stopCount != -1 && config.count >= config.stopCount) {
				this.stop(config.ticker)
				typeof config.endCallback === 'function' && config.endCallback()
			} else {
				typeof config.callback === 'function' && config.callback(config.count, config.ticker, config)
			}
			config.count++
		}, config.step || 1000)
	}
}