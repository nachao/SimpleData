 /*====
  @ 说明：leng360 设备商系统管理界面的数据请求（模拟）
  @ 其他：-
====*/


// 引用
var http 	= require('http'),
	url 	= require('url'),
	qs 		= require('querystring'),
	fs 		= require('fs');

// var print = require('./console.js').print;

// 测试
// print.notice('□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□');
// print.error('□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□');
// print.show('□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□');
// print.bat('□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□');
// print.debug('□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□');





/**====
* 模拟数据库 - 数据层（每个表的规则定义，以及增删改查功能的支持）
**/
var Mysql = require('./mysql.js').module();


console.log(Mysql);




/**====
* 数据功能部件 - 基础层（对外或对内的全部API在此定义）
**/
var Foundation = {
	tool: {

		// 重置全部数据
		resetting: function () {
			for ( var key in Mysql ) {
				console.log(Mysql[key].reset('yes'), '--reset tabel finish: ' + key);
			}
		}
	},

	// 账号体系
	// account: require('./xxx/Function/Account.js').module(Mysql),

	// 企业管理
	// company: require('./xxx/Function/Company.js').module(Mysql),

	// 项目管理
	// project: require('./xxx/Function/Project.js').module(Mysql)
};





/**====
*  逻辑层 - 业务层（技术云平台的几个模块个全部功能接口，目前包括：客户管理、成员管理、产品管理、云管理、公共管理）
**/
var Module = {};


/**
*  技术云平台
**/
Module.TechnologyCloud = {

	// 缓存，当前登陆信息
	cookie: {
		company_id: 1,
		account_id: 1
	},

	// 客户管理
	// customer: require('./xxx/Module/TechnologyCloud/Customer.js').module({
	// 	Foundation: Foundation,
	// 	Module: Module
	// }),

	// 账号管理
	// account: require('./xxx/Module/TechnologyCloud/Account.js').module({
	// 	Foundation: Foundation,
	// 	Module: Module
	// }),

	// 项目管理
	// project: require('./xxx/Module/TechnologyCloud/Project.js').module({
	// 	Foundation: Foundation,
	// 	Module: Module
	// }),

	// 系统管理
	// system: require('./xxx/Module/TechnologyCloud/System.js').module({
	// 	Foundation: Foundation,
	// 	Module: Module
	// }),

	// 公共管理
	// site: require('./xxx/Module/TechnologyCloud/Site.js').module({
	// 	Foundation: Foundation,
	// 	Module: Module
	// }),

	// 设备管理
	// equipment: require('./xxx/Module/TechnologyCloud/Equipment.js').module({
	// 	Foundation: Foundation,
	// 	Module: Module
	// }),
};





/**====
*  默认缓存
**/
var cookie = Module.TechnologyCloud.cookie;









// *********************************************************************************
// *********************************************************************************
// *********************************************************************************
// *********************************************************************************

// 清空全部表

// Foundation.tool.resetting(); 
// return;



// *********************************************************************************
// *********************************************************************************
// *********************************************************************************
// *********************************************************************************


// ====
// 实例
// ====

// 创建默认工程商
// console.log( Module.TechnologyCloud.customer.addDistributor({
// 	'company_name': '测试工程商',
// 	'owner_manager_name': 'Admin',
// 	'province_id': '1',
// 	'city_id': '1'
// }) );


// 全部查询
// console.log( Mysql.account );

// 条件查询
// console.log( Mysql.account.select(function( value ){
// 	return value.account_id == 100;
// }));

// 添加
// console.log( Mysql.account.add({
// 	name: '张三'
// }));

// 更新
// console.log( Mysql.account.update(function( value ){
// 	if ( value.account_id == 101 ) {
// 		value.name = 'qqqq';
// 	}
// 	return value;
// }));

// 删除
// console.log( Mysql.account.delete(function( value ){
// 	return value.account_name == '张三';
// }) );

 // console.log( Foundation.company.createProject({
	// 'owner_id': '123',
	// 'project_name': '11111',
	// 'province_id': '1',
	// 'city_id': '1'
 // },{
 // 	'distributor_id': cookie.company_id
 // }) )


// 客户管理全部接口调试：

// console.log( Module.TechnologyCloud.customer.addOwner({
// 	company_name: '测试2'
// }) );

// console.log( Module.TechnologyCloud.customer.getDistClientList() );

// console.log( Module.TechnologyCloud.account.getOwnerCompanyInfo({ owner_id: '1' }) )

// console.log( Module.TechnologyCloud.customer.createProject({
// 	'owner_id': '14',
// 	'project_name': '11111',
// 	'province_id': '1',
// 	'city_id': '1'
// }) );

// console.log( Module.TechnologyCloud.customer.getDistProjectList() );

// console.log( Module.TechnologyCloud.account.getOwnerCompanyInfo({ owner_id: '2' }) );

// console.log( Module.TechnologyCloud.project.createProject({
// 	owner_id: '1',
// 	project_name: 'hhh',
// 	province_id: '1',
// 	city_id: '1'
// }) )

 // console.log( Module.TechnologyCloud.customer.getOwnerProjects({ owner_id: 2 }) );

// console.log( Module.TechnologyCloud.customer.getOwnerBasicInfo({ owner_id: '2' }) )

// console.log( Module.TechnologyCloud.system.getProjectBasicInfo({ project_id: '7' }) )

// console.log( Module.TechnologyCloud.project.getProjectInfo({ project_id: '10' })  );

// console.log( Module.TechnologyCloud.project.saveProjectInfo(
// {
// 	"project_name": "伊宁万吨水果冷库",
// 	"province_id": "24",
// 	"city_id": "350",
// 	"project_landline": "",
// 	"project_website": "",
// 	"contact_person": "张工",
// 	"address": "",
// 	"project_zipcode": "",
// 	"email": "",
// 	"contact_person_mobile": "1351234567811",
// 	"contact_person_landline": "",
// 	"project_id": "23"
// }
// ) );

// console.log( Module.TechnologyCloud.customer.getOwners() );

// console.log( Module.TechnologyCloud.customer.canCreateSystem() );

// console.log( Module.TechnologyCloud.account.addAccount({
// 	name: '王五',
// 	permissions:{"owners":[]}
// }) );

 // console.log( Module.TechnologyCloud.account.getAllEngineer() )

// console.log( Module.TechnologyCloud.customer.saveDistOwnerPermission(
//   	{"owner_id":"5","permission_info":"[{\"account_id\":10,\"company_permission\":4},{\"account_id\":13,\"company_permission\":4},{\"account_id\":14,\"company_permission\":6}]"}
// ) );

 // console.log( Module.TechnologyCloud.customer.getDistEngineersOfOwner({ owner_id: '3' }) );

// console.log( Module.TechnologyCloud.customer.saveOwnerPermission({
// 	owner_id:'7',
// 	permission_info:'[{"account_id":10,"project_id":20,"project_permission":1},{"account_id":10,"project_id":21,"project_permission":3}]'
// }) );

// console.log( Module.TechnologyCloud.customer.getOwnerPermission({ owner_id: '5', account_id: '10' }) );

// console.log( Module.TechnologyCloud.customer.getOwnerBasicInfo({ owner_id: '7' }) );

// console.log( Module.TechnologyCloud.project.getProjectPermission({ project_id: '23' }) );

// console.log( Module.TechnologyCloud.project.saveProjectPermission({
// 	project_id:'23', 
// 	owner_id: '9',
// 	permission_info:'[{"account_id":13,"company_permission":4,"project_permission":1}]'
// }) );









/**====
* 服务 - 展示层
**/

// 创建服务
var server = http.createServer(function (req, res) {

	// 确保请求正常
	if ( req.url == '/favicon.ico' ) 
		return;

	// console.log(req.url);

	// 获取指定的数据文件
	var filePath = '../data' + url.parse(req.url).pathname.replace('/vendor/system', ''),
		suffix = '.json';

	var statusCode = 200,
		headerDef = {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'text/plain;charset:utf-8'
		};


	// 特殊情况报错
	if ( /account\/saveAccountInfo/.test(filePath) ) {
		statusCode = 404;
	}

	// 特殊情况报错
	// if ( /account\/delAccount/.test(filePath) ) {
	// 	statusCode = 500;
	// }

	// 设置文件头
	res.writeHead(statusCode, headerDef);



	// 如果 模拟数据库 中有数据，则直接返回
	var askValue = url.parse(req.url).pathname.split('/');
	if ( Module.TechnologyCloud[askValue[1]] && Module.TechnologyCloud[askValue[1]][askValue[2]] ) {

		// print.debug(new Date());
		// print.notice(url.parse(req.url).pathname);
		// print.notice( JSON.stringify(url.parse(req.url, true).query) );

		var result = Module.TechnologyCloud[askValue[1]][askValue[2]](url.parse(req.url, true).query);
		console.log( JSON.stringify(result) );

		res.write(JSON.stringify(result));
		res.end();
	}
	else {

		// 查询是否有 json 文件存在，有的话则读取文件
		fs.exists( filePath + suffix, function ( is ) {

			// 有数据
			if ( is ) {
				fs.readFile( filePath + suffix, 'utf-8' , function ( err, data ) {

					// 提示
					// print.log('---------------------------------');
					// print.debug(new Date());
					// print.notice(url.parse(req.url).pathname);

					// if ( url.parse(req.url).query ) {
					// 	print.notice(url.parse(req.url).query);
					// }

					// 验证参数
					if ( fs.existsSync( filePath + 'V' + suffix ) ) {
						var param = qs.parse(url.parse(req.url).query);
						var paramStandard = JSON.parse(fs.readFileSync( filePath + 'V' + suffix).toString());
						var paramVerify = [];

						for ( var key in paramStandard ) {

							// 缺失参数
							if ( param[key] == undefined ) {
								paramVerify.push('missing:' + key);
							}

							// 参数类型错误
							else if ( 
								( paramStandard[key] == 'number' && ( !isFinite(param[key]) || param[key] == '' ) )
								|| ( paramStandard[key] == 'object' && ( !( typeof JSON.parse(param[key]) == 'object' ) || param[key] == '' ) )
							) {
								paramVerify.push('type error:' + key);
							}
						}

						// 判断是否有多余的参数
						for ( var key in param ) {

							// 多余参数
							if ( paramStandard[key] == undefined ) {
								paramVerify.push('strange:' + key);
							}
						}

						// 输出参数验证结果
						// if ( paramVerify.length > 0 ) {
						// 	print.error(paramVerify.join(' \\ '));
						// }
						// else {
						// 	print.notice('parameter right.');
						// }
					}

					// 输出结果
					if ( err ) {
						// print.log(err);
					}
					else {
						if ( statusCode != 200 ) {
							res.write( statusCode == 500 ? data || '网站出现技术性问题，请联系工作人员或者稍后重试尝试！。' : '' );
							res.end();
						}
						else {
							setTimeout(function(){
								res.write(data);
								res.end();
							}, 500);
						}
					}
				});

			}

			// 无数据
			else {
				res.write('');
				res.end();
			}
		});
 	}

}).listen(8080, '127.0.0.2', function ( err ) {

	console.log('http://127.0.0.2:8080 端口开启成功！');	// 提示：
});
