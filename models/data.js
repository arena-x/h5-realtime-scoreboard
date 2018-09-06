var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Data Model
 * ==========
 */
var Data = new keystone.List('Data', {
	autokey: { from: 'name', path: 'Data' },
});

Data.add({
	name: { type: Types.Select,
		label: '姓名',
		options: [
			{ value: '云鹤', label: '云鹤' },
			{ value: '光亮', label: '光亮' },
			{ value: '张斌', label: '张斌' },
			{ value: '汪沁', label: '汪沁' },
			{ value: '小乔', label: '小乔' },
			{ value: '化波', label: '化波' },
			{ value: '朱小斌', label: '朱小斌' },
			{ value: '殷浩', label: '殷浩' },
			{ value: '戴顺', label: '戴顺' },
			{ value: '贾三', label: '贾三' },
			{ value: 'Asher', label: 'Asher' },
			{ value: '张旭', label: '张旭' },
			{ value: '姵熙', label: '姵熙' },
			{ value: '成桐', label: '成桐' },
			{ value: '卡卡西', label: '卡卡西' },
			{ value: 'James', label: 'James' },
			{ value: '赫连', label: '赫连' },
			{ value: '老孟', label: '老孟' },
			{ value: '卫东', label: '卫东' },
			{ value: '陆嘉', label: '陆嘉' },
			{ value: '晓捷', label: '晓捷' },
			{ value: '龙龙', label: '龙龙' },
			{ value: '二喜', label: '二喜' },
			{ value: '米兰达', label: '米兰达' },
		],
		required: true,
		index: true,
	},
	sport: {
		type: Types.Select,
		label: '项目',
		options: [
			{ value: 'zq', label: '五人制足球' },
			{ value: 'ymq', label: '羽毛球混双' },
			{ value: 'sj', label: '射箭锦标赛' },
			{ value: 'zxc', label: '户外自行车骑行' },
			{ value: 'fb', label: '飞镖' },
			{ value: 'trx', label: '瑜伽TRX' },
			{ value: 'zbw', label: '尊巴舞' },
			{ value: 'ms', label: '马术' },
		],
		required: false,
		index: true,
	},
	team: {
		type: Types.Select,
		label: '所属团队',
		options: [
			{ value: 'yellow', label: '小黄人组' },
			{ value: 'blue', label: '蓝精灵组' },
		],
		required: false,
		index: true,
	},
	score: { type: Types.Number, label: '总得分', required: false, index: true, default: '' },
	newscore: { type: Types.Number, label: '新增得分', required: false, index: true, default: '' },
});

/**
 * Registration
 */
Data.defaultColumns = 'name, sport, team, score, newscore';
Data.register();
