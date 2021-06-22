//=============================================================================
// Drill_EventContinuedEffect.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        行走图 - 持续动作效果
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventContinuedEffect +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以播放事件持续出来的各种动作。
 * ★★必须放在 MOG动作效果 插件后面★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   事件、玩家、跟随队员都可以设置效果。
 * 2.透明度为0的事件不拥有持续动作效果。
 * 3.旋转效果可以与其它动作效果叠加。但不包括透明过程。
 * 4.动作是并行的，你需要手动加格外的等待时间。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 指定人物
 * 你需要指定哪个人物，来执行你想要的动作效果：
 * 
 * 插件指令：>玩家持续效果 : 领队 : 标准闪烁 : 60 : 30
 * 插件指令：>玩家持续效果 : 指定队员 : 1 : 标准闪烁 : 60 : 30
 * 插件指令：>玩家持续效果 : 指定队员(变量) : 1 : 标准闪烁 : 60 : 30
 * 插件指令：>玩家持续效果 : 全部队员 : 标准闪烁 : 60 : 30
 *
 * 插件指令：>事件持续效果 : 本事件 : 标准闪烁 : 60 : 30
 * 插件指令：>事件持续效果 : 指定事件 : 1 : 标准闪烁 : 60 : 30
 * 插件指令：>事件持续效果 : 指定事件(变量) : 1 : 标准闪烁 : 60 : 30
 *
 * 1.指定队员，0表示领队，1表示第一个跟随者，以此类推。
 *   注意，玩家持续效果 和 事件持续效果 的指令不一样。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 指定效果
 * 指定人物后，你还可以使用下面的更多的效果设置：
 * 
 * 插件指令：>事件持续效果 : 本事件 : 标准闪烁 : 60 : 30
 * 插件指令：>事件持续效果 : 本事件 : 渐变闪烁 : 60 : 30
 * 插件指令：>事件持续效果 : 本事件 : 顺时针旋转 : 60 : 30
 * 插件指令：>事件持续效果 : 本事件 : 逆时针旋转 : 60 : 30
 * 插件指令：>事件持续效果 : 本事件 : 垂直卡片旋转 : 60 : 30
 * 插件指令：>事件持续效果 : 本事件 : 水平卡片旋转 : 60 : 30
 *
 * 1.闪烁后面的参数为 持续时长、周期（单位帧）。
 *   闪烁的周期里，假设30帧，则15帧为透明，15帧为不透明。
 * 2.旋转的参数分别为：持续时长、周期（单位帧）、旋转速度。
 *   旋转的周期里，假设30帧，则30帧图像旋转一整圈。
 *   持续60帧，则图像旋转两圈后结束。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以将上面插件指令的第一个参数直接写成"无限时间"：
 * 
 * 插件指令：>玩家持续效果 : 领队 : 标准闪烁 : 无限时间 : 30
 * 插件指令：>事件持续效果 : 本事件 : 水平卡片旋转 : 无限时间 : 30
 * 
 * 如果你要终止效果，使用下面插件指令即可。
 * 
 * 插件指令：>玩家持续效果 : 领队 : 终止持续效果
 * 插件指令：>事件持续效果 : 本事件 : 终止持续效果
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以直接添加事件注释，让一个事件永久持续某个效果。
 * 
 * 事件注释：=>事件持续效果 : 标准闪烁 : 30
 * 事件注释：=>事件持续效果 : 渐变闪烁 : 30
 * 事件注释：=>事件持续效果 : 顺时针旋转 : 30
 * 事件注释：=>事件持续效果 : 逆时针旋转 : 30
 * 事件注释：=>事件持续效果 : 垂直卡片旋转 : 30
 * 事件注释：=>事件持续效果 : 水平卡片旋转 : 30
 * 
 * 1.注释加上后，直接为无限时间。数字表示动作周期。
 *   如果要终止效果，可以使用插件指令终止。
 * 
 * -----------------------------------------------------------------------------
 * ----插件性能
 * 测试仪器：   4G 内存，Intel Core i5-2520M CPU 2.5GHz 处理器
 *              Intel(R) HD Graphics 3000 集显 的垃圾笔记本
 *              (笔记本的3dmark综合分：571，鲁大师综合分：48456)
 * 总时段：     20000.00ms左右
 * 对照表：     0.00ms  - 40.00ms （几乎无消耗）
 *              40.00ms - 80.00ms （低消耗）
 *              80.00ms - 120.00ms（中消耗）
 *              120.00ms以上      （高消耗）
 * 工作类型：   持续执行
 * 时间复杂度： o(n)*o(镜像)*o(贴图处理) 每帧
 * 测试方法：   放置10个持续动作变化的事件，在事件数量不同的地图中测。
 * 测试结果：   200个事件的地图中，平均消耗为：【85.19ms】
 *              100个事件的地图中，平均消耗为：【47.93ms】
 *               50个事件的地图中，平均消耗为：【38.16ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.插件对镜像也有效果，该测试是包括镜像一起测试的结果。
 *   由于持续变化的事件数量和消耗几乎成正比，所以放20个以上电脑就带不动了。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件分类。
 * [v1.2]
 * 优化了内部结构，并且添加了性能测试说明。
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ECE（Event_Continued_Effect）
//		临时全局变量	无
//		临时局部变量	this._drill_ECE_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//插件记录：
//		★大体框架与功能如下：
//			持续动作效果：
//				->标准闪烁
//				->渐变闪烁
//				->标准旋转（顺/逆时针）
//				->垂直卡片旋转
//				->水平卡片旋转
//				->事件注释
//				->结构优化（换成Game_Character）
//
//		★必要注意事项：
//			1.变化原理为：每帧都【固定初始值】，然后适时赋值公式变化值。
//			2.该插件限定透明度从1~255之间的变化，透明度0不操作。
//			3.由于rmmv函数中没有【Game_Character.prototype.update】，所以继承时要用【Game_CharacterBase.prototype.update】。
//			  之前继承了这个没有的函数，造成了举起物体插件出问题。
//
//		★其它说明细节：
//			1.需要改变x,y,opacity,rotation,scale_x,scale_y的值，并且毫无损失地复原。
//			  另外，对齐每一个插件指令，也是比较头疼的问题。
//			  结构并不复杂，只是内容划分太多。	
//			2.队伍透明度统一存在麻烦的地方，队长的透明度每帧都会分配给跟随者。
//			  目前只设置了播放动作的时候，透明度才不统一。
//			3.顺时针逆时针旋转，没有改变图像的圆心，仍然是xy(0.5,1)。
//			4.继承Game_Character不要用initMembers，因为follower不会调用这个方法。
//
//		★存在的问题：
//			暂无
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventContinuedEffect = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventContinuedEffect');
	
    DrillUp.g_MTE_remainTrigger = String(DrillUp.parameters['对话框弹出时是否仍然可触发'] || "true") === "true";
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _Drill_ECE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Drill_ECE_pluginCommand.call(this, command, args);
	if (command === '>玩家持续效果') { // >玩家持续效果 : 领队 : 标准闪烁 : 60 : 30
		if(args.length >= 4 ){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			if(args[5]){ var time = String(args[5]); }
			if(args[7]){ var period = Number(args[7]); }
			
			if( $gamePlayer.opacity() == 0){ return; }
			if(time == "无限时间"){
				time = 60*60*60*24*100;
			}else{
				time = Number(time);
			}
			if( temp1 == "领队" ){ 
				if( type == '终止持续效果' ){
					$gamePlayer.drill_ECE_stopEffect();
				}
				if( type == '标准闪烁' ){
					$gamePlayer.drill_ECE_playSustainingFlash(time,period);
				}
				if( type == '渐变闪烁' ){
					$gamePlayer.drill_ECE_playSustainingFlashCos(time,period);
				}
				if( type == '顺时针旋转' ){
					$gamePlayer.drill_ECE_playSustainingRotate(time,period,1);
				}
				if( type == '逆时针旋转' ){
					$gamePlayer.drill_ECE_playSustainingRotate(time,period,-1);
				}
				if( type == '垂直卡片旋转' ){
					$gamePlayer.drill_ECE_playSustainingRotateVer(time,period);
				}
				if( type == '水平卡片旋转' ){
					$gamePlayer.drill_ECE_playSustainingRotateHor(time,period);
				}
			}
			if( temp1 == "全部队员" ){ 
				if( type == '终止持续效果' ){
					$gamePlayer.drill_ECE_stopEffect();
					$gamePlayer.followers().forEach(function(f){ f.drill_ECE_stopEffect(); },this);
				}
				if( type == '标准闪烁' ){
					$gamePlayer.drill_ECE_playSustainingFlash(time,period);
					$gamePlayer.followers().forEach(function(f){ f.drill_ECE_playSustainingFlash(time,period); },this);
				}
				if( type == '渐变闪烁' ){
					$gamePlayer.drill_ECE_playSustainingFlashCos(time,period);
					$gamePlayer.followers().forEach(function(f){ f.drill_ECE_playSustainingFlashCos(time,period); },this);
				}
				if( type == '顺时针旋转' ){
					$gamePlayer.drill_ECE_playSustainingRotate(time,period,1);
					$gamePlayer.followers().forEach(function(f){ f.drill_ECE_playSustainingRotate(time,period,1); },this);
				}
				if( type == '逆时针旋转' ){
					$gamePlayer.drill_ECE_playSustainingRotate(time,period,-1);
					$gamePlayer.followers().forEach(function(f){ f.drill_ECE_playSustainingRotate(time,period,-1); },this);
				}
				if( type == '垂直卡片旋转' ){
					$gamePlayer.drill_ECE_playSustainingRotateVer(time,period);
					$gamePlayer.followers().forEach(function(f){ f.drill_ECE_playSustainingRotateVer(time,period); },this);
				}
				if( type == '水平卡片旋转' ){
					$gamePlayer.drill_ECE_playSustainingRotateHor(time,period);
					$gamePlayer.followers().forEach(function(f){ f.drill_ECE_playSustainingRotateHor(time,period); },this);
				}
			}
		}
		if(args.length >= 6 ){
			var temp1 = String(args[1]);
			var temp2 = Number(args[3]);
			var type = String(args[5]);
			if(args[7]){ var time = String(args[7]); }
			if(args[9]){ var period = Number(args[9]); }
			
			if(time == "无限时间"){
				time = 60*60*60*24*100;
			}else{
				time = Number(time);
			}
			var _followers = $gamePlayer.followers().visibleFollowers();
			_followers.unshift($gamePlayer);
			if( temp1 == "指定队员" ){
				if( temp2 < _followers.length ){
					if( _followers[temp2].opacity() == 0){
						return;
					}
					if( type == '终止持续效果' ){
						_followers[temp2].drill_ECE_stopEffect();
					}
					if( type == '标准闪烁' ){
						_followers[temp2].drill_ECE_playSustainingFlash(time,period);
					}
					if( type == '渐变闪烁' ){
						_followers[temp2].drill_ECE_playSustainingFlashCos(time,period);
					}
					if( type == '顺时针旋转' ){
						_followers[temp2].drill_ECE_playSustainingRotate(time,period,1);
					}
					if( type == '逆时针旋转' ){
						_followers[temp2].drill_ECE_playSustainingRotate(time,period,-1);
					}
					if( type == '垂直卡片旋转' ){
						_followers[temp2].drill_ECE_playSustainingRotateVer(time,period);
					}
					if( type == '水平卡片旋转' ){
						_followers[temp2].drill_ECE_playSustainingRotateHor(time,period);
					}
				}
			}
			if( temp1 == "指定队员(变量)" ){ 
				temp2 = $gameVariables.value(temp2);
				if( temp2 < _followers.length ){
					if( _followers[temp2].opacity() == 0){
						return;
					}
					if( type == '终止持续效果' ){
						_followers[temp2].drill_ECE_stopEffect();
					}
					if( type == '标准闪烁' ){
						_followers[temp2].drill_ECE_playSustainingFlash(time,period);
					}
					if( type == '渐变闪烁' ){
						_followers[temp2].drill_ECE_playSustainingFlashCos(time,period);
					}
					if( type == '顺时针旋转' ){
						_followers[temp2].drill_ECE_playSustainingRotate(time,period,1);
					}
					if( type == '逆时针旋转' ){
						_followers[temp2].drill_ECE_playSustainingRotate(time,period,-1);
					}
					if( type == '垂直卡片旋转' ){
						_followers[temp2].drill_ECE_playSustainingRotateVer(time,period);
					}
					if( type == '水平卡片旋转' ){
						_followers[temp2].drill_ECE_playSustainingRotateHor(time,period);
					}
				}
			}
		}
	}
	if (command === '>事件持续效果') { // >事件持续效果 : 本事件 : 标准闪烁 : 60 : 168
		if(args.length >= 4){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			if(args[5]){ var time = String(args[5]); }
			if(args[7]){ var period = Number(args[7]); } 
			
			if(time == "无限时间"){
				time = 60*60*60*24*100;
			}else{
				time = Number(time);
			}
			if( temp1 == "本事件" ){
				var e = $gameMap.event( this._eventId );
				if( e.opacity() == 0){
					return;
				}
				if( type == '终止持续效果' ){
					e.drill_ECE_stopEffect();
				}
				if( type == '标准闪烁'){
					e.drill_ECE_playSustainingFlash(time,period);
				}
				if( type == '渐变闪烁'){
					e.drill_ECE_playSustainingFlashCos(time,period);
				}
				if( type == '顺时针旋转'  ){
					e.drill_ECE_playSustainingRotate(time,period,1);
				}
				if( type == '逆时针旋转'  ){
					e.drill_ECE_playSustainingRotate(time,period,-1);
				}
				if( type == '垂直卡片旋转'  ){
					e.drill_ECE_playSustainingRotateVer(time,period);
				}
				if( type == '水平卡片旋转'  ){
					e.drill_ECE_playSustainingRotateHor(time,period);
				}
			}
		}
		if(args.length >= 6){
			var temp1 = String(args[1]);
			var temp2 = Number(args[3]);
			var type = String(args[5]);
			if(args[7]){ var time = String(args[7]); }
			if(args[9]){ var period = Number(args[9]); }
			
			if(time == "无限时间"){
				time = 60*60*60*24*100;
			}else{
				time = Number(time);
			}
			if( temp1 == "指定事件" ){ 
				var e = $gameMap.event( temp2 );
				if( e.opacity() == 0){
					return;
				}
				if( type == '终止持续效果' ){
					e.drill_ECE_stopEffect();
				}
				if( type == '标准闪烁' ){
					e.drill_ECE_playSustainingFlash(time,period);
				}
				if( type == '渐变闪烁' ){
					e.drill_ECE_playSustainingFlashCos(time,period);
				}
				if( type == '顺时针旋转' ){
					e.drill_ECE_playSustainingRotate(time,period,1);
				}
				if( type == '逆时针旋转' ){
					e.drill_ECE_playSustainingRotate(time,period,-1);
				}
				if( type == '垂直卡片旋转' ){
					e.drill_ECE_playSustainingRotateVer(time,period);
				}
				if( type == '水平卡片旋转' ){
					e.drill_ECE_playSustainingRotateHor(time,period);
				}
			}
			if( temp1 == "指定事件(变量)" ){ 
				var e = $gameMap.event( $gameVariables.value(temp2) );
				if( e.opacity() == 0){
					return;
				}
				if( type == '终止持续效果' ){
					e.drill_ECE_stopEffect();
				}
				if( type == '标准闪烁' ){
					e.drill_ECE_playSustainingFlash(time,period);
				}
				if( type == '渐变闪烁' ){
					e.drill_ECE_playSustainingFlashCos(time,period);
				}
				if( type == '顺时针旋转' ){
					e.drill_ECE_playSustainingRotate(time,period,1);
				}
				if( type == '逆时针旋转' ){
					e.drill_ECE_playSustainingRotate(time,period,-1);
				}
				if( type == '垂直卡片旋转' ){
					e.drill_ECE_playSustainingRotateVer(time,period);
				}
				if( type == '水平卡片旋转' ){
					e.drill_ECE_playSustainingRotateHor(time,period);
				}
			}
		}
	}
};

//=============================================================================
// ** 存储变量初始化
//=============================================================================
var _drill_ECE_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_ECE_sys_initialize.call(this);
	
	//没有存储的内容
}

//=============================================================================
// * 事件注释初始化
//=============================================================================
var _drill_ECE_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_ECE_setupPage.call(this);
	if (!this._erased && this.page()) {this.list().forEach(function(l) {
		if (l.code === 108) {
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if (command == "=>事件持续效果"){
				var type = String(args[1]);
				var temp1 = Number(args[3]);
				var time = 60*60*60*24*100;
				if( type == "标准闪烁" ){
					this.drill_ECE_playSustainingFlash(time,temp1);
				}
				if( type == "渐变闪烁" ){
					this.drill_ECE_playSustainingFlashCos(time,temp1);
				}
				if( type == "顺时针旋转" ){
					this.drill_ECE_playSustainingRotate(time,temp1,1);
				}
				if( type == "逆时针旋转" ){
					this.drill_ECE_playSustainingRotate(time,temp1,-1);
				}
				if( type == "垂直卡片旋转" ){
					this.drill_ECE_playSustainingRotateVer(time,temp1);
				}
				if( type == "水平卡片旋转" ){
					this.drill_ECE_playSustainingRotateHor(time,temp1);
				}
			};
		};
	}, this);};
};
//=============================================================================
// ** 物体
//=============================================================================
//==============================
// * 物体初始化
//==============================
var _Drill_ECE_c_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function() {
	_Drill_ECE_c_initialize.call(this);
	this._Drill_ECE = {};			//不要用initMembers，follower没有这个方法。
	
	this._Drill_ECE.x = 0;			//变化值
	this._Drill_ECE.y = 0;
	this._Drill_ECE.rotation = 0;
	this._Drill_ECE.scale_x = 0;
	this._Drill_ECE.scale_y = 0;
	this._Drill_ECE.skew_x = 0;
	this._Drill_ECE.skew_y = 0;
	this._Drill_ECE.opacity = 0;	//（透明度不叠加）
	this._Drill_ECE.playing_type = "";
	
	this._Drill_ECE.bitmap_width = -1;
	this._Drill_ECE.bitmap_height = -1;
}

//==============================
// * 动作判定
//==============================
Game_Character.prototype.drill_ECE_isPlaying = function() {
	if( !this._Drill_ECE ){ return false; }
	if( this._Drill_ECE.playing_type == "" ){ return false; }
	return true;
}
//==============================
// * 初始化 - 终止持续效果
//==============================
Game_Character.prototype.drill_ECE_stopEffect = function() {
	var ef = this._Drill_ECE;
	ef.playing_type = "";
	ef.f_time = 0;
	ef.f_dest = 0;
	ef.opacity = 255 ;
	this.setOpacity(ef.opacity);
}
//==============================
// * 初始化 - 持续 标准闪烁
//==============================
Game_Character.prototype.drill_ECE_playSustainingFlash = function(time,period) {
	var ef = this._Drill_ECE;
	ef.playing_type = "sustainingFlash";
	ef.f_time = 0;
	ef.f_dest = time;
	ef.f_period = period;
	ef.fA_time = 0;
	ef.fA_dest = period/2;
	ef.fB_time = 0;
	ef.fB_dest = period/2;
}
//==============================
// * 初始化 - 持续 渐变闪烁
//==============================
Game_Character.prototype.drill_ECE_playSustainingFlashCos = function(time,period) {
	var ef = this._Drill_ECE;
	ef.playing_type = "sustainingFlashCos";
	ef.f_time = 0;
	ef.f_dest = time;
	ef.f_period = period;
}
//==============================
// * 初始化 - 持续 标准旋转
//==============================
Game_Character.prototype.drill_ECE_playSustainingRotate = function(time,period,prop) {
	var ef = this._Drill_ECE;
	ef.playing_type = "sustainingRotate";
	ef.f_time = 0;
	ef.f_dest = time;
	ef.f_period = period;
	ef.f_speed = 360/period /180*Math.PI * prop;
}
//==============================
// * 初始化 - 持续 垂直卡片旋转
//==============================
Game_Character.prototype.drill_ECE_playSustainingRotateVer = function(time,period) {
	var ef = this._Drill_ECE;
	ef.playing_type = "sustainingRotateVer";
	ef.f_time = 0;
	ef.f_dest = time;
	ef.f_period = period;
	ef.f_speed = 360/period /180*Math.PI;
}
//==============================
// * 初始化 - 持续 水平卡片旋转
//==============================
Game_Character.prototype.drill_ECE_playSustainingRotateHor = function(time,period) {
	var ef = this._Drill_ECE;
	ef.playing_type = "sustainingRotateHor";
	ef.f_time = 0;
	ef.f_dest = time;
	ef.f_period = period;
	ef.f_speed = 360/period /180*Math.PI;
}

//==============================
// * 帧刷新
//==============================
var _Drill_ECE_c_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function() {
	_Drill_ECE_c_update.call(this);
	
	if( this._Drill_ECE && this._Drill_ECE.playing_type != "" ){
		this.drill_ECE_updateSustainingFlash();
		this.drill_ECE_updateSustainingFlashCos();
		this.drill_ECE_updateSustainingRotate();
		this.drill_ECE_updateSustainingRotateVer();
		this.drill_ECE_updateSustainingRotateHor();
	}
}
//==============================
// * 帧刷新 - 持续 标准闪烁
//==============================
Game_Character.prototype.drill_ECE_updateSustainingFlash = function() {
	var ef = this._Drill_ECE;
	if( ef.playing_type == "sustainingFlash" ){
		if( ef.fA_time < ef.fA_dest ){
			ef.fA_time ++;
			ef.opacity = 1 ;
			this.setOpacity(ef.opacity);
		}else if( ef.fB_time < ef.fB_dest ){
			ef.fB_time ++;
			ef.opacity = 255;
			this.setOpacity(ef.opacity);
		}
		ef.f_time ++;
		if( ef.f_time % ef.f_period == 0 ){
			ef.fA_time = 0;
			ef.fB_time = 0;
		}
		if( ef.f_time >= ef.f_dest ){
			ef.opacity = 255;
			this.setOpacity(ef.opacity);
			ef.playing_type = "";
		}
	}
}
//==============================
// * 帧刷新 - 持续 渐变闪烁
//==============================
Game_Character.prototype.drill_ECE_updateSustainingFlashCos = function() {
	var ef = this._Drill_ECE;
	if( ef.playing_type == "sustainingFlashCos" ){
		ef.f_time ++;
		ef.opacity = 127 + 126*Math.cos( ( 360* ef.f_time/ef.f_period )/180*Math.PI );
		this.setOpacity(ef.opacity);
		if( ef.f_time >= ef.f_dest ){
			ef.opacity = 255;
			this.setOpacity(ef.opacity);
			ef.playing_type = "";
		}
	}
}
//==============================
// * 帧刷新 - 持续 标准旋转
//==============================
Game_Character.prototype.drill_ECE_updateSustainingRotate = function() {
	var ef = this._Drill_ECE;
	if( ef.playing_type == "sustainingRotate" ){
		if( this._Drill_ECE.bitmap_width == -1 ){ return }	//在图片加载完成前，不执行旋转
		if( this._Drill_ECE.bitmap_height == -1 ){ return }
		
		ef.f_time ++;
		ef.rotation += ef.f_speed;
		ef.opacity = 255;
		
		//圆公式 (x-a)²+(y-b)²=r²	（锁定圆心，只是倒影的动作会变得有趣）
		//圆极坐标 x=ρcosθ,y=ρsinθ
		var ww = 0;
		var hh = -1*this._Drill_ECE.bitmap_height/2;
		var r = Math.sqrt( Math.pow(ww,2) + Math.pow(hh,2) );
		var p_degree = Math.atan(hh/ww);
		p_degree = Math.PI - p_degree;
		ef.x = r*Math.cos( ef.rotation - p_degree);
		ef.y = r*Math.sin( ef.rotation - p_degree);
		ef.x += 0;
		ef.y += -1*this._Drill_ECE.bitmap_height/2;
		
		if( ef.f_time >= ef.f_dest ){
			ef.rotation = 0;
			ef.playing_type = "";
		}
	}
}
//==============================
// * 帧刷新 - 持续 垂直卡片旋转
//==============================
Game_Character.prototype.drill_ECE_updateSustainingRotateVer = function() {
	var ef = this._Drill_ECE;
	if( ef.playing_type == "sustainingRotateVer" ){
		
		ef.f_time ++;
		ef.scale_x = -0.5 - 0.5 *Math.cos( ef.f_time*ef.f_speed + Math.PI );
		ef.opacity = 255;
		
		if( ef.f_time >= ef.f_dest ){
			ef.playing_type = "";
		}
	}
}
//==============================
// * 帧刷新 - 持续 水平卡片旋转
//==============================
Game_Character.prototype.drill_ECE_updateSustainingRotateHor = function() {
	var ef = this._Drill_ECE;
	if( ef.playing_type == "sustainingRotateHor" ){
		if( this._Drill_ECE.bitmap_width == -1 ){ return }	//在图片加载完成前，不执行旋转
		if( this._Drill_ECE.bitmap_height == -1 ){ return }
		
		ef.f_time ++;
		ef.scale_y = -0.5 - 0.5*Math.cos( ef.f_time*ef.f_speed + Math.PI );
		ef.opacity = 255;
		
		ef.y = 0.5 * this._Drill_ECE.bitmap_height * ef.scale_y;
		
		if( ef.f_time >= ef.f_dest ){
			ef.playing_type = "";
		}
	}
}

//=============================================================================
// ** 跟随者特殊设置
//=============================================================================
//==============================
// * 透明度同步
//==============================
var _drill_ECE_setOpacity = Game_Follower.prototype.setOpacity;
Game_Follower.prototype.setOpacity = function(opacity) {
	if( $gamePlayer.drill_ECE_isPlaying() ){ return; }
	if( this.drill_ECE_isPlaying() ){ return; }
	_drill_ECE_setOpacity.call(this,opacity);
};

//=============================================================================
// ** 事件贴图
//=============================================================================
//==============================
// * 初始化
//==============================
var _Drill_ECE_s_setCharacter = Sprite_Character.prototype.setCharacter;
Sprite_Character.prototype.setCharacter = function(character) {
	_Drill_ECE_s_setCharacter.call(this,character);
	if (character) { this._Drill_ECE = character._Drill_ECE; };
};

//==============================
// * 固定帧初始值
//==============================
var _Drill_ECE_s_updatePosition = Sprite_Character.prototype.updatePosition;
Sprite_Character.prototype.updatePosition = function() {
	_Drill_ECE_s_updatePosition.call(this);
	if( this.rotation != 0 ){ this.rotation = 0; }
	if( this.scale.x != 1 ){ this.scale.x = 1; }
	if( this.scale.y != 1 ){ this.scale.y = 1; }
	if( this.skew.x != 0 ){ this.skew.x = 0; }
	if( this.skew.y != 0 ){ this.skew.y = 0; }
	//从这里开始，参数都被固定值（不需要考虑多次update的叠加影响）
};

//==============================
// * 帧刷新
//==============================
var _Drill_ECE_s_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
	_Drill_ECE_s_update.call(this);
	if ( this._character && this._Drill_ECE ) {
		this.update_ECE_effect();
	};
};
Sprite_Character.prototype.update_ECE_effect = function() {
	
	if( this._character.drill_ECE_isPlaying() ){
		this.x += this._Drill_ECE.x ;
		this.y += this._Drill_ECE.y ;
		this.rotation += this._Drill_ECE.rotation;
		this.scale.x += this._Drill_ECE.scale_x;
		this.scale.y += this._Drill_ECE.scale_y;
		//this.skew.x += this._Drill_ECE.skew_x;
		//this.skew.y += this._Drill_ECE.skew_y;
		
		this.opacity = this._Drill_ECE.opacity;

	}
	if( this.bitmap && this.bitmap.isReady() ){		//获取图片宽高
		this._Drill_ECE.bitmap_width = this.patternWidth();
		this._Drill_ECE.bitmap_height = this.patternHeight();
	}
}

