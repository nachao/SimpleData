var Tool = require('./Tool.js').module;

exports.module = function ( Mysql ) {
	return {

		// 创建表
		create: function ( param ) {
			var result = Tool.getParameterVerify(param, {
					'name'	: String,
					'keys'	: String
				});
			
			if ( result.status == 0 ) {
				result.data = Mysql.table_list.add({
					id: new Date().getTime().toString(16),
					name: param.name,
					keys: param.keys //'[{key:"asd", type:"int", def:"1"}]'
				});
			}

			return result;
		}
	}
}