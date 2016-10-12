var tool = require('./Tool.js').module;

exports.module = function ( Mysql ) {
	return {

		// 创建账号
		createAccount: function ( param ) {
			var result = {
					status: 0,
					message: '',
					data: null
				};

			var account = Mysql.account,	// 获取账号数据
				accountParam = {				// 新账号数据
					'account_no': account.length == 0 ? 301000 : parseInt(account[account.length-1].account_no) + 1,
					'name': param.name
				};

			// 创建账号，并返回新创建的账号完整数据
			var newAccount = account.add(accountParam);

			// 创建公司和账号之间的关系
			if ( param.company_id ) {
				Mysql.company_member.add({
					'account_id': newAccount.account_id,
					'company_id': param.company_id,
					'job': param.job || 0	// 公司第一个关联的用户，默认为管理员
				});
			}

			result.data = newAccount;
			return result;
		}
	}
}