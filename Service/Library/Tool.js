// var print = require('../../console.js').print;

exports.module = {

	// 状态码以及提示语
	getStatus: function ( value, result, data ) {
		var define = {
				0: '',
				11: 'Interface parameter is not standard!',
				21: '没有相关数据！',

				31: '添加项目负责人失败，因为此用户以及对此项目负责！',
				32: '去除项目负责人失败，因为此用户并未对此项目负责！',

				41: '添加客户公司负责人失败，因为此用户以及对此客户公司负责！',
				42: '去除客户公司负责人失败，因为此用户并未对此客户公司负责！',
			}

		var format = {
				status: value,
				message: define[value]
			};

		if ( data != undefined ) {
			format.data = data;
		}

		if ( result ) {
			return Object.assign(result, format);
		}
		else {
			return define[value];
		}
	},


	// 接口参数验证
	// status == 11 参数有误
	getParameterVerify: function ( parameter, required, optional ) {
		var result = {
				status: 0,
				message: ''
			},
			errorNumber = 0;

		if ( typeof parameter == 'object' ) {
			
			Object.keys(parameter).map(function( key ){
				if ( Object.keys(required).indexOf(key) < 0 ) {

					// 判断可选参数
					if ( typeof optional == 'object' && Object.keys(optional).indexOf(key) > 0 ) {
					}
					else {
						errorNumber += 1;
						console.log('Redundant parameters: ' + key);
					}
				}
			});

			Object.keys(required).map(function( key ){
				if ( Object.keys(parameter).indexOf(key) < 0 ) {
					errorNumber += 1;
					console.log('Missing parameter: ' + key);
				}
				else if ( parameter[key] == undefined || parameter[key].constructor != required[key] ) {
					errorNumber += 1;
					console.log('Type error parameter: ' + key +' :: '+ typeof(parameter[key]) + ' -> ' + required[key].name.toLocaleLowerCase() );
				}
			});
		}

		if ( errorNumber > 0 ) {
			result.status = 11;
		}
		if ( result.status != 0 ) {
			result.message = this.getStatus(result.status);
		}

		return result;
	} 
}