//=============================================================================
// MOG_CharShatterEffect.js
//=============================================================================

/*:
 * @plugindesc (v1.1)[v1.3]  行走图 - 粉碎效果
 * @author Moghunter （Drill_up翻译+优化）
 *
 *
 * @help  
 * =============================================================================
 * +++ MOG - Char Shatter Effect (v1.1) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * 能播放地图行走图的粉碎效果。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只对事件有效。
 * 2.粉碎效果执行完后，只是行走图消失了，事件本体还在。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - mog旧指令
 * 要使用粉碎效果，需要在事件中添加注释，并含以下关键字：
 * （注意，冒号左右都有一个空格）
 *
 * 插件指令：shatter_event_id : A : B : X : Y
 *
 * 参数A：表示事件的id号
 * 参数B：粉碎模式。
 *      0 - 普通粉碎
 *      1 - 扩散粉碎
 *      2 - 重力上下粉碎
 * 参数X：碎片X轴方向速度（可为小数，可为负数）
 * 参数Y：碎片Y轴方向速度（可为小数，可为负数）
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 规范指令
 * 该规范指令与mog旧指令效果一样，只是用于规范。
 * （注意，冒号左右都有一个空格）
 *
 * 插件指令：>事件粉碎 : A : 普通粉碎 : X : Y
 * 插件指令：>事件粉碎 : A : 扩散粉碎 : X : Y
 * 插件指令：>事件粉碎 : A : 重力上下粉碎 : X : Y
 * 插件指令：>事件粉碎 : 本事件 : 普通粉碎 : X : Y
 * 
 * 参数A：事件的id号
 *        如果插件指令作用于插件自己，则填："本事件"
 * 参数X：碎片X轴方向速度（可为小数，可为负数）
 * 参数Y：碎片Y轴方向速度（可为小数，可为负数）
 *
 * 类型直接写中文即可。用于快速识别插件指令。
 *
 * -----------------------------------------------------------------------------
 * ----关于Drill_up优化：
 * [v1.1]
 * 规范了插件指令，并且添加了作用于事件自己的插件指令设置。
 * [v1.2]
 * 修改了插件分类。
 * [v1.3]
 * 修复了与镜面反射不兼容叠加造成错误的bug。
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//插件记录：
//		修改了mog的插件指令函数 checkEventsCharShatter 方法
//		
//		给"loadShatterData"添加了兼容性还有空跳出"{return}"
//		

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_CharShatterEffects = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_CharShatterEffect');

//=============================================================================
// ** Game Character Base
//=============================================================================

//==============================
// * Initialize
//==============================
var _mog_chaShatter_gchar_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
	_mog_chaShatter_gchar_initMembers.call(this);
	this._shatter = [false,[],false,0,0,1];
};

//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var __mog_charShatter_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	__mog_charShatter_pluginCommand.call(this,command, args)
    this.checkEventsCharShatter(command, args);
	return true;
};

//==============================
// * checkEventsCharShatter
//==============================
Game_Interpreter.prototype.checkEventsCharShatter = function(command, args) {
	
	if (command === "shatter_event_id")  {
		var event_id = Number(args[1]);
		var m = Number(args[3]);
		var x = Number(args[5]);
		var y = Number(args[7]);
		if (event_id > 0) {
			$gameMap.events().forEach(function(event) {
				if (event.eventId() === event_id) {
					event._shatter = [true,[],true,x,y,m];
				};
			}, this);	
		};
	};
	if (command === ">事件粉碎")  {
		var temp_event = String(args[1]);
		var temp_type = String(args[3]);
		var temp_x_speed = Number(args[5]);
		var temp_y_speed = Number(args[7]);
		if(temp_type == "普通粉碎"){
			temp_type = 0;
		}else if(temp_type == "扩散粉碎"){
			temp_type = 1;
		}else if(temp_type == "重力上下粉碎"){
			temp_type = 2;
		}else{
			temp_type = 0;
		}
		if( temp_event == "本事件" ){
			$gameMap.events().forEach(function(event) {
				if (event.eventId() === this._eventId) {
					event._shatter = [true,[],true,temp_x_speed,temp_y_speed,temp_type];
				};
			}, this);	
		}else{
			$gameMap.events().forEach(function(event) {
				if (event.eventId() === Number(temp_event)) {
					event._shatter = [true,[],true,temp_x_speed,temp_y_speed,temp_type];
				};
			}, this);	
		}
	};
};

//=============================================================================
// ** Sprite Character
//=============================================================================

//==============================
// * Update
//==============================
var _mog_charShatter_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
	_mog_charShatter_update.call(this);
	if (this._character && this._character._shatter[0]) {this.updateShatterEffect()};
};

//==============================
// * Update Shatter Effect
//==============================
Sprite_Character.prototype.updateShatterEffect = function() {
	if (!this._shatterField) {this.createShatterField()};
	if (!this._shatterSprites || this._character._shatter[2]) {this.createShatterSprites()};
	for (var i = 0; i < this._shatterSprites.length; i++) {
		this.updateShatterSprites(this._shatterSprites[i],i);
		if (this._shatterSprites[i].opacity === 0) {
			this._shatterField.removeChild(this._shatterSprites[i]);
		};
	};
	this.setFrame(0,0,0,0);
};

//==============================
// * create Shatter Field
//==============================
Sprite_Character.prototype.createShatterField = function() {
     this._shatterField = new Sprite();
	 this.addChild(this._shatterField);
};

//==============================
// * remove Shatter Sprites
//==============================
Sprite_Character.prototype.removeShatterSprites = function() {
     for (var i = 0; i < this._shatterSprites.length; i++) {
		  this._shatterField.removeChild(this._shatterSprites[i]);
		  this._shatterSprites[i].bitmap = null;
		  this._shatterSprites[i] = null;
		  this._character._shatter[1][i] = null;
	 };
	 this._shatterSprites = null;
};

//==============================
// * create Shatter Sprites
//==============================
Sprite_Character.prototype.createShatterSprites = function() {
	this._character._shatter[2] = false;
	if (this._shatterSprites) {this.removeShatterSprites()};
	this._character._priorityType = 2
	this._character._through = true;
	this._shatterSprites = [];
	this._shatterType = this._character._shatter[5];
	var frag_size = 5  
    var pw = this.patternWidth();
    var ph = this.patternHeight();
	var maxw = Math.floor((pw / frag_size) * (ph / frag_size));
	if (this._tileId > 0) {
		var sx = (Math.floor(this._tileId / 128) % 2 * 8 + this._tileId % 8) * pw;
		var sy = Math.floor(this._tileId % 256 / 8) % 16 * ph;		
	} else {
        var sx = (this.characterBlockX() + this.characterPatternX()) * pw;
        var sy = (this.characterBlockY() + this.characterPatternY()) * ph;
	};
	for (var i = 0; i < maxw; i++) {
         this.createFrag(i,pw,ph,sx,sy,frag_size);
		 if (!this._character._shatter[1][i]) {
            this.setShatterAnimation(i) 
		 } else {
			this.loadShatterData(i);
		 };			 
	};
	this._shatterField.x = -this.width / 2;
	this._shatterField.y = -this.height;
};

//==============================
// * create Frag
//==============================
Sprite_Character.prototype.createFrag = function(i,pw,ph,sx,sy,frag_size) {
	this._shatterSprites[i] = new Sprite(this.bitmap);
	var l = Math.floor((frag_size * i) / pw);
	var x =  (frag_size * i) - (l * pw);
	var y = Math.floor((l * frag_size));
	var y3 = Math.floor((l * frag_size));
	if (y >= ph - frag_size) {y = ph - frag_size};
	var sx2 = sx + x
	var sy2 = Math.floor(sy + y)
	this._shatterSprites[i].x = x;
	this._shatterSprites[i].y = y;
	this._shatterSprites[i].setFrame(sx2,sy2,frag_size,frag_size);
	this._shatterField.addChild(this._shatterSprites[i]);
	this._shatterSprites[i].an = [0,0,0];
};

//==============================
// * Mode
//==============================
Sprite_Character.prototype.mode = function() {
     return this._character._shatter[5];
}; 

//==============================
// * set Shatter Animation
//==============================
Sprite_Character.prototype.setShatterAnimation = function(i) {
	this._character._shatter[1][i] = [];
    var x = this._character._shatter[3];
	var y = this._character._shatter[4];
	if (this.mode() === 1) {
		var sx = Math.random() * Math.abs(x) + 0.1;
		var sy = Math.random() * Math.abs(y) + 0.1;
		var r = Math.randomInt(2);
		sx = r === 0 ? sx : -sx;
		var r = Math.randomInt(2);
		sy = r === 0 ? sy : -sy;		
	} else if (this.mode() === 2) {	
		var sx = Math.random() * Math.abs(x) + 0.1;
		var sy = Math.random() * Math.abs(y) + 0.1;
		var r = Math.randomInt(2);
		sx = r === 0 ? sx : -sx;
	} else {
		var sx = Math.random() * Math.abs(x) + 0.1;
		var sy = Math.random() * Math.abs(y) + 0.1;
		sx = this._character._shatter[3] >= 0 ? sx : -sx;
		sy = this._character._shatter[4] >= 0 ? sy : -sy;
    };
    this._shatterSprites[i].sx = sx;
	this._shatterSprites[i].sy = sy;
	this._shatterSprites[i].op = (Math.random() * 2) + 1.0;
	this._shatterSprites[i].sc = 0;
	this._shatterSprites[i].rt = 0;
};

//==============================
// * Load Shatter Data
//==============================
Sprite_Character.prototype.loadShatterData = function(i) {
	this._shatterSprites[i].x = Number(this._character._shatter[1][i].x);
	this._shatterSprites[i].y = Number(this._character._shatter[1][i].y);
	this._shatterSprites[i].scale.x = Number(this._character._shatter[1][i].scaleX);
	this._shatterSprites[i].scale.y = Number(this._character._shatter[1][i].scaleY);
	this._shatterSprites[i].sc = Number(this._character._shatter[1][i].sc);	
	this._shatterSprites[i].rotation = Number(this._character._shatter[1][i].rotation);
	this._shatterSprites[i].opacity = Number(this._character._shatter[1][i].opacity);
	this._shatterSprites[i].sx = Number(this._character._shatter[1][i].sx);
	this._shatterSprites[i].sy = Number(this._character._shatter[1][i].sy);
	this._shatterSprites[i].op = Number(this._character._shatter[1][i].op);
	this._shatterSprites[i].rt = Number(this._character._shatter[1][i].rt);
	this._shatterSprites[i].an = Number(this._character._shatter[1][i].an);
};

//==============================
// * Update Shatter Sprites
//==============================
Sprite_Character.prototype.updateShatterSprites = function(sprite,index) {
	if(!sprite){ return }
	sprite.an[0]++;
	if (this._character._shatter[5] === 2) {
		if (sprite.an[0] < 60) {
		  sprite.x += sprite.sx;
		  sprite.y -= sprite.sy;
		} else if (sprite.an[0] < 450) {
		  sprite.x += sprite.sx;
		  sprite.y += sprite.sy * 1.2;		
		};
	} else {
	  sprite.x += sprite.sx;
	  sprite.y += sprite.sy;
	};
	sprite.opacity -= sprite.op;
	sprite.scale.x += sprite.sc;
	sprite.scale.y += sprite.sc;
	sprite.rotation += sprite.rt;
};

//==============================
// * Save Shatter Data
//==============================
Sprite_Character.prototype.saveShatterData = function() {
	this._character._shatter[1] = [];
	for (var i = 0; i < this._shatterSprites.length; i++) {
		var sprite = this._shatterSprites[i]
		this._character._shatter[1][i] = {};
		this._character._shatter[1][i].x = sprite.x;
		this._character._shatter[1][i].y = sprite.y;
		this._character._shatter[1][i].scaleX = sprite.scale.x;
		this._character._shatter[1][i].scaleY = sprite.scale.y;		
		this._character._shatter[1][i].opacity = sprite.opacity;
		this._character._shatter[1][i].sx = sprite.sx;
		this._character._shatter[1][i].sy = sprite.sy;
		this._character._shatter[1][i].op = sprite.op;
		this._character._shatter[1][i].sc = sprite.sc;
		this._character._shatter[1][i].rotation = sprite.rotation;
		this._character._shatter[1][i].rt = sprite.rt;
		this._character._shatter[1][i].an = sprite.an;
	};
};

//=============================================================================
// ** Scene Map
//=============================================================================

//==============================
// * Terminate
//==============================
var _mog_charShatter_scMap_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	if (this._spriteset) {this._spriteset.recordShatterData()};
    _mog_charShatter_scMap_terminate.call(this);
};

//=============================================================================
// ** Spriteset Map
//=============================================================================

//==============================
// * Record Shatter Data
//==============================
Spriteset_Map.prototype.recordShatterData = function() {
    for (var i = 0; i < this._characterSprites.length; i++) {
        var sprite = this._characterSprites[i];
        if (sprite._shatterSprites) {sprite.saveShatterData();
		} else {sprite._character._shatter[1] = []};
    }
};