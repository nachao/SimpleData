var fs = require('fs');


/* 潜在问题：问题在频繁的写入时，因为是覆盖式的，因此可能会导致同时写入时，会报错。解决方案：数据存入变量中，当有数据变更时，先修改变量，然后延迟一秒后写入到文件中。这样几遍是同时更新数据，也会列队修改变量中，等修改完成后才写入到文件中。 */


/**====
*  工具 - 内部使用
**/
var Tool = {

	// 缓存
	cookies: {},

	// 读取文件延迟
	delayed: {},

	// 路径
	root: function ( option ) {
		return './Datas/' + option.table + '.json'
	},

	// 读取文件
	read: function ( option ) {
		var result = [];

		if ( this.cookies[option.table] ) {
			result = this.cookies[option.table];
		}
		else if ( fs.existsSync(this.root(option)) ) {
			result = fs.readFileSync(this.root(option), 'utf-8');

			if ( result ) {
				result = JSON.parse(result);
			}
			else {
				result = [];
			}

			this.cookies[option.table] = result;
		}

		return result;
	},

	// 写入文件
	write: function ( option, data ) {
		var path = this.root(option);

		this.cookies[option.table] = data;

		// 始终演示更新数据文件
		if ( this.delayed[option.table] ) {
			clearTimeout(this.delayed[option.table]);
		}
		this.delayed[option.table] = setTimeout(function(){
			if ( fs.existsSync(path) ) {
				fs.writeFile(path, JSON.stringify(data));
			}
		}, 1000);
	},

	// 对数据进行功能初始化
	// data {array} = 数据集
	// table {string} = 数据名
	// key {string} = 数据主键
	init: function ( option ) {
		var data = this.read(option);

		// 判断是否扩展过
		if ( data.expand ) {
			return data;
		}
		else {
			return Object.defineProperties(data, {

				// 同一个数组对象只需被扩展一次
				'expand': {
					value: true
				},

				// 查询功能
				'select': {
					value: function ( callback ) {
						var result = this;

						if ( typeof callback == 'function' ) {
							result = result.filter(callback);
						}

						return result;
					}
				},

				// 添加功能
				'add': {
					value: function ( value ) {
						var data = this;

						if ( typeof value == 'object' ) {

							// 主键（递增） 
							if ( data.length > 0 ) {
								option.def[option.key] = parseInt(data[data.length-1][option.key]) + 1;
							}
							else {
								option.def[option.key] = 1;
							}

							// 完善键值，加入默认值
							value = Object.assign({}, Object.assign(option.def, value));

							data.push(value);
							Tool.write(option, data);
						}

						return value;
					}
				},

				// 更新功能
				'update': {
					value: function ( callback ) {
						var result = this;

						if ( typeof callback == 'function' ) {
							result = result.map(callback);
							Tool.write(option, result);
						}

						return result;
					}
				},

				// 删除功能
				'delete': {
					value: function ( callback ) {
						var result = this;

						if ( typeof callback == 'function' ) {
							result = this.filter(function( value ){
								return !callback(value);
							});
							Tool.write(option, result);
						}

						return result;
					}
				},

				// 重置表
				'reset': {
					value: function ( value ) {
						if ( value === 'yes' ) {
							Tool.write(option, []);
						}
						return true;
					}
				}
			});
		}
	}
};



exports.module = function () {
	var result = {};

	Object.defineProperties(result, {

		// 用户表
		// 'account': {
		// 	enumerable: true,
		// 	get: function () {

		// 		// 初始化表以及获取数据方式，以及数据标准（详见接口文档）。
		// 		return Tool.init({
		// 			table: 'account',
		// 			key: 'account_id',
		// 			def: {
		// 				"account_id"	:"",
		// 				"account_no"	:"",
		// 				"account_name"	:"",		// 昵称
		// 				"name"			:"",		// 姓名
		// 				"sex"			:"male",
		// 				"mobile"		:"",
		// 				"landline"		:"",
		// 				"email"			:"",
		// 				"is_admin"		:false,
		// 				"image_url"		:"",

		// 				// 附加	
		// 				'init_pwd' 		:new Date().getTime().toString(16).substr(-6),
		// 				'pwd_status' 	:0,
		// 			}
		// 		})
		// 	}
		// },

		// 管理表
		'table_list': {
			enumerable: true,
			get: function () {

				// 初始化表以及获取数据方式，以及数据标准（详见接口文档 1.15）。
				return Tool.init({
					table: 'table_list',
					key: 'id',
					def: {
						"id"	:"",

						// 必填
						"name"	:"",
						'keys'	:'',
					}
				})
			}
		},

		// 公司与公司的关系表
		// 'company_relation': {
		// 	enumerable: true,
		// 	get: function () {
		// 		return Tool.init({
		// 			table: 'company_relation',
		// 			key: 'id',
		// 			def: {
		// 				"id"					:"",	// 唯一主键，递增

		// 				// 必填
		// 				"seller_company_id"		:"",	// 服务公司ID
		// 				"custom_company_id"		:""		// 客户公司ID
		// 			}
		// 		})
		// 	}
		// },

		// 公司与用户的关系表
		// 'company_member': {
		// 	enumerable: true,
		// 	get: function () {
		// 		return Tool.init({
		// 			table: 'company_member',
		// 			key: 'id',
		// 			def: {
		// 				"id"			:"",	// 唯一主键，递增

		// 				// 必填
		// 				"company_id"	:"",	// 公司ID
		// 				"account_id"	:"",	// 账号ID
		// 				"job"			: 1,	// 关系 0 = 管理员，1 = 内部成员, 2 = 外部负责人员
		// 			}
		// 		});
		// 	}
		// },

		// 项目表
		// 'project': {
		// 	enumerable: true,
		// 	get: function () {
		// 		return Tool.init({
		// 			table: 'project',
		// 			key: 'project_id',
		// 			def: {
		// 				// 自增
		// 				"project_id"	: 0,

		// 				// 必填
		// 				"project_name" 	: "",
		// 				'province_id' 	: 0,
		// 				'city_id' 		: 0,

		// 				// 可选
		// 				"system_num" 		: 0,
		// 				"province_id" 		: 0,
		// 				"city_id" 			: 0,
		// 				"project_landline" 	: '',
		// 				"project_website"	: '',
		// 				"contact_person"	: '',
		// 				"address" 			: '',
		// 				"project_zipcode" 	: '',
		// 				"email" 			: '',
		// 				"contact_person_mobile"		: '',
		// 				"contact_person_landline"	: ''
		// 			}
		// 		});
		// 	}
		// },

		// 项目和公司的关系表
		// 'project_company_relation': {
		// 	enumerable: true,
		// 	get: function () {
		// 		return Tool.init({
		// 			table: 'project_company_relation',
		// 			key: 'id',
		// 			def: {
		// 				"id"			: 0,	// 递增

		// 				// 必填
		// 				"project_id" 	: 0,
		// 				"company_id" 	: 0
		// 			}
		// 		});
		// 	}
		// },

		// 项目和工程师（用户）的关系表
		// 目前项目全部关联的用户都是，对项目负责的人员
		// 'project_engineer_relation': {
		// 	enumerable: true,
		// 	get: function () {
		// 		return Tool.init({
		// 			table: 'project_engineer_relation',
		// 			key: 'id',
		// 			def: {
		// 				"id"			: 0,	// 递增

		// 				// 必填
		// 				"project_id" 	: 0,
		// 				"account_id" 	: 0,

		// 				// 可选
		// 				"permission"	: 1,	// 负责 1 = 负责，2 = 仅查看，3 = 不参与
		// 			}
		// 		});
		// 	}
		// }
	});

	return result;
}
