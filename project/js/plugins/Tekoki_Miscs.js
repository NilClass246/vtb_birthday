var BirthdayManager = BirthdayManager || {};
BirthdayManager.temps = {};

BirthdayManager.TachiWidth = 300;
BirthdayManager.TachiHeight = 540;

BirthdayManager.camera_xoffset = 0;
BirthdayManager.camera_yoffset = 0;

BirthdayManager.finalResult = "meameasuki!!";

BirthdayManager.windowSkin = "Window";


//自动存档
Game_System.prototype.autoSaveGame = function() {
    $gameSystem.onBeforeSave();
    if (DataManager.saveGame(1)) {
        console.log("Autosave successful. Saved in slot "+ 1);
        //StorageManager.cleanBackup(1);
    } else {
        console.warn("Autosave Failed.");
    }
};

BirthdayManager.loadAutoSave = function(){
    if (DataManager.loadGame(1)) {
        SoundManager.playLoad();
        if ($gameSystem.versionId() !== $dataSystem.versionId) {
            $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
            $gamePlayer.requestMapReload();
        }
        SceneManager.goto(Scene_Map);
        $gameSystem.onAfterLoad();
    } else {
        SoundManager.playBuzzer();
    }
}

//版本控制
BirthdayManager.version = "V3.08"

function Sprite_Version(){
    this.initialize.apply(this, arguments);
}

Sprite_Version.prototype = Object.create(Sprite.prototype);
Sprite_Version.prototype.constructor = Sprite_Version;

Sprite_Version.prototype.initialize = function(){
    Sprite.prototype.initialize.call(this);
    this.bitmap = new Bitmap(100, 36);
    this.bitmap.drawText(BirthdayManager.version , 0, 0, 100, 36, "left");
}

//成就的特效！

function Sprite_Celebration(){
    this.initialize.apply(this, arguments);
}

Sprite_Celebration.prototype = Object.create(Sprite.prototype);
Sprite_Celebration.prototype.constructor = Sprite_Celebration;

Sprite_Celebration.prototype.initialize = function(num){
    Sprite.prototype.initialize.call(this);
    //this.max_time = time;
    //this.render_count = 0;
    //this.time_count = 0;
    this.particle_List = [];
    for(var i = 0; i<num; i++){
        var s = new Sprite_Cpart();
        s.move(Math.random()*Graphics.boxWidth, 0);
        this.particle_List.push(s);
        this.addChild(s);
    }
    AudioManager.playSe({
        name: "Applause1",
        volume: 90,
        pitch: 100,
        pan: 0
    });
}

Sprite_Celebration.prototype.update = function(){
    Sprite.prototype.update.call(this);
    for(var i =0; i<this.particle_List.length; i++){
        var s = this.particle_List[i]
        if(s._ended){
            this.particle_List.splice(i, 1);
            this.removeChild(s);
        }
    }
    if(this.particle_List.length<=0){
        this.destroy();
    }
}

function Sprite_Cpart(){
    this.initialize.apply(this, arguments);
}

Sprite_Cpart.prototype = Object.create(Sprite.prototype);
Sprite_Cpart.prototype.constructor = Sprite_Cpart;

Sprite_Cpart.prototype.initialize = function(){
    Sprite.prototype.initialize.call(this);
    this.bitmap = ImageManager.loadPicture("FishBanParticle");
    this.ysped = 0;
    this.xsped = 0;
    this.anchor.x = 0.5;
    this.anchor.y = 1;
    this.falling = true;
    this._ended = false;
}

Sprite_Cpart.prototype.update = function(){
    Sprite.prototype.update.call(this);
    this.ysped+=Math.random()*0.2;
    this.y+=this.ysped;
    this.x+=this.xsped;
    if(this.y-50>Graphics.boxHeight&&!this.falling){
        this._ended = true;
    }
    if(this.y>Graphics.boxHeight&& this.falling){
        this.falling = false;
        this.xsped = Math.random()*3-1.5;
        this.ysped = -10;
    }
}

//成就
BirthdayManager.achievements = {};
BirthdayManager.achievements.robotKilledCount = 0;
BirthdayManager.achievements.robotKillingCount = 0;
BirthdayManager.achievements.madeCakes = [];
BirthdayManager.achievements.isSecondLap = false;

BirthdayManager.unlockAchievement = function(ID){
    Game_Interpreter.prototype.pluginCommand.call(this, "Achievement", [ID]);
}

BirthdayManager.isRecordingSteps = false;;
BirthdayManager.recordedSteps = 0

BirthdayManager.temps.Scene_Title_prototype_initialize = Scene_Title.prototype.initialize;
Scene_Title.prototype.initialize = function() {
    BirthdayManager.temps.Scene_Title_prototype_initialize.call(this);
    var d = new Date();
    var month = d.getMonth()+1;
    var day = d.getDate();
    console.log("month:"+month+" day:"+day);
    if(month==8&&day==2){
        BirthdayManager.unlockAchievement(21);
    }
};

//scrollText
//Window_ScrollText.prototype.initialize = function() {
    //var width = Graphics.boxWidth;
    //var height = BirthdayManager.availHeight;
    //Window_Base.prototype.initialize.call(this, 0, BirthdayManager.upperFaceSize(), width, height);
    //this.opacity = 0;
    //this.hide();
    //this._text = '';
    //this._allTextHeight = 0;
//};

//文本输入的问题，救救我
BirthdayManager.startTextInput = function(){
    var scene = SceneManager._scene;
    var textarea = new PIXI.TextInput({
        input: {
            fontSize: '25pt',
            padding: '14px',
            width: '500px',
            color: '#26272E'
        }, 
        box: {
            default: {fill: 0xE8E9F3, rounded: 16, stroke: {color: 0xCBCEE0, width: 4}},
            focused: {fill: 0xE1E3EE, rounded: 16, stroke: {color: 0xABAFC6, width: 4}},
            disabled: {fill: 0xDBDBDB, rounded: 16}
        }
    })
    //textarea.focus();
    scene.addChild(textarea);
    textarea.focus();
}

//cg相关的问题
BirthdayManager.showCG = function(){
    var width = 1170;
    var height = 648;
    var rate;
    if(width>Graphics.boxWidth){
        rate = Graphics.boxWidth/width;
    }else{
        rate = Graphics.boxHeight/height;
    }
    var real_width = width*rate;
    var real_height = height*rate;
    var x = (Graphics.boxWidth - real_width)/2;
    var y = (Graphics.boxHeight-real_height)/2;

    $gameScreen.showPicture(10, "FinalCG", 0, x, y, rate*100, rate*100, 0, 0);
    $gameScreen.movePicture(10, 0, x, y, rate*100, rate*100, 255, 0, 120);
}

BirthdayManager.movebackMessageWindow = function(){
    this.endingWindow = true;
}

//虚拟按键相关的问题
BirthdayManager.manageVirtualButtons = function(){
    if($gameSwitches){
        if(!$gameSwitches.value(22)){

            var scene = SceneManager._scene;
            BirthdayManager.pluginCommandHideDpad(scene, ["hide","all"]);
            BirthdayManager.pluginCommandHideControl(scene, ["hide","all"]);
            BirthdayManager.pluginCommandHideAllKeyButtons(scene, ["hide","all"]);
        }
    }
}

BirthdayManager.pluginCommandHideDpad = function(scene, args){
    if (scene._directionalPad) {
        if (args[2] && args[2].toLowerCase() === 'instant') {
            scene._directionalPad.hideInstant();
        } else {
            scene._directionalPad.hide();
        }

        scene._directionalPad._pluginHidden = true;
    }
}

BirthdayManager.pluginCommandHideControl = function(scene, args){
    if (scene._controlButton) {
        if (args[2] && args[2].toLowerCase() === 'instant') {
            scene._controlButton.hideInstant();
        } else {
            scene._controlButton.hide();
        }

        scene._controlButton._pluginHidden = true;
    }
}

BirthdayManager.pluginCommandHideAllKeyButtons = function(scene, args){
    if (scene._keyButtons) {
        if (args[2] && args[2].toLowerCase() === 'instant') {
            Object.keys(scene._keyButtons).forEach(function (keyButton) {
                scene._keyButtons[keyButton].hideInstant();

                scene._keyButtons[keyButton]._pluginHidden = true;
            });
        } else {
            Object.keys(scene._keyButtons).forEach(function (keyButton) {
                scene._keyButtons[keyButton].hide();

                scene._keyButtons[keyButton]._pluginHidden = true;
            });
        }
    }
}
BirthdayManager.temps.Scene_Map_prototype_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    BirthdayManager.temps.Scene_Map_prototype_start.call(this);
    BirthdayManager.manageVirtualButtons();
    if($gameSwitches.value(23)){
        BirthdayManager.enterCakeScene();
        if(BirthdayManager.saved!={}){
            BirthdayManager.restoreCakeScene();
        }
    }
    BirthdayManager.manageSkinAndFace();
    $gameSwitches.setValue(58, true); 
};

BirthdayManager.manageSkinAndFace = function(){
    if($gameSwitches.value(10)){
        BirthdayManager.changeFace("koyori");
        BirthdayManager.windowSkin = "Window_yellow";
    }

    if($gameSwitches.value(13)){
        BirthdayManager.changeFace("noe");
        BirthdayManager.windowSkin = "Window_purple";
    }

    
    if($gameSwitches.value(14)){
        BirthdayManager.changeFace("mashiro");
        BirthdayManager.windowSkin = "Window_magenta";
    }

    if($gameSwitches.value(16)){
        BirthdayManager.changeFace("mea");
        BirthdayManager.windowSkin = "Window_cyan";
    }
}


//触摸修改
TouchInput.isOnWindow = function(){
    return TouchInput.y<BirthdayManager.upperFaceSize()||TouchInput.y>(Graphics.boxHeight-BirthdayManager.messH())
}

//标题

Scene_Title.prototype.createBackground = function() {
    this._backSprite1 = new Sprite(ImageManager.loadTitle1("bg"));
    this._backSprite1.scale.x = Graphics.boxWidth/375;
    this._backSprite1.scale.y = Graphics.boxHeight/812;
    this.addChild(this._backSprite1);
    //this._backSprite2 = new Sprite(ImageManager.loadTitle1("8"));
    //this._backSprite2.scale.x = Graphics.boxWidth/375;
    //this._backSprite2.scale.y = Graphics.boxHeight/812;
    //this.addChild(this._backSprite2);
    this._backSprite3 = new Sprite(ImageManager.loadTitle1("2"));
    this._backSprite3.anchor.y = 1;
    this._backSprite3.y = Graphics.boxHeight;
    this.addChild(this._backSprite3);
    this._backSprite4 = new Sprite(ImageManager.loadTitle1("3"));
    this._backSprite4.anchor.y = 1;
    this._backSprite4.y = Graphics.boxHeight;
    this.addChild(this._backSprite4);
    this._backSprite5 = new Sprite(ImageManager.loadTitle1("7"));
    this._backSprite5.anchor.y = 1;
    this._backSprite5.anchor.x = 1;
    this._backSprite5.y = Graphics.boxHeight;
    this._backSprite5.x = Graphics.boxWidth;
    this.addChild(this._backSprite5);
    this._backSprite6 = new Sprite(ImageManager.loadTitle1("桌子"));
    this._backSprite6.anchor.x = 0.5;
    this._backSprite6.anchor.y = 1;
    this._backSprite6.y = Graphics.boxHeight;
    this._backSprite6.x = Graphics.boxWidth/2;
    this._backSprite6.scale.x = Graphics.boxWidth/375;
    this.addChild(this._backSprite6);
    this._backSprite7 = new Sprite(ImageManager.loadTitle1("1"));
    this._backSprite7.anchor.x = 0.5;
    this._backSprite7.anchor.y = 1;
    this._backSprite7.y = Graphics.boxHeight;
    this._backSprite7.x = Graphics.boxWidth/2;
    this.addChild(this._backSprite7);
    this._backSprite8 = new TilingSprite(ImageManager.loadTitle1("4"));
    this._backSprite8.move(0,0,Graphics.boxWidth,168);
    this.addChild(this._backSprite8);
};


Scene_Title.prototype.createForeground = function() {
    if(DKTools.Localization._locale == "cn"){
        this._gameTitleSprite = new Sprite(ImageManager.loadTitle1("title_cn"));
    }else{
        this._gameTitleSprite = new Sprite(ImageManager.loadTitle1("title"));
    }
    this._gameTitleSprite.anchor.x = 0.5;
    this._gameTitleSprite.x = Graphics.boxWidth/2;
    this._gameTitleSprite.y = Math.max(168+(Graphics.boxHeight-812)/2, 168);
    var rate = Math.min(Graphics.boxWidth/375, Graphics.boxHeight/812);
    this._gameTitleSprite.scale.x = rate;
    this._gameTitleSprite.scale.y = rate;
    //this._gameTitleSprite
    this.addChild(this._gameTitleSprite);
    if ($dataSystem.optDrawTitle) {
        this.drawGameTitle();
    }
    BirthdayManager.SoundIcon = new Sprite(ImageManager.loadSystem("onSound"));
    BirthdayManager.SoundIcon.anchor.x = 0.5
    BirthdayManager.SoundIcon.anchor.y = 0.5
    BirthdayManager.SoundIcon.y = 34;
    BirthdayManager.SoundIcon.x = Graphics.boxWidth-34;
    this.addChild(BirthdayManager.SoundIcon);

    var v = new Sprite_Version();
    v.move(10,10);
    this.addChild(v)

    //var c = new Sprite_Celebration(50);
    //this.addChild(c);
};

BirthdayManager.isMuted = false;

BirthdayManager.mute = function(){
    this.SoundIcon.bitmap = ImageManager.loadSystem("onMute")
    this.isMuted = true;
    AudioManager.bgmVolume = 0;
    AudioManager.bgsVolume = 0;
    AudioManager.meVolume = 0;
    AudioManager.seVolume = 0;
}

BirthdayManager.unmute = function(){
    this.SoundIcon.bitmap = ImageManager.loadSystem("onSound");
    this.isMuted = false;
    AudioManager.bgmVolume = 100;
    AudioManager.bgsVolume = 100;
    AudioManager.meVolume = 100;
    AudioManager.seVolume = 100;
}

//成就备份
BirthdayManager.getBackUpCode = function(){
    
}

//选项变更
Window_Options.prototype.addVolumeOptions = function() {
    return;
};

BirthdayManager.temps.Window_Options_prototype_makeCommandList = Window_Options.prototype.makeCommandList;
Window_Options.prototype.makeCommandList = function() {
    BirthdayManager.temps.Window_Options_prototype_makeCommandList.call(this);
    this.addCommand("{return}", "return");
};
BirthdayManager.temps.Window_Options_prototype_drawItem = Window_Options.prototype.drawItem;
Window_Options.prototype.drawItem = function(index) {
    if(this.commandName(index)=="{return}"){
        var rect = this.itemRectForText(index);
        var statusWidth = this.statusWidth();
        var titleWidth = rect.width - statusWidth;
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawText(this.commandName(index), rect.x, rect.y, titleWidth, 'left');
        //this.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'right');
    }else{
        BirthdayManager.temps.Window_Options_prototype_drawItem.call(this, index);
    }
};

BirthdayManager.temps.Window_Options_prototype_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
    if(this.commandName(this.index())=="{return}"){
        SceneManager._scene.popScene();
    }else{
        BirthdayManager.temps.Window_Options_prototype_processOk.call(this);
    }
};


//皮肤

BirthdayManager.temps.Window_Base_prototype_initialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function(x, y, width, height) {
    BirthdayManager.temps.Window_Base_prototype_initialize.call(this, x, y, width, height);
    this._windowSkinName = BirthdayManager.windowSkin;
};

Window_Base.prototype.loadWindowskin = function() {
    this.windowskin = ImageManager.loadSystem(BirthdayManager.windowSkin);
};

BirthdayManager.temps.Window_Base_prototype_update = Window_Base.prototype.update;
Window_Base.prototype.update = function() {
    BirthdayManager.temps.Window_Base_prototype_update.call(this);
    if(this._windowSkinName !== BirthdayManager.windowSkin&&!(this instanceof Window_CakeReceipt)) {
        this.windowskin = ImageManager.loadSystem(BirthdayManager.windowSkin);
        this._windowSkinName = BirthdayManager.windowSkin;
    }
};

BirthdayManager.temps.Scene_Title_prototype_commandNewGame = Scene_Title.prototype.commandNewGame;
Scene_Title.prototype.commandNewGame = function() {
    BirthdayManager.temps.Scene_Title_prototype_commandNewGame.call(this);
    BirthdayManager.unmute();
    BirthdayManager.windowSkin = "Window_yellow";
};

//点击图标
BirthdayManager.hasDestinationSprite = true;

Sprite_Destination.prototype.update = function() {
    Sprite.prototype.update.call(this);
    //console.log(pluginCommandHideAllKeyButtons);
    if ($gameTemp.isDestinationValid()){
        this.updatePosition();
        this.updateAnimation();
        this.visible = true;
        if(BirthdayManager.hasDestinationSprite){
            this.visible = true;
        }else{
            this.visible = false;
        }
    } else {
        this._frameCount = 0;
        this.visible = false;
    }
};

//bgm

BirthdayManager.acclerateBgm = function(pitch){
    var b = AudioManager.saveBgm();
    var bf = AudioManager._bgmBuffer;
    bf._pitch = (pitch || 0) / 100;
    if (bf.isPlaying()) {
        bf.play(bf._sourceNode.loop, b.pos);
    }

}

//测量

BirthdayManager.messY = function(){
    return Graphics.boxHeight - (this.messH());
}

BirthdayManager.messH = function(){
    return 4 * 36 + 18 * 2;
}

BirthdayManager.availHeight = function(){
    return Graphics.boxHeight-this.messH()-this.upperFaceSize();
}

BirthdayManager.upperFaceSize = function(){
    return Graphics.boxHeight/6;
}

//推箱子相关方法
BirthdayManager.current_target_list = [];

BirthdayManager.box_state = [];

BirthdayManager.sokoban_maps = {
    5: [5,5],
    14:[4,6],
    15:[7,8],
    16:[9,6]
};

BirthdayManager.updateBoxState = function(id){
    var x = $gameVariables.value(3);
    var y = $gameVariables.value(4);
    this.box_state[id] = 0;
    for(var i =0; i<this.current_target_list.length; i++){
        if(x==this.current_target_list[i][0]&&y==this.current_target_list[i][1]){
            this.box_state[id] = 1;
        }
    }
}

BirthdayManager.checkAllBoxState = function(){
    var result = true;
    //console.log(this.box_state);
    for(var i = 0;i<this.box_state.length; i++){
        if(this.box_state[i]<=0){
            result = false;
        }
    }
    return result;
}

BirthdayManager.getRandomMapLocation = function(){
    var idlist = [5, 14,15,16]
    var id = idlist[Math.floor(Math.random()*idlist.length)];
    $gameVariables.setValue(5,id);
    $gameVariables.setValue(6, this.sokoban_maps[id][0]);
    $gameVariables.setValue(7, this.sokoban_maps[id][1]);
}

//缩放方法

BirthdayManager.focus = function(rate){
    //缩放X
    $gameSystem._drill_LCa_sX.move = 0;
    $gameSystem._drill_LCa_sX.time = Math.max(Number(0),1);
    $gameSystem._drill_LCa_sX.speed = (rate -1 - $gameSystem._drill_LCa_sX.cur)/$gameSystem._drill_LCa_sX.time;
    //缩放Y
    $gameSystem._drill_LCa_sY.move = 0;
    $gameSystem._drill_LCa_sY.time = Math.max(Number(0),1);
    $gameSystem._drill_LCa_sY.speed = (rate -1 - $gameSystem._drill_LCa_sY.cur)/$gameSystem._drill_LCa_sY.time;
}
BirthdayManager.saveCakeScene = function(){
    this.saved = {}
    var scene = SceneManager._scene;
    this.saved._scrollY = scene._CakeListWindow._scrollY;
    this.saved._index = scene._CakeListWindow._index;
    this.saved._selectionList = scene._CakeListWindow._selectionList.slice();
}

BirthdayManager.restoreCakeScene = function(){
    var scene = SceneManager._scene;
    scene._CakeListWindow._scrollY = this.saved._scrollY;
    scene._CakeListWindow.select(this.saved._index);
    scene._CakeListWindow._selectionList = this.saved._selectionList.slice();
    scene._CakeListWindow.refresh();
    this.saved = {};
}

BirthdayManager.enterCakeScene = function(){
    this.isCakeScene = true;
    var upperheight = Graphics.boxHeight/4;
    var tilesize = (upperheight)/2;
    var focusrate = tilesize/48;
    this.focus(focusrate);
    this.camera_xoffset = 0.75;
    var scene = SceneManager._scene;
    scene._characterWindow = new Window_Boundary(0, scene._FaceWindow.y+scene._FaceWindow.height, Graphics.boxWidth*(3/5), upperheight);
    scene.addWindowToCakeScene(scene._characterWindow);
    scene._cakeDisplayWindow = new Window_CakeDisplay(scene._characterWindow.x+scene._characterWindow.width
        ,scene._characterWindow.y
        ,Graphics.boxWidth-scene._characterWindow.width
        ,scene._characterWindow.height);
    scene.addWindowToCakeScene(scene._cakeDisplayWindow);

    var tachiy = scene._characterWindow.y+scene._characterWindow.height;
    var rate = this.getTachiRate();
    var trate = 0.65*((scene._messageWindow.y-tachiy)/293);
    //0.65*rate;
    var theight = this.TachiHeight*trate;
    var twidth = this.TachiWidth*trate;
    

    var tachi = new Sprite_CakeTachi();
    this._caketachi = tachi;
    tachi.scale.x = trate;
    tachi.scale.y = trate;
    //scene.addWindowToCakeScene(tachi);
    scene._TachiWindow = new Window_Base(0, tachiy, twidth+8*rate, scene._messageWindow.y-tachiy);
    //console.log(scene._messageWindow.y-tachiy);

    scene._TachiWindow.addChild(tachi);
    scene._TachiBoundary = new Window_Boundary(0, tachiy, twidth+8, scene._messageWindow.y-tachiy);
    //scene._TachiWindow._windowBackSprite.bitmap = tachi.bitmap;
    //scene._TachiWindow._windowBackSprite.scale.x = trate;
    //scene._TachiWindow._windowBackSprite.scale.y = trate;


    scene.addWindowToCakeScene(scene._TachiWindow);
    scene.addWindow(scene._TachiBoundary);
    scene._CakeListWindow = new Window_CakeList(
        scene._TachiWindow.x+scene._TachiWindow.width
        ,scene._TachiWindow.y
        ,Graphics.boxWidth - scene._TachiWindow.width
        ,scene._TachiWindow.height);
    //console.log(Graphics.boxWidth - scene._TachiWindow.width);
    scene.addWindowToCakeScene(scene._CakeListWindow);
    this.openCakeSelection();
    this.showInfo();
    //scene._messageWindow.drawText("酱油和青椒更配哦!",5,5)

    this.hasDestinationSprite = false;
}

BirthdayManager.exitCakeScene = function(){
    $gameVariables.setValue(35, BirthdayManager.allCakes[BirthdayManager.cakeKey].name);
    var scene = SceneManager._scene;
    this.hideInfo();
    this.hasDestinationSprite = true;
    this.camera_xoffset = 0;
    $gameMap._displayY -= 0.25;
    scene.removeChild(scene._characterWindow);
    //scene._characterWindow.destroy();
    scene.removeChild(scene._cakeDisplayWindow);
    //scene._cakeDisplayWindow.destroy();
    scene.removeChild(scene._TachiWindow);
    //scene._TachiWindow.destroy();
    scene.removeChild(scene._TachiBoundary);
    //scene._TachiBoundary.destroy();
    scene.removeChild(scene._CakeListWindow);
}

BirthdayManager.overlayPluginCommand = function(args){
    console.log(args);
    Game_Interpreter.prototype.overlayPluginCommand.call(this, args);
}

//立绘的sprite
function Sprite_CakeTachi(){
    this.initialize.apply(this, arguments);
}

Sprite_CakeTachi.prototype = Object.create(Sprite.prototype);
Sprite_CakeTachi.prototype.constructor = Sprite_CakeTachi;

Sprite_CakeTachi.prototype.initialize = function(){
    Sprite.prototype.initialize.call(this);
    this.bitmap = ImageManager.loadPicture("tachi/koyori_body");
    this.emoji = new Sprite(ImageManager.loadPicture("tachi/koyori_normal"));
    this.addChild(this.emoji);
}

Sprite_CakeTachi.prototype.changeEmoji = function(name){
    this.removeChild(this.emoji);
    this.emoji = new Sprite(ImageManager.loadPicture("tachi/"+name));
    this.addChild(this.emoji);
}
//文字输入方法


BirthdayManager.enterCardScene = function(){
    //alert("window.innerWidth: "+window.innerWidth);
    //alert("window.screen.availWidth: "+window.screen.availWidth);
    //alert("window.screenTop: "+window.screenTop);
    //alert("document.body.clientWidth: "+document.body.clientWidth);
    //alert("window.screen.width: "+window.screen.width);
   // alert("document.body.scrollWidth: "+document.body.scrollWidth);
    //alert("stageWidth: "+SceneManager._scene.width);
    this.showInfo();

    var scene = SceneManager._scene;
    var width = 600;
    var height = 600;
    var xrate = Math.min(Graphics.boxWidth/375, Graphics.boxHeight/812);
    var real_width = width*xrate;
    var real_height = height*xrate;
    var x = (Graphics.boxWidth-real_width)/2;
    var y = Graphics.boxHeight;
    var finalY = Graphics.boxHeight-real_height-BirthdayManager.messH();

    $gameScreen.showPicture(3, "litter", 0, x, y, xrate*100, xrate*100, 255, 0);
    $gameScreen.movePicture(3, 0, x, finalY, xrate*100, xrate*100, 255, 0, 120);
    
}

BirthdayManager.exitCardScene = function(){
    this.hideInfo();
    var scene = SceneManager._scene;
    var width = 600;
    var height = 600;
    var xrate = Graphics.boxWidth/width;
    var real_width = width*xrate;
    var real_height = height*xrate;
    var x = (Graphics.boxWidth-real_width)/2;
    var y = Graphics.boxHeight;
    var finalY = Graphics.boxHeight-real_height-BirthdayManager.messH();
    $gameScreen.movePicture(3, 0, x, finalY, xrate*100, xrate*100, 0, 0, 60);

}

function Image_letter(){
    this.initialize.apply(this, arguments);
}

Image_letter.prototype = Object.create(Sprite.prototype);
Image_letter.prototype.constructor = Image_letter;

Image_letter.prototype.initialize = function(){
    Sprite.prototype.initialize.call(this);
    var width = 600;
    var height = 600;
    var xrate = Graphics.boxWidth/width;
    var real_width = width*xrate;
    var real_height = height*xrate;
    var x = (Graphics.boxWidth-real_width)/2;
    var y = Graphics.boxHeight-real_height-BirthdayManager.messH();
    this.bitmap = ImageManager.loadPicture("litter");
    this.scale.x = xrate;
    this.scale.y = xrate;
    this.x = x;
    this.y = y;
    this.opacity = 0;
}

Image_letter.prototype.update = function(){
    Sprite.prototype.update.call(this);
    if(this.opacity<255){
        this.opacity+=5;
    }
}

//吃豆人方法
BirthdayManager.possible_location_list = [
    [4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[13,5],[14,5],[15,5],[16,5],[17,5],[18,5],[19,5],[20,5],
    [4,6],[7,6],[11,6],[13,6],[17,6],[20,6],
    [4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[11,7],[12,7],[13,7],[14,7],[15,7],[16,7],[17,7],[18,7],[19,7],[20,7],
    [4,8],[7,8],[9,8],[15,8],[17,8],[20,8],
    [4,9],[5,9],[6,9],[7,9],[9,9],[10,9],[11,9],[13,9],[14,9],[15,9],[17,9],[18,9],[19,9],[20,9],
    [7,10],[17,10],
    [7,11],[17,11],
    [7,12],[17,12],
    [7,13],[17,13],
    [7,14],[17,14],
    [7,15],[17,15],
    [7,16],[17,16],
    [4,17],[5,17],[6,17],[7,17],[8,17],[9,17],[10,17],[11,17],[13,17],[14,17],[15,17],[16,17],[17,17],[18,17],[19,17],[20,17],
    [4,18],[7,18],[11,18],[13,18],[17,18],[20,18],
    [4,19],[5,19],[7,19],[8,19],[9,19],[10,19],[11,19],[13,19],[14,19],[15,19],[16,19],[17,19],[19,19],[20,19],
    [5,20],[7,20],[9,20],[15,20],[17,20],[19,20],
    [4,21],[5,21],[6,21],[7,21],[9,21],[10,21],[11,21],[13,21],[14,21],[15,21],[17,21],[18,21],[19,21],[20,21],
    [4,22],[11,22],[13,22],[20,22],
    [4,23],[5,23],[6,23],[7,23],[8,23],[9,23],[10,23],[11,23],[12,23],[13,23],[14,23],[15,23],[16,23],[17,23],[18,23],[19,23],[20,23]
];

BirthdayManager.renderMail = function(){
    for(var i =0; i<8; i++){
        var index = Math.floor(Math.random()*this.possible_location_list.length);
        var loc = this.possible_location_list.slice(index, index+1);
        $gameMap.event(12+i).setPosition(loc[0][0], loc[0][1]);
    }
    this.possible_location_list = [
        [5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[13,5],[14,5],[15,5],[16,5],[17,5],[18,5],[19,5],
        [4,6],[7,6],[11,6],[13,6],[17,6],[20,6],
        [4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[11,7],[12,7],[13,7],[14,7],[15,7],[16,7],[17,7],[18,7],[19,7],[20,7],
        [4,8],[7,8],[9,8],[15,8],[17,8],[20,8],
        [4,9],[5,9],[6,9],[7,9],[9,9],[10,9],[11,9],[13,9],[14,9],[15,9],[17,9],[18,9],[19,9],[20,9],
        [7,10],[17,10],
        [7,11],[17,11],
        [7,12],[17,12],
        [7,13],[17,13],
        [7,14],[17,14],
        [7,15],[17,15],
        [7,16],[17,16],
        [4,17],[5,17],[6,17],[7,17],[8,17],[9,17],[10,17],[11,17],[13,17],[14,17],[15,17],[16,17],[17,17],[18,17],[19,17],[20,17],
        [4,18],[7,18],[11,18],[13,18],[17,18],[20,18],
        [4,19],[5,19],[7,19],[8,19],[9,19],[10,19],[11,19],[13,19],[14,19],[15,19],[16,19],[17,19],[19,19],[20,19],
        [5,20],[7,20],[9,20],[15,20],[17,20],[19,20],
        [4,21],[5,21],[6,21],[7,21],[9,21],[10,21],[11,21],[13,21],[14,21],[15,21],[17,21],[18,21],[19,21],[20,21],
        [4,22],[11,22],[13,22],[20,22],
        [5,23],[6,23],[7,23],[8,23],[9,23],[10,23],[11,23],[12,23],[13,23],[14,23],[15,23],[16,23],[17,23],[18,23],[19,23]
    ];
}

BirthdayManager.showCounter = function(){
    var c = new Counter(3);
    SceneManager._scene.addChild(c);
}

BirthdayManager.Pacman_majo_Senteces = [
    ["{pacman_majo_sentence_1_1}","{pacman_majo_sentence_1_2}"],
    ["{pacman_majo_sentence_2_1}","{pacman_majo_sentence_2_2}","{pacman_majo_sentence_2_3}"],
    ["{pacman_majo_sentence_3_1}","{pacman_majo_sentence_3_2}"],
    ["{pacman_majo_sentence_4_1}","{pacman_majo_sentence_4_2}"],
    ["{pacman_majo_sentence_5_1}"]
]

BirthdayManager.Pacman_slayed_setences = [
    "{pacman_slayed_sentence_1}",
    "{pacman_slayed_sentence_2}",
    "{pacman_slayed_sentence_3}",
    "{pacman_slayed_sentence_4}",
    "{pacman_slayed_sentence_5}",
]
BirthdayManager.cur_majo_bag = [];
BirthdayManager.cur_majo_sentences = [];
BirthdayManager.cur_majo_index = 0;
BirthdayManager.Pacman_RenderSentences = function(){
    if(this.cur_majo_bag.length<=0){
        this.cur_majo_bag = this.Pacman_majo_Senteces.slice();
    }
    this.cur_majo_sentences = this.cur_majo_bag.splice(Math.floor(Math.random()*this.cur_majo_bag.length),1);
    this.startMessage(this.cur_majo_sentences[0][0]);
    this.cur_majo_index = 1;
}

BirthdayManager.Pacman_NextSentence = function(){
    //console.log(1);
    if(this.cur_majo_index==0||this.cur_majo_sentences[0].length<=0||this.cur_majo_index>(this.cur_majo_sentences[0].length-1)){
        return;
    }
    this.startMessage(this.cur_majo_sentences[0][this.cur_majo_index]);
    this.cur_majo_index +=1;
}

BirthdayManager.cur_slayed_bag = [];
BirthdayManager.Pacman_RenderSlayedSentences = function(){
    this.cur_majo_sentences = [];
    this.cur_majo_index = 0;
    if(this.cur_slayed_bag.length<=0){
        this.cur_slayed_bag = this.Pacman_slayed_setences.slice();
    }
    var sent = this.cur_slayed_bag.splice(Math.floor(Math.random()*this.cur_slayed_bag.length),1);
    this.startMessage(sent);
}

function Counter(){
    this.initialize.apply(this, arguments);
}

Counter.prototype = Object.create(Sprite.prototype);
Counter.prototype.constructor = Counter;

Counter.prototype.initialize = function(num){
    Sprite.prototype.initialize.call(this);
    this.num = num;
    this.actualTime = 0;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.x = Graphics.boxWidth/2;
    this.y = Graphics.boxHeight/2;
    this.scale.x = 2;
    this.scale.y = 2;
    this.bitmap = new Bitmap(64, 32);
    this.write("{get}");
}

Counter.prototype.update = function(){
    Sprite.prototype.update.call(this);
    this.actualTime+=1;
    this.scale.x = 2-this.actualTime/60;
    this.scale.y = 2-this.actualTime/60;
    if(this.actualTime>=60){
        this.actualTime = 0;
        this.num -=1;
        if(this.num==2){
            this.write("{set}");
        }
        if(this.num==1){
            this.write("{go}");
        }
    }
    if(this.num ==0){
        this.destroy();
    }
}

Counter.prototype.write = function(t){
    this.bitmap.clear();
    this.bitmap.drawText(t, 0, 0, 64, 32, 'center');
}

function Window_Result(){
    this.initialize.apply(this, arguments);
}

Window_Result.prototype = Object.create(Window_Base.prototype);
Window_Result.prototype.constructor = Window_Result;

Window_Result.prototype.initialize = function(){
    var x = Graphics.boxWidth;
    var y = BirthdayManager.upperFaceSize();
    var width = Graphics.boxWidth;
    var height = BirthdayManager.availHeight();
    Window_Base.prototype.initialize.call(this,x,y,width,height);
    this.drawText("{highest_combo}"+$gameVariables.value(18),0,0);
    this.drawText("{kill_robot_num}"+$gameVariables.value(19),0,32);
    this.drawText("-----------------------",0,64);
    this.drawText("{get_score}"+$gameVariables.value(15),0,96);

}

Window_Result.prototype.update = function(){
    Window_Base.prototype.update.call(this);
    if(this.x>0){
        this.x-=this.x/10;
    }
}

BirthdayManager.showResult = function(){
    this._window_result =new Window_Result();
    SceneManager._scene.addWindow(this._window_result);
}

BirthdayManager.hideResult = function(){
    this._window_result.destroy();
}

function Sprite_Brand(){
    this.initialize.apply(this, arguments);
}

Sprite_Brand.prototype = Object.create(Sprite.prototype);
Sprite_Brand.prototype.constructor = Sprite_Brand;

Sprite_Brand.prototype.initialize = function(){
    Sprite.prototype.initialize.call(this);
    this.bitmap = new Bitmap(Graphics.boxWidth, 32);
    this.anchor.x = 1;
    this.x = Graphics.boxWidth;
}

Sprite_Brand.prototype.drawText = function(t){
    this.bitmap.clear();
    this.bitmap.drawText(t,0,0, Graphics.boxWidth, 32, "right");
}


function Sprite_Combo(){
    this.initialize.apply(this, arguments);
}

Sprite_Combo.prototype = Object.create(Sprite_Brand.prototype);
Sprite_Combo.prototype.constructor = Sprite_Combo;

Sprite_Combo.prototype.initialize = function(){
    Sprite_Brand.prototype.initialize.call(this);
    this.y = BirthdayManager.upperFaceSize();
}

Sprite_Combo.prototype.drawCombo = function(num){
    this.drawText("{Combo}X"+num+" ");
}

BirthdayManager.showCombo = function(){
    this._sprite_combo = new Sprite_Combo();
    SceneManager._scene.addChild(this._sprite_combo);
}

BirthdayManager.hideCombo = function(){
    if(this._sprite_combo){
        this._sprite_combo.destroy();
        this._sprite_combo = null;
    }
}

function Sprite_Score(){
    this.initialize.apply(this, arguments);
}

Sprite_Score.prototype = Object.create(Sprite_Brand.prototype);
Sprite_Score.prototype.constructor = Sprite_Score;

Sprite_Score.prototype.initialize = function(){
    Sprite_Brand.prototype.initialize.call(this);
    this.y = BirthdayManager.messY()-32;
}

Sprite_Score.prototype.drawScore = function(num){
    this.drawText("{get_score}"+num+" ");
}

Sprite_Score.prototype.update = function(){
    Sprite_Brand.prototype.update.call(this);
    this.drawScore($gameVariables.value(15));
}

BirthdayManager.showScore = function(){
    this._sprite_score = new Sprite_Score();
    SceneManager._scene.addChild(this._sprite_score);
}

BirthdayManager.hideScore = function(){
    this._sprite_score.destroy();
    this._sprite_score = null;
}
//--------------------------------------------

BirthdayManager.getTachiRate = function(){
    var xrate = Graphics.boxWidth/375;
    var yrate = Graphics.boxHeight/812;
    var rate = (Graphics.boxWidth<Graphics.boxHeight)?(xrate):(yrate);
    if(rate>=2){
       rate = 2;
    }
    return rate;
}

BirthdayManager.already1 = false;

BirthdayManager.already2 = false;

BirthdayManager.pics = 0;

BirthdayManager.tachiOrder = [];

BirthdayManager.arrangeTachi = function(){
    if(!this.delayDisappear){
        for(var i=0; i<this.tachiOrder.length-2; i++){
            this.removeTachi(this.tachiOrder[i]);
        }
    }
    if(this.tachiOrder.length>=2){
        if(this.delayDisappear){
            this.deactivateTachi(this.tachiOrder[this.tachiOrder.length-2],"left")
        }else{
            for(var i = 0; i< this.tachiOrder.length-1; i++){
                this.diminishTachi(this.tachiOrder[i],"left");
            }
        }
    }
    if(this.delayDisappear){
        this.delayDisappear=false;
    }
}

BirthdayManager.showTachi = function(id, name, emoji, position){
    //console.log(SceneManager._scene._messageWindow.y);
    var root = "tachi/"
    var picheight = 540;
    var picwidth = 300;
    var rate = this.getTachiRate();
    //console.log(rate);
    var y = Graphics.boxHeight-(277*rate)-SceneManager._scene._messageWindow.height;
    var leftx;
    if(name.includes("koyori")||name.includes("mashiro")){
        leftx = -20*rate
    }else{
        leftx = 0;
    }
    var x = Graphics.boxWidth-(162.5*rate);
    //var seq = this.pics*20;
    var actualwidth = picwidth*0.65*rate;
    //var actualheight = picheight*0.65*rate;
    if(!emoji){
        emoji = "normal";
    }
    if(position=="left"){
        //this.tachiOrder.push(id);
        //this.arrangeTachi();
        $gameScreen.showPicture(id, root+name, 0, -actualwidth+leftx, y, 65*rate, 65*rate, 0, 0);
        $gameScreen.showPicture(id+1, root+emoji, 0, -actualwidth+leftx, y, 65*rate, 65*rate, 0, 0);
        $gameScreen.movePicture(id, 0, leftx, y, 65*rate, 65*rate, 255, 0, 30);
        $gameScreen.movePicture(id+1, 0, leftx, y, 65*rate, 65*rate, 255, 0, 30);

    }else if(position =="right"){
        $gameScreen.showPicture(id, root+name, 0, x+actualwidth, y, 65*rate, 65*rate, 0, 0);
        $gameScreen.showPicture(id+1, root+emoji, 0, x+actualwidth, y, 65*rate, 65*rate, 0, 0);
        $gameScreen.movePicture(id, 0, x, y, 65*rate, 65*rate, 255, 0, 30);
        $gameScreen.movePicture(id+1, 0, x, y, 65*rate, 65*rate, 255, 0, 30);
    }
}

BirthdayManager.changeEmoji = function(id, emoji, position){
    var rate = this.getTachiRate();
    var root = "tachi/"
    //console.log(rate);
    var y = Graphics.boxHeight-(277*rate)-SceneManager._scene._messageWindow.height;
    var x = Graphics.boxWidth-(162.5*rate);
    var leftx;
    if(emoji.includes("koyori")||emoji.includes("mashiro")){
        leftx = -20*rate
    }else{
        leftx = 0;
    }
    if(position=="left"){
        //$gameScreen.erasePicture(id+1);
        $gameScreen.showPicture(id+1, root+emoji, 0, leftx, y, 65*rate, 65*rate, 255, 0);
    }
    if(position=="right"){
        //$gameScreen.erasePicture(id+1);
        $gameScreen.showPicture(id+1, root+emoji, 0, leftx, y, 65*rate, 65*rate, 255, 0);
    }
}

BirthdayManager.forwardTachi = function(id, position, times){
    var rate = this.getTachiRate();
    //console.log(rate);
    var y = Graphics.boxHeight-(277*rate)-SceneManager._scene._messageWindow.height;
    var x = Graphics.boxWidth-(162.5*rate);
    if(position=="left"){
        $gameScreen.movePicture(id, 0, 50*times*rate, y, 65*rate, 65*rate, 255, 0, 30);
        $gameScreen.movePicture(id+1, 0, 50*times*rate, y, 65*rate, 65*rate, 255, 0, 30);
    }
    if(position=="right"){
        $gameScreen.movePicture(id, 0, x-50*times*rate, y, 65*rate, 65*rate, 255, 0, 30);
        $gameScreen.movePicture(id+1, 0, x-50*times*rate, y, 65*rate, 65*rate, 255, 0, 30);
    }
}

BirthdayManager.diminishTachi = function(id, position){
    var rate = this.getTachiRate();
    //console.log(rate);
    var y = Graphics.boxHeight-(277*rate)-SceneManager._scene._messageWindow.height;
    var x = Graphics.boxWidth-(162.5*rate);
    if(position=="left"){
        $gameScreen.movePicture(id, 0, -100*rate, y, 65*rate, 65*rate, 0, 0, 30);
        $gameScreen.movePicture(id+1, 0, -100*rate, y, 65*rate, 65*rate, 0, 0, 30);
    }
    if(position=="right"){
        $gameScreen.movePicture(id, 0, x+100*rate, y, 65*rate, 65*rate, 0, 0, 30);
        $gameScreen.movePicture(id+1, 0, x+100*rate, y, 65*rate, 65*rate, 0, 0, 30);
    }
}

BirthdayManager.removeTachi = function(id){
    $gameScreen.erasePicture(id);
    $gameScreen.erasePicture(id+1);
}

BirthdayManager.removeAllTachi = function(){
    for(var i=0; i<this.tachiOrder.length; i++){
        var id = this.tachiOrder[i];
        $gameScreen.erasePicture(id);
        $gameScreen.erasePicture(id+1);
    }
}

BirthdayManager.activateTachi = function(id, position){
    var rate = this.getTachiRate();
    //console.log(rate);
    var y = Graphics.boxHeight-(277*rate)-SceneManager._scene._messageWindow.height;
    var x = Graphics.boxWidth-(162.5*rate);
    if(position=="left"&&this.already1){
        $gameScreen.movePicture(id, 0, 0, y, 65*rate, 65*rate, 255, 0, 30);
        $gameScreen.movePicture(id+1, 0, 0, y, 65*rate, 65*rate, 255, 0, 30);
    }
    if(position=="right"&&this.already2){
        $gameScreen.movePicture(id, 0, x, y, 65*rate, 65*rate, 255, 0, 30);
        $gameScreen.movePicture(id+1, 0, x, y, 65*rate, 65*rate, 255, 0, 30);
    }
}

BirthdayManager.isOnTask = false;
BirthdayManager.currentTask = null;
BirthdayManager.setTaskText = function(txt){
    SceneManager._scene._TaskWindow.terminateMessage();
    this.currentTask = txt;
    $gameVariables.setValue(40, DKTools.Localization.getText("<WordWrap>"+txt));
    //SceneManager._scene._TaskWindow.startMessage(DKTools.Localization.getText("<WordWrap>"+txt));
}

//窗口大小
SceneManager.setWindowSize = function(){
    if(window.screen.availWidth<window.innerWidth){
        var w = window.screen.availWidth;
    }else{
        var w = window.innerWidth;
    }

    if(window.screen.availHeight<window.innerHeight){
        var h = window.screen.availHeight;
    }else{
        var h = window.innerHeight;
    }
    this._screenWidth =w;
    this._boxWidth = w;
    this._boxHeight = h;
    this._screenHeight = h;
}

//SceneManager.preferableRendererType = function() {
//    if (Utils.isOptionValid('canvas')) {
//        return 'canvas';
 //   } else if (Utils.isOptionValid('webgl')) {
//        return 'webgl';
 //   } else {
    //    return 'canvas';
 //   }
//};

//Window_TitleCommand
BirthdayManager.temps._Window_TitleCommand_updatePlacement = Window_TitleCommand.prototype.updatePlacement;
Window_TitleCommand.prototype.updatePlacement = function() {
    BirthdayManager.temps._Window_TitleCommand_updatePlacement.call(this);
    this.x = (Graphics.boxWidth-this.width)/2;
    this.y =Graphics.boxHeight-this.fittingHeight(6);
    this.setBackgroundType(2);
};

Window_TitleCommand.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

BirthdayManager.temps._Window_TitleCommand_prototype_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    BirthdayManager.temps._Window_TitleCommand_prototype_makeCommandList.call(this);
    this.addCommand("{interface_language}","chooseLanguage");
    this.addCommand("{credits}",  'credits');
};

BirthdayManager.temps._Scene_Title_prototype_createCommandWindow = Scene_Title.prototype.createCommandWindow
Scene_Title.prototype.createCommandWindow = function() {
    BirthdayManager.temps._Scene_Title_prototype_createCommandWindow.call(this);
    this._commandWindow.setHandler("chooseLanguage", this.commandChooseLanguage.bind(this));
    this._commandWindow.setHandler('credits',  this.commandCredits.bind(this));
};

Scene_Title.prototype.commandCredits = function() {
    this._commandWindow.close();
    SceneManager.push(Scene_Credits);
};

Scene_Title.prototype.commandChooseLanguage = function(){
    this._commandWindow.close();
    SceneManager.push(Scene_ChooseLanguage);
}

//Scene_Credits
function Scene_Credits(){
    this.initialize.apply(this, arguments);
}


Scene_Credits.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Credits.prototype.constructor = Scene_Credits;

Scene_Credits.prototype.create = function(){
    Scene_MenuBase.prototype.create.call(this);
    this._window_credits = new Window_Credits();
    this._window_credits.startMessage("{Credits_Table}");
    this.addChild(this._window_credits);
    //AchievementManager.unlock(20);
    BirthdayManager.unlockAchievement(20);
}

Scene_Credits.prototype.createBackground = function() {
    Scene_MenuBase.prototype.createBackground.call(this);
    //this._backgroundSprite.bitmap.fillAll('black')
};

function Window_Credits(){
    this.initialize.apply(this, arguments);
}

Window_Credits.prototype = Object.create(Window_ScrollText.prototype);
Window_Credits.prototype.constructor = Window_Credits;

Window_Credits.prototype.initialize = function(){
    Window_ScrollText.prototype.initialize.call(this);
}

Window_Credits.prototype.startMessage = function(t) {
    this._text = DKTools.Localization.getText(t);
    this.refresh();
    this.show();
};

Window_Credits.prototype.standardFontSize = function(){
    return BirthdayManager.getFontSize();
}

Window_Credits.prototype.update = function() {
    Window_Base.prototype.update.call(this);
        if (this._text) {
            this.updateMessage();
        }
};

Window_Credits.prototype.terminateMessage = function() {
    this._text = null;
    $gameMessage.clear();
    this.hide();
    SceneManager._scene.popScene();
};



//制作上下窗口
BirthdayManager.temps._Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    this.hidingCount = 0;
    this.showingCount = 0;
    BirthdayManager.temps._Scene_Map_createAllWindows.call(this);
    var upperFaceSize = Graphics.boxHeight/6
    this._TaskWindow = new Window_Task();
    //this._TaskWindow.drawText("任务……", 0, 0);
    this._FaceWindow = new Window_Face(upperFaceSize);
    this._button1 = new Window_Side_Backup(0, this._messageWindow.y , Graphics.boxWidth*(1/5), this._messageWindow.height/2);
    this._button2 = new Window_Side_Options(0, this._messageWindow.y+this._messageWindow.height/2 , Graphics.boxWidth*(1/5), this._messageWindow.height/2);
    //this._CakeListWindow = new Window_CakeList(upperFaceSize);
    this.addWindow(this._TaskWindow);
    this.addWindow(this._FaceWindow);
        this._InfoWindow = new Window_Info();
    this.addWindow(this._InfoWindow);
    this.addWindow(this._button1);
    this.addWindow(this._button2);

    //this.addWindow(this._CakeListWindow);
};

Scene_Map.prototype.hideAllWindows = function(){
    this.hidingWindows = true;
}

Scene_Map.prototype.showAllWindows = function(){
    this._messageWindow.x = Graphics.boxWidth;
    this._messageWindow.width = this._messageWindow.windowWidth();
    this.showingWindows = true;
}

BirthdayManager.temps.Scene_Map_prototype_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function(){
    BirthdayManager.temps.Scene_Map_prototype_update.call(this);
    if(this.hidingWindows){
        if(this.hidingCount<60){
            this.hidingCount+=1;
            var disctance = Graphics.boxWidth/60;
            this._TaskWindow.x -= disctance;
            this._FaceWindow.x -= disctance;

            this._messageWindow.x+=disctance;
            this._InfoWindow.x+=disctance;
            this._button1.x+=disctance;
            this._button1.deactivate();
            this._button2.x+=disctance;
            this._button2.deactivate();

        }else{
            this.hidingCount = 0;
            this.hidingWindows = false;
            this._button1.activate();
            this._button2.activate();
        }
    }

    if(!this.hidingWindows&&this.showingWindows){
        if(this.showingCount<60){
            this.showingCount+=1;
            var disctance = Graphics.boxWidth/60;
            this._TaskWindow.x += disctance;
            this._FaceWindow.x += disctance;

            this._messageWindow.x =(Graphics.boxWidth - this._messageWindow.windowWidth()+ Graphics.boxWidth*(1/5)) / 2+Graphics.boxWidth-disctance*this.showingCount;
            this._InfoWindow.x-=disctance;
            this._button1.x-=disctance;
            this._button1.deactivate();
            this._button2.x-=disctance;
            this._button2.deactivate();
        }else{
            this.showingCount=0;
            this.showingWindows = false;
            this._button1.activate();
            this._button2.activate();
        }
    }

}

BirthdayManager.temps._Scene_Map_createWindowLayer = Scene_Map.prototype.createWindowLayer;
Scene_Map.prototype.createWindowLayer = function(){
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    var x = (Graphics.width - width) / 2;
    var y = (Graphics.height - height) / 2;
    this._CakeSceneWindowLayer = new WindowLayer();
    this._CakeSceneWindowLayer.move(x, y, width, height);
    this.addChild(this._CakeSceneWindowLayer);
    BirthdayManager.temps._Scene_Map_createWindowLayer.call(this);
}

Scene_Map.prototype.addWindowToCakeScene = function(w){
    this._CakeSceneWindowLayer.addChild(w);
}

Scene_Map.prototype.removeWindowFromCakeScene = function(w){
    this._CakeSceneWindowLayer.removeChild(w);
}

BirthdayManager.changeFace = function(name){
    SceneManager._scene._FaceWindow.change(name);
}

//头像窗口
BirthdayManager.currentFace = "koyori";

function Window_Face(){
    this.initialize.apply(this, arguments);
}

Window_Face.prototype = Object.create(Window_Base.prototype);
Window_Face.prototype.constructor = Window_Face;

Window_Face.prototype.initialize = function(upperFaceSize){
    var x = 0;
    var y = 0;
    var width = upperFaceSize;
    var height = upperFaceSize;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._faceSprite = new Sprite();
    this._faceSprite.x+=18;
    this._faceSprite.y+=18;
    this.addChild(this._faceSprite);
    this.change(BirthdayManager.currentFace);
}

Window_Face.prototype.change = function(name){
    switch(name){
        case "mea":
            this._faceSprite.bitmap = ImageManager.loadFace("mea");
            break;
        case "koyori":
            this._faceSprite.bitmap = ImageManager.loadFace("koyori");
            break;
        case "noe":
            this._faceSprite.bitmap = ImageManager.loadFace("noe");
            break
        case "mashiro":
            this._faceSprite.bitmap = ImageManager.loadFace("mashiro");
            break
    }
    BirthdayManager.currentFace = name;

    this._faceSprite.scale.x = (this.width-36) / 144;
    this._faceSprite.scale.y = (this.height-36) / 144;
}

BirthdayManager.boundary_pic = ImageManager.loadPicture("cellphone");
BirthdayManager.boundary_back = ImageManager.loadPicture("cellphoneback");
//蛋糕菜单

function Scene_CakeReceipt(){
    this.initialize.apply(this, arguments);
}

Scene_CakeReceipt.prototype = Object.create(Scene_MenuBase.prototype);
Scene_CakeReceipt.prototype.constructor = Scene_CakeReceipt;

function Window_CakeReceipt(){
    this.initialize.apply(this, arguments);
}

Window_CakeReceipt.prototype = Object.create(Window_Base.prototype);
Window_CakeReceipt.prototype.constructor = Window_CakeReceipt;

Window_CakeReceipt.prototype.initialize = function(){
    var x = 10;
    var y = Graphics.boxHeight+10;
    this.counter = 0;
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    //this.refresh();
    this.activate();
    this.opacity = 0;
    this.backOpacity = 0;
    this._windowFrameSprite.opacity = 0;
    //this.drawAllCakes();
    this.drawBoundary();
}

Window_CakeReceipt.prototype.drawBoundary = function(){
    var xrate = this.windowWidth()/579;
    var yrate = this.windowHeight()/1125;

    var side = 23*xrate;

    this.boundary_sprite = new Sprite(new Bitmap(this.windowWidth(), this.windowHeight()));
    this.boundary_sprite.bitmap.blt(BirthdayManager.boundary_back, 0, 0, 579, 1125, 0, 0, this.windowWidth(), this.windowHeight());
    var uw = 103*yrate;
    var uh = 24*yrate;
    var ubh = 42*yrate;
    this.boundary_sprite.bitmap.blt(BirthdayManager.boundary_pic, 235, 8, 103, 24, (this.windowWidth()-uw)/2, (ubh-uh)/2, uw, uh);
    var lw = 470*yrate;
    var lh = 88*yrate;
    var lbh = 92*yrate;
    this.boundary_sprite.bitmap.blt(BirthdayManager.boundary_pic, 59, 1035, 470, 88, (this.windowWidth()-lw)/2, 1035*yrate+(lbh-lh)/2, lw, lh);
    
    var wifiw = 21*yrate;
    var wifih = 19*yrate;
    var wifibd = 3*yrate;
    var wifibh = 23*yrate;
    this.boundary_sprite.bitmap.blt(BirthdayManager.boundary_pic, 532, 44, 21, 19, this.windowWidth()-side-wifibd-wifiw, ubh+(wifibh-wifih)/2, wifiw, wifih);
    //this.addChild(this.boundary_sprite);
    this.boundary_sprite.opacity = 0;

    var uth = 59*yrate;
    var uppertext = new Sprite(new Bitmap(200, uth));
    uppertext.anchor.y = 0.5;
    uppertext.bitmap.drawText("{cakeReceipt}",0,0,200, uth, "left");
    uppertext.move(side+5, ubh+wifibh+uth/2);
    this.boundary_sprite.addChild(uppertext);

    var lowerText = new Sprite(new Bitmap(48, 48));
    lowerText.anchor.x = 0.5;
    lowerText.anchor.y = 0.5;
    lowerText.bitmap.drawText("{return}",0,0, 48,48,"center");
    lowerText.move(this.windowWidth()/2, 1035*yrate+lbh/2);
    this.boundary_sprite.addChild(lowerText);


    var buttonareaW = 80*yrate;
    var buttonareaH = 80*yrate;
    this.buttonarea = {
        x: (this.windowWidth()-buttonareaW)/2,
        y: 1035*yrate+(lbh-buttonareaH)/2,
        width: buttonareaW,
        height: buttonareaH
    }
    var tbh = 123*yrate;
    this.display_window =new Window_CakeReceiptDisplay(23*xrate, tbh, this.width-2*23*xrate, this.height-tbh-lbh);
    this.addChild(this.display_window);
    this.addChild(this.boundary_sprite);

}

Window_CakeReceipt.prototype.checkTouch = function(){
    if (TouchInput.isTriggered()){
        if(TouchInput.x>this.x+this.buttonarea.x
            &&TouchInput.x<this.x+this.buttonarea.x+this.buttonarea.width
            &&TouchInput.y>this.y+this.buttonarea.y
            &&TouchInput.y<this.y+this.buttonarea.y+this.buttonarea.height){
                if(!this.isexiting){
                    this.exit();
                }
            }
    }
}

Window_CakeReceipt.prototype.exit = function(){
    $gameSwitches.setValue(37, true);
    this.isexiting = true;
}

Window_CakeReceipt.prototype.windowWidth = function(){
    return Graphics.boxWidth - 20;
}

Window_CakeReceipt.prototype.windowHeight = function(){
    return Graphics.boxHeight -20;
}

Window_CakeReceipt.prototype.update = function(){
    Window_Base.prototype.update.call(this);
    if(this.counter<60&&!this.isexiting){
        this.y-=Graphics.boxHeight/60;
        this.opacity+=255/60;
        this.boundary_sprite.opacity+=255/60;
        this.display_window.opacity+=255/60;
        //this.refresh();
        this.counter +=1;
    }
    if(this.counter>=60){
        this.checkTouch();
    }

    if(this.isexiting){
        this.y+=Graphics.boxHeight/60;
        this.opacity-=255/60;
        this.boundary_sprite.opacity-=255/60;
        this.display_window.opacity-=255/60;
        this.counter-=1;
        if(this.counter<=0){
            this.destroy();
        }
    }

}

function Window_CakeReceiptDisplay(){
    this.initialize.apply(this, arguments);
}

Window_CakeReceiptDisplay.prototype = Object.create(Window_Command.prototype);
Window_CakeReceiptDisplay.prototype.constructor = Window_CakeReceiptDisplay;

Window_CakeReceiptDisplay.prototype.initialize = function(x, y, width, height){
    var index = 0;
    this.piclist = {};
    for(key in BirthdayManager.allCakes){
        //console.log(BirthdayManager.allCakes[key].image);
        if(key=="3"||key=="4"||key=="5"){
            continue;
        }
        this.piclist[index] = ImageManager.loadPicture("cakes/"+BirthdayManager.allCakes[key].image);
        index+=1;
    }
    this.clearCommandList();
    this.makeCommandList();
    this.wwidth = width;
    this.hheight = height;
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
    this.activate();
}

Window_CakeReceiptDisplay.prototype.update  =function(){
    Window_Command.prototype.update.call(this);
    //console.log(this.piclist);
}

Window_CakeReceiptDisplay.prototype.windowWidth = function(){
    return this.wwidth;
}

Window_CakeReceiptDisplay.prototype.windowHeight = function(){
    return this.hheight;
}

BirthdayManager.ReceiptBack = ImageManager.loadSystem("Window_Phone");
Window_CakeReceiptDisplay.prototype.loadWindowskin = function() {
    this.windowskin = BirthdayManager.ReceiptBack;
};

Window_CakeReceiptDisplay.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawTextEx(this.commandName(index), rect.x, rect.y, rect.width, align);
    if(this.piclist[index]){
        this.contents.blt(this.piclist[index],0,0,96,96,rect.x-this.itemHeight()-this.padding/2, rect.y, this.itemHeight(),this.itemHeight());
    }

    var ctx = this.contents._context;
    ctx.beginPath();
    ctx.moveTo(rect.x-this.itemHeight()-this.padding/2, rect.y);
    ctx.lineTo(rect.x-this.itemHeight()+rect.width, rect.y);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(rect.x-this.itemHeight()-this.padding/2, rect.y+rect.height);
    ctx.lineTo(rect.x-this.itemHeight()+rect.width, rect.y+rect.height);
    ctx.stroke();
    ctx.closePath();
};

Window_CakeReceiptDisplay.prototype.itemHeight = function() {
    return 3*this.lineHeight();
};

Window_CakeReceiptDisplay.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    var maxCols = this.maxCols();
    rect.width = this.itemWidth();
    rect.height = this.itemHeight();
    var yoffset = ((this.height-2*this.padding)-this.maxPageRows()*rect.height)/2
    rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX+this.itemHeight();
    rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY+ yoffset;
    return rect;
};

Window_CakeReceiptDisplay.prototype.makeCommandList = function(){
    for(key in BirthdayManager.allCakes){
        if(key=="3"||key=="4"||key=="5"){
            continue;
        }
        var words = key.split('}{');
        words[0] = words[0].substring(1, words[0].length);
        words[words.length-1] = words[words.length-1].substring(0, words[words.length-1].length-1);
        //console.log(words);
        var material = "<WordWrap>{material}";
        for(var i=0; i<words.length; i++){
            material+="{"+words[i]+"}";
            if(i<words.length-1){
                material+="+";
            }
        }
        this.addCommand(BirthdayManager.allCakes[key].name+"\n"+material, key);
    }

}

//蛋糕编辑窗口
BirthdayManager.allCakes = {
    "3":{
        name:"{Unpretentious_Cake}",
        image:"朴实无华的蛋糕",
        bitmap: ImageManager.loadPicture("cakes/"+"朴实无华的蛋糕")
    },
    "4":{
        name:"{Fragrant_Cake}",
        image:"香气扑鼻的蛋糕",
        bitmap: ImageManager.loadPicture("cakes/"+"香气扑鼻的蛋糕")
    },
    "5":{
        name:"{Alluring_Cake}",
        image:"惹人垂涎的蛋糕",
        bitmap: ImageManager.loadPicture("cakes/"+"惹人垂涎的蛋糕")
    },
    "{Strawberry}{Cream}{WhiteChocolate}":{
        name: "{Loving_Lily_Heart}",
        image:"纯白恋心",
        bitmap: ImageManager.loadPicture("cakes/"+"纯白恋心")
    },
    "{Blueberry}{Cream}{Cheese}":{
        name:"{Blue_Ice_of_Snowfield}",
        image:"雪域蓝冰",
        bitmap: ImageManager.loadPicture("cakes/"+"雪域蓝冰")
    },
    "{Icing}{VanillaEssentialOil}{MatchaPowder}":{
        name:"{Vanilla_Rime}",
        image:"香草青淞",
        bitmap: ImageManager.loadPicture("cakes/"+"香草青淞")
    },
    "{Syrup}{CherryBlossoms}{Yogurt}":{
        name:"{Sour-sweet_Sakura}",
        image:"酸甜樱色",
        bitmap: ImageManager.loadPicture("cakes/"+"酸甜樱色")
    },
    "{Cream}{ChoppedNuts}{DarkChocolate}":{
        name:"{Moonlit_Snow_on_Rock}",
        image:"月夜岩雪",
        bitmap: ImageManager.loadPicture("cakes/"+"月夜岩雪")
    },
    "{Strawberry}{Cream}{DarkChocolate}":{
        name:"{Blazing_Heart}",
        image:"烈焰红心",
        bitmap: ImageManager.loadPicture("cakes/"+"烈焰红心")
    },
    "{Cream}{Cherry}{DarkChocolate}":{
        name:"{Cherry_Sunk_in_Snow}",
        image:"沉雪林樱",
        bitmap: ImageManager.loadPicture("cakes/"+"沉雪林樱")
    },
    "{Cream}{Icing}{MatchaPowder}":{
        name:"{Matcha_Adorned_Frost}",
        image:"抹茶千霜",
        bitmap: ImageManager.loadPicture("cakes/"+"抹茶千霜")
    },
    "{Blueberry}{Lemon}{WhiteChocolate}":{
        name:"{Polar_Blue_Lemon}",
        image:"极地蓝柠",
        bitmap: ImageManager.loadPicture("cakes/"+"极地蓝柠")
    },
    "{Blueberry}{Cream}{VanillaEssentialOil}":{
        name:"{Azure_Aroma}",
        image:"空色香馨",
        bitmap: ImageManager.loadPicture("cakes/"+"空色香馨")
    },
    "{Strawberry}{Cream}{GlutinousRice}":{
        name:"{Flaming_Rose}",
        image:"火红玫瑰",
        bitmap: ImageManager.loadPicture("cakes/"+"火红玫瑰")
    },
    "{Strawberry}{CherryBlossoms}{Marshmallow}":{
        name:"{Love_of_Sweetheart}",
        image:"甜心之恋",
        bitmap: ImageManager.loadPicture("cakes/"+"甜心之恋")
    },
    "{Cream}{CherryBlossoms}{Marshmallow}":{
        name:"{Gooey_Cloud_of_Sakura}",
        image:"软绵樱云",
        bitmap: ImageManager.loadPicture("cakes/"+"软绵樱云")
    },
    "{Syrup}{Mint}{CoconutShred}{SeaSalt}":{
        name:"{Cool_Beach}",
        image:"清凉海滩",
        bitmap: ImageManager.loadPicture("cakes/"+"清凉海滩")
    },
    "{Strawberry}{Cream}{Cherry}{Cheese}":{
        name:"{French_Sweet_Berries}",
        image:"法式甜梅",
        bitmap: ImageManager.loadPicture("cakes/"+"法式甜梅")
    },
    "{Strawberry}{Blueberry}{Cherry}{Yogurt}":{
        name:"{Tricolor_Snowflakes}",
        image:"三色雪晶",
        bitmap: ImageManager.loadPicture("cakes/"+"三色雪晶")
    },
    "{Cream}{Icing}{Mint}{Yogurt}":{
        name:"{Polar_Frost}",
        image:"极地冰霜",
        bitmap: ImageManager.loadPicture("cakes/"+"极地冰霜")
    },
    "{Cream}{CocoaPowder}{CoffeeLiqueur}{Cheese}":{
        name:"{Tiramisu}",
        image:"提拉米苏",
        bitmap: ImageManager.loadPicture("cakes/"+"提拉米苏")
    },
    "{Icing}{VanillaEssentialOil}{MatchaPowder}{DarkChocolate}":{
        name:"{Dawn_and_Fireflies}",
        image:"黎明与萤火",
        bitmap: ImageManager.loadPicture("cakes/"+"黎明与萤火")
    },
    "{Strawberry}{RedBeans}{Rose}{CherryBlossoms}":{
        name:"{Flamingo}",
        image:"火烈鸟",
        bitmap: ImageManager.loadPicture("cakes/"+"火烈鸟")
    },
    "{CherryBlossoms}{VanillaEssentialOil}{Marshmallow}{MatchaPowder}":{
        name:"{Tea_Boiled_Sakura_Cloud}",
        image:"茶煮云樱",
        bitmap: ImageManager.loadPicture("cakes/"+"茶煮云樱")
    },
    "{RedBeans}{GlutinousRice}{JujubePreserve}{CherryBlossoms}":{
        name:"{Preserve_and_Rice_Dumpling}",
        image:"樱蜜粽籺",
        bitmap: ImageManager.loadPicture("cakes/"+"樱蜜粽籺")
    },
    "{Cherry}{CocoaPowder}{Reore}{DarkChocolate}":{
        name:"{Clever_Witch}",
        image:"精灵魔女",
        bitmap: ImageManager.loadPicture("cakes/"+"精灵魔女")
    },
    "{Blueberry}{Cream}{Rose}{Grape}":{
        name:"{Purple_Passion}",
        image:"紫色激情",
        bitmap: ImageManager.loadPicture("cakes/"+"紫色激情")
    },
    "{SeaSalt}{Lamb}{Onion}{LaoBaigan}":{
        name:"{Complambcent_Onion}",
        image:"得意羊洋",
        bitmap: ImageManager.loadPicture("cakes/"+"得意羊洋")
    },
    "{GreenPepper}{RedPepper}{SoySauce}{Tenderloin}":{
        name:"{Sauteed_Shredded_Pork_with_Green_Pepper}",
        image:"青椒肉丝",
        bitmap: ImageManager.loadPicture("cakes/"+"青椒肉丝")
    },
    "{SeaSalt}{Onion}{RedPepper}{Cheese}":{
        name:"{Italian_Pizza}",
        image:"意式披萨",
        bitmap: ImageManager.loadPicture("cakes/"+"意式披萨")
    },
    "{LaoBaigan}{Rum}{CoffeeLiqueur}{DarkChocolate}":{
        name:"{3_oclock}",
        image:"凌晨三点",
        bitmap: ImageManager.loadPicture("cakes/"+"凌晨三点")
    },
    "{Strawberry}{Mango}{Yogurt}{Grape}{SeaSalt}":{
        name:"{Maldivian_Summer}",
        image:"马尔代夫夏日风情",
        bitmap: ImageManager.loadPicture("cakes/"+"马尔代夫夏日风情")
    },
    "{Strawberry}{Cream}{CherryBlossoms}{VanillaEssentialOil}{MatchaPowder}":{
        name:"{Hirosaki_Sakura}",
        image:"青森弘前星夜樱华",
        bitmap: ImageManager.loadPicture("cakes/"+"青森弘前星夜樱华")
    },
    "{Strawberry}{Cream}{CherryBlossoms}{Mango}{Rum}":{
        name:"{Brittany_Strawberry_Milk}",
        image:"布列塔尼草莓牛奶",
        bitmap: ImageManager.loadPicture("cakes/"+"布列塔尼草莓牛奶")
    },
    "{Blueberry}{Lemon}{SeaSalt}{Reore}{Cheese}":{
        name:"{Bourbon_Royal_Salty_Cheese}",
        image:"波旁皇家海盐乳酪",
        bitmap: ImageManager.loadPicture("cakes/"+"波旁皇家海盐乳酪")
    },
    "{Icing}{VanillaEssentialOil}{Grape}{Marshmallow}{DarkChocolate}":{
        name:"{Aurora_Icing_Mille_Crepe}",
        image:"阿芙乐尔糖霜千层",
        bitmap: ImageManager.loadPicture("cakes/"+"阿芙乐尔糖霜千层")
    },
    "{Cream}{ChoppedNuts}{Mango}{Lemon}{WhiteChocolate}":{
        name:"{Bavarian_Cream_Pudding}",
        image:"巴伐利亚奶油布丁",
        bitmap: ImageManager.loadPicture("cakes/"+"巴伐利亚奶油布丁")
    },
    "{Rose}{SeaSalt}{LaoBaigan}{Rum}{CoffeeLiqueur}":{
        name:"{Parting_Glass_in_Pavilion}",
        image:"长亭十里别酒一杯",
        //bitmap: ImageManager.loadPicture("cakes/"+"长亭十里别酒一杯")
    }
}

BirthdayManager.openCakeSelection = function(){
    var cw = SceneManager._scene._CakeListWindow;
    cw.visible = true;
    cw.refresh();
    cw.activate();
}

BirthdayManager.closeCakeSelection = function(){
    var cw = SceneManager._scene._CakeListWindow;
    cw.visible = false;
    cw.refresh();
    cw.deactivate();
}

function Window_CakeList(){
    this.initialize.apply(this, arguments);
}

Window_CakeList.prototype = Object.create(Window_ItemList.prototype);
Window_CakeList.prototype.constructor = Window_CakeList;

Window_CakeList.prototype.initialize = function(x, y, width, height){
    var message_window = SceneManager._scene._messageWindow;
    Window_ItemList.prototype.initialize.call(this, x, y, width, height-this.fittingHeight(1));
    this._confirm_window = new Window_Confirm(0, height-this.fittingHeight(1), width, this.fittingHeight(1));
    this._confirm_window.setHandler("add", this.addToSelection.bind(this));
    //this._confirm_window.setHandler("remove", this.removeFromSelection.bind(this));
    this._confirm_window.setHandler("finish", this.finishSelection.bind(this));
    this._finalConfirm_window = new Window_FinalConfirm(0, 0, width, height);
    this._finalConfirm_window.setHandler("return", this.returnToSelection.bind(this));
    this._finalConfirm_window.setHandler("confirm", this.returnToFuture.bind(this));
    
    this.addChild(this._confirm_window);
    this.addChild(this._finalConfirm_window);
    //this.drawText("temp", 0, 0);
    this._category = "item";
    this.visible = false;
    this._selectionList = [];
    this.keyNum = 0;
    this.deactivate();
    BirthdayManager.startMessage("{Day1_masterial_added_1}");
}

Window_CakeList.prototype.drawItem = function(index) {
    var item = this._data[index];
    if (item) {
        //console.log(item);
        var numberWidth = this.numberWidth();
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
        this.changePaintOpacity(this.isEnabled(item));
        this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
        //this.drawItemNumber(item, rect.x, rect.y, rect.width);
        if(this._selectionList.contains(index)){
            var size = 20
            this.contents.blt(ImageManager.loadSystem("selected"),0,0,size,size,this.width-this.padding*2-size, rect.y+(rect.height-size)/2);
        }
        this.changePaintOpacity(1);
    }
};

Window_CakeList.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    var maxCols = this.maxCols();
    rect.width = this.itemWidth();
    rect.height = this.itemHeight();
    rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
    rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY +(this.height-Math.floor(this.height/rect.height)*rect.height)/2;
    //console.log((this.height-Math.floor(this.height/rect.height)*rect.height)/2);
    return rect;
};

Window_CakeList.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = Window_Base._iconWidth + 4;
        this.resetTextColor();
        //this.drawIcon(item.iconIndex, x + 2, y + 2);
        this.drawText(item.name, x +2, y, width);
        //this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
    }
};

Window_CakeList.prototype.addToSelection = function(){
    if(!this._selectionList.contains(this.index())&&this.index()>=0){
        this._selectionList.push(this.index());
        this.keyNum+=1;
        switch(this.keyNum){
            case 1:
                BirthdayManager.startMessage("{Day1_masterial_added_2}");
                break;
                case 2:
                    BirthdayManager.startMessage("{Day1_masterial_added_3}");
                    break;
                    case 3:
                        BirthdayManager.startMessage("{Day1_masterial_added_4}");
                        break;
                        case 4:
                            BirthdayManager.startMessage("{Day1_masterial_added_5}");
                            break;
                            case 5:
                                BirthdayManager.startMessage("{Day1_masterial_added_6}");
                                this.finishSelection();
                                this.refresh();
                                return;
                                break;
        }
    }
    
    this.refresh();
    this._confirm_window.activate();
}

Window_CakeList.prototype.removeFromSelection = function(){
    for(var i =0; i<this._selectionList.length; i++){
        if(this._selectionList[i] == this.index()){
            this._selectionList.splice(i,1);
        }
    }
    this.refresh();
    this._confirm_window.activate();
}

Window_CakeList.prototype.finishSelection = function(){
    //console.log(this._selectionList);
    this._selectionList.sort(function(a,b){
        return a-b;
    });
    console.log(this._selectionList);
    var key = "";
    keyNum = this.keyNum;
    for(var i = 0; i<this._selectionList.length; i++){
        key+= this._data[this._selectionList[i]].name;
    }
    if(keyNum<3){
        this._confirm_window.activate();
        return;
    }
    console.log(key);

    var scene =SceneManager._scene;
    if(!BirthdayManager.allCakes[key]){
        key = String(keyNum);
    }
    if(BirthdayManager.allCakes[key].image){
        scene._cakeDisplayWindow.showCake(BirthdayManager.allCakes[key].image);
    }
    BirthdayManager.cakeKey = key;
    this.deactivate();
    this._confirm_window.deselect();
    this._confirm_window.deactivate();
    this._finalConfirm_window.refresh();
    this._finalConfirm_window.showConfirm();
    this._finalConfirm_window.activate();
    this._finalConfirm_window.select(0);
    BirthdayManager._caketachi.changeEmoji("koyori_v");

    if(!BirthdayManager.achievements.madeCakes.contains(BirthdayManager.cakeKey)){
        BirthdayManager.achievements.madeCakes.push(BirthdayManager.cakeKey)
    }

    if(BirthdayManager.achievements.madeCakes.length == 1){
        BirthdayManager.unlockAchievement(1);
    }

    if(BirthdayManager.achievements.madeCakes.length == 15){
        BirthdayManager.unlockAchievement(8);
    }

    if(BirthdayManager.achievements.madeCakes.length == 30){
        BirthdayManager.unlockAchievement(9);
    }

    if(BirthdayManager.achievements.madeCakes.length >= 38){
        BirthdayManager.unlockAchievement(14);
        var c = new Sprite_Celebration(120);
        SceneManager._scene.addChild(c);
    }
}

BirthdayManager.cakeKey = "{Strawberry}{Cream}{WhiteChocolate}"

Window_CakeList.prototype.returnToSelection = function(){
    //console.log(1);
    this._finalConfirm_window.deactivate();
    this._finalConfirm_window.hideConfirm();
    this.activate();
    this._confirm_window.activate();
    var scene =SceneManager._scene;
    scene._cakeDisplayWindow.hideCake();
    this._selectionList = [];
    this.keyNum = 0;
    this.refresh();
    BirthdayManager._caketachi.changeEmoji("koyori_normal");
}

Window_CakeList.prototype.returnToFuture = function(){
    $gameSwitches.setValue(21, true);
}

Window_CakeList.prototype.select = function(index) {
    //console.log(1);
    this._index = index;
    this._stayCount = 0;
    this.ensureCursorVisible();
    this.updateCursor();
    this.callUpdateHelp();

    if(index>=0&&!this.reselected){
        BirthdayManager.startMessage(this._data[index].description); 
    }
    this.reselected=false;
};

Window_Selectable.prototype.reselect = function() {
    this.reselected = true;
    this.select(this._index);
};



Window_CakeList.prototype.maxCols = function() {
    return 1;
};
//语言选择
function Scene_ChooseLanguage(){
    this.initialize.apply(this, arguments);
}

Scene_ChooseLanguage.prototype = Object.create(Scene_Base.prototype);
Scene_ChooseLanguage.prototype.constructor = Scene_ChooseLanguage;

Scene_ChooseLanguage.prototype.create = function(){
    Scene_Base.prototype.create.call(this);
    this._window_chooselanguage = new Window_ChooseLanguage(0,0);
    this._window_chooselanguage.y = (Graphics.boxHeight-this._window_chooselanguage.height)/2
    this.addChild(this._window_chooselanguage);
}

function Window_ChooseLanguage(){
    this.initialize.apply(this, arguments);
}

Window_ChooseLanguage.prototype = Object.create(Window_Command.prototype);
Window_ChooseLanguage.prototype.constructor = Window_ChooseLanguage;

Window_ChooseLanguage.prototype.initialize = function(x, y){
    this.clearCommandList();
    this.makeCommandList();
    Window_Selectable.prototype.initialize.call(this, x, y, Graphics.boxWidth, this.fittingHeight(3));
    this.refresh();
    this.select(0);
    this.activate();
    this.setHandler("cn",this.changeLocaleTocn.bind(this));
    this.setHandler("en",this.changeLocaleToen.bind(this));
    //this.setHandler("jp",this.changeLocaleTojp.bind(this));
    this.setHandler("return",this.goBack.bind(this));
}

Window_ChooseLanguage.prototype.maxCols = function(){
    return 1;
}

Window_ChooseLanguage.prototype.makeCommandList = function(){
    this.addCommand("简体中文","cn");
    this.addCommand("English","en");
    //this.addCommand("日本語","jp");
    this.addCommand("{return}","return")
}

Window_ChooseLanguage.prototype.changeLocaleTocn = function(){
    DKTools.Localization._setLocale("cn").then(()=>this.refresh());
    this.activate();
}

Window_ChooseLanguage.prototype.changeLocaleToen = function(){
    DKTools.Localization._setLocale("en").then(()=>this.refresh());
    this.activate();
}

Window_ChooseLanguage.prototype.changeLocaleTojp = function(){
    DKTools.Localization._setLocale("jp").then(()=>this.refresh());
    this.activate();
}

Window_ChooseLanguage.prototype.goBack = function(){
    SceneManager.pop();

}


//=======================================================================================
//单选菜单
function Window_SingleSelection(){
    this.initialize.apply(this, arguments);
}

Window_SingleSelection.prototype = Object.create(Window_Command.prototype);
Window_SingleSelection.prototype.constructor = Window_SingleSelection;

Window_SingleSelection.prototype.initialize = function(x, y, width, height){
    this.clearCommandList();
    this.makeCommandList();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
    this.activate();
}

Window_SingleSelection.prototype.textPadding = function(){
    return 0;
}

Window_SingleSelection.prototype.maxCols = function(){
    return 1;
}

Window_SingleSelection.prototype.itemTextAlign = function(){
    return "center";
}

Window_SingleSelection.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    var maxCols = this.maxCols();
    rect.width = this.itemWidth();
    rect.height = this.itemHeight();
    rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
    rect.y = (this.height-this.padding*2-rect.height)/2;
    return rect;
};
//=======================================================================================

function Window_Side_Options(){
    this.initialize.apply(this, arguments);
}

Window_Side_Options.prototype = Object.create(Window_SingleSelection.prototype);
Window_Side_Options.prototype.constructor = Window_Side_Options;

Window_Side_Options.prototype.initialize = function(x, y, width, height){
    Window_SingleSelection.prototype.initialize.call(this, x, y, width, height);
    this.setHandler("option", this.processOption.bind(this));
}

Window_Side_Options.prototype.makeCommandList = function(){
    this.addCommand("{option}", "option");
}

Window_Side_Options.prototype.processOption = function(){
    if($gameSwitches.value(23)){
        BirthdayManager.saveCakeScene();
    }
    SceneManager.push(Scene_Options);
}
//=======================================================================================
function Window_Side_Backup(){
    this.initialize.apply(this, arguments);
}

Window_Side_Backup.prototype = Object.create(Window_SingleSelection.prototype);
Window_Side_Backup.prototype.constructor = Window_Side_Backup;

Window_Side_Backup.prototype.initialize = function(x, y, width, height){
    Window_SingleSelection.prototype.initialize.call(this, x, y, width, height);
    this.setHandler("backup", this.processBackup.bind(this));
}

Window_Side_Backup.prototype.makeCommandList = function(){
    this.addCommand("{backup}", "backup");
}

Window_Side_Backup.prototype.processBackup = function(){
    alert(DKTools.Localization.getText("{Constructing}"))
}

//确认窗口
function Window_Confirm(){
    this.initialize.apply(this, arguments);
}

Window_Confirm.prototype = Object.create(Window_Command.prototype);
Window_Confirm.prototype.constructor = Window_Confirm;

Window_Confirm.prototype.initialize = function(x, y, width, height){
    this.clearCommandList();
    this.makeCommandList();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
    this.select(0);
    this.activate();
}

BirthdayManager.temps.Window_Selectable_prototype_processOk = Window_Selectable.prototype.processOk;
Window_Confirm.prototype.processOk = function() {
    //console.log(this.active);
    if(!this.active){
        return;
    }
    BirthdayManager.temps.Window_Selectable_prototype_processOk.call(this);
};

Window_Confirm.prototype.maxCols = function(){
    return 2;
}

Window_Confirm.prototype.makeCommandList = function(){
    this.addCommand("{add}", "add");
    //this.addCommand("{remove}","remove");
    this.addCommand("{finish}","finish");
}

Window_Confirm.prototype.textPadding = function(){
    return 0;
}

//Window_Confirm.prototype.itemRectForText = function(index) {
    //var rect = this.itemRect(index);
    //rect.x += this.textPadding();
    //rect.width -= this.textPadding() * 2;
    //return rect;
//};

Window_Confirm.prototype.itemTextAlign = function(){
    return "center";
}

//最终确认
function Window_FinalConfirm(){
    this.initialize.apply(this, arguments);
}

Window_FinalConfirm.prototype = Object.create(Window_Command.prototype);
Window_FinalConfirm.prototype.constructor = Window_FinalConfirm;

Window_FinalConfirm.prototype.initialize = function(x, y, width, height){
    this.clearCommandList();
    this.makeCommandList();
    this.finalX = x;
    this.initialX = x+width;
    Window_Selectable.prototype.initialize.call(this, this.initialX, y, width, height);
    this.isShowing = false;
    this.refresh();
}

Window_FinalConfirm.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    var maxCols = this.maxCols();
    rect.width = this.itemWidth();
    rect.height = this.itemHeight();
    rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
    rect.y = this.height-this.padding*2-rect.height;
    //Math.floor(index / maxCols) * rect.height - this._scrollY;
    return rect;
};

Window_FinalConfirm.prototype.showConfirm = function(){
    this.isShowing = true;
}

Window_FinalConfirm.prototype.hideConfirm = function(){
    this.isShowing = false;
}

Window_FinalConfirm.prototype.update = function(){
    Window_Command.prototype.update.call(this);
    if(this.isShowing){
        if(this.x>this.finalX){
            this.x -= (this.x-this.finalX)/10
        }
    }else{
        if(this.x<this.initialX){
            this.x+=(this.initialX-this.x)/10
        }
    }
}

Window_FinalConfirm.prototype.makeCommandList = function(){
    this.addCommand("{confirm}","confirm");
    this.addCommand("{return}","return");
}

Window_FinalConfirm.prototype.maxCols = function(){
    return 2;
}

Window_FinalConfirm.prototype.refresh = function() {
    this.clearCommandList();
    this.makeCommandList();
    this.createContents();
    Window_Selectable.prototype.refresh.call(this);
    if(BirthdayManager.allCakes[BirthdayManager.cakeKey]){
        this.drawTextEx("<WordWrap>"+"{finalConfirm_Text_1}"+BirthdayManager.allCakes[BirthdayManager.cakeKey].name+"{finalConfirm_Text_2}",0,0);
    }
};

//边框窗口
function Window_Boundary(){
    this.initialize.apply(this, arguments);
}

Window_Boundary.prototype = Object.create(Window_Base.prototype);
Window_Boundary.prototype.constructor = Window_Boundary;

Window_Boundary.prototype.standardBackOpacity = function(){
    return 0;
}

//蛋糕展示窗口
function Window_CakeDisplay(){
    this.initialize.apply(this, arguments);
}

Window_CakeDisplay.prototype = Object.create(Window_Base.prototype);
Window_CakeDisplay.prototype.constructor = Window_CakeDisplay;

Window_CakeDisplay.prototype.initialize = function(x, y, width, height){
    var bwidth = 144;
    var bheight = 472;
    var rate = width/bwidth;
    Window_Base.prototype.initialize.call(this, x, y, width, height);

    //this._cakeSprite.
    this._windowBackSprite.bitmap = ImageManager.loadPicture("图");
    //this._windowBackSprite.setFrame(0, bheight-height, width, height);
    this._windowBackSprite.scale.x = rate;
    this._windowBackSprite.y = -(bheight-height);
    this.showingCake = false;

}
Window_CakeDisplay.prototype.showCake = function(cname){
    var crate = Graphics.boxWidth/375;
    if(crate>=2){
        crate = 1;
    }
    console.log(cname);
    this._cakeSprite = new Sprite(ImageManager.loadPicture("cakes/"+cname));
    this._cakeSprite.anchor.x = 0.5;
    this._cakeSprite.anchor.y = 0.5;
    this._cakeSprite.x = this.width/2;
    this._cakeSprite.y = this.height-68*crate;
    this._cakeSprite.scale.x = crate;
    this._cakeSprite.scale.y = crate;
    this._cakeSprite.opacity = 0;
    this.addChild(this._cakeSprite)
    this.showingCake =true;
}

Window_CakeDisplay.prototype.update = function(){
    Window_Base.prototype.update.call(this);
    if(this._cakeSprite){
        if(this.showingCake){
            if(this._cakeSprite.opacity<255){
                this._cakeSprite.opacity+=10;
            }
        }else{
            if(this._cakeSprite.opacity>0){
                this._cakeSprite.opacity-=10;
            }
        }
    }
}

Window_CakeDisplay.prototype.hideCake = function(){
    this.showingCake = false;
}

//测试
BirthdayManager.testMethod = function(){
    var scene = SceneManager._scene;
}
//信息窗口的变动

BirthdayManager.getFontSize = function(){
    return 19;
    var rate = Math.min(Graphics.boxWidth/375, Graphics.boxHeight/812);
    var size = 19*rate;
    if(size<18){
        size = 18;
    }

    if(size>22){
        size = 22;
    }
    return 19;
}

Window_Message.prototype.createContents = function() {
    this.contents = new Bitmap(this.contentsWidth()+2* this.standardPadding(), this.contentsHeight());
    this.resetFontSettings();
};

Window_Message.prototype.standardFontSize = function() {
    return BirthdayManager.getFontSize();
};

Window_Base.prototype.standardFontSize = function() {
    return BirthdayManager.getFontSize();
};
Window_ChoiceList.prototype.standardFontSize = function(){
    var rate = Math.min(Graphics.boxWidth/375, Graphics.boxHeight/812);
    var size = 19*rate;
    if(size<18){
        size = 18;
    }

    if(size>22){
        size = 22;
    }
    return size
}

Window_Message.prototype.windowHeight = function() {
    return this.fittingHeight(4);
};

Window_Message.prototype.numVisibleRows = function() {
    return 5;
};

Window_Message.prototype.newLineX = function() {
    return $gameMessage.faceName() === '' ? 2 : 168;
};

//覆盖性信息窗口

BirthdayManager.showInfo = function(){
    SceneManager._scene._InfoWindow.show();
}

BirthdayManager.hideInfo = function(){
    SceneManager._scene._InfoWindow.terminateMessage();
    SceneManager._scene._InfoWindow.hide();
}

function Window_Info(){
    this.initialize.apply(this, arguments);
}

Window_Info.prototype = Object.create(Window_Message.prototype);
Window_Info.prototype.constructor = Window_Info;

Window_Info.prototype.initialize = function(){
    Window_Message.prototype.initialize.call(this);
    this.hide();
}

Window_Info.prototype.canStart = function() {
    if(BirthdayManager.text){
        return true;
    }else{
        return false;  
    }
};


Window_Info.prototype.isTriggered = function(){
    return false;
}

BirthdayManager.allText = function(){
    return BirthdayManager.text
}

BirthdayManager.startMessage = function(t){
    SceneManager._scene._InfoWindow.terminateMessage();
    BirthdayManager.showInfo();
    BirthdayManager.text = DKTools.Localization.getText("<WordWrap>"+t);
    //console.log("text: "+BirthdayManager.text);
    SceneManager._scene._InfoWindow.startMessage(BirthdayManager.text);
}

Window_Info.prototype.startMessage = function(t) {
    //this.drawText("hi!",0,0);
    //console.log(2);
    this._textState = {};
    this._textState.index = 0;
    this._textState.text = this.convertEscapeCharacters(t);
    //console.log(this._textState);
    this.newPage(this._textState);
    this.updatePlacement();
    this.updateBackground();
    this.open();
};

Window_Info.prototype.terminateMessage = function() {
    this.contents.clear();
    BirthdayManager.text = null;
    this._textState = null;
    this._positionType = 2;
    this.updatePlacement();
    this.setBackgroundType(0);
};

Window_Info.prototype.updateBackground = function() {
    this._background = 0;
    this.setBackgroundType(this._background);
};
Window_Info.prototype.updatePlacement = function() {
    this._positionType = 2;
    if(this._positionType == 1){
        this.x = 0;
        this.width = Graphics.boxWidth;
    }else{
        this.width = this.windowWidth()
        this.x = (Graphics.boxWidth - this.windowWidth()+ Graphics.boxWidth*(1/5)) / 2;
    }

    this.y = this._positionType * (Graphics.boxHeight - this.height) / 2;
    this._goldWindow.y = this.y > 0 ? 0 : Graphics.boxHeight - this._goldWindow.height;
};

Window_Info.prototype.updateInput = function() {
    if (this.isAnySubWindowActive()) {
        return true;
    }
    if (this.pause) {
        if (this.isTriggered()) {
            Input.update();
            this.pause = false;
            if (!this._textState) {
                //this.terminateMessage();
            }
        }
        return true;
    }
    return false;
};

Window_Info.prototype.onEndOfText = function() {
    if (!this.startInput()) {
        if (!this._pauseSkip) {
            this.startPause();
        } else {
            //this.terminateMessage();
        }
    }
    this._textState = null;
};

Window_Info.prototype.updateInput = function() {
    return false;
};

Window_Info.prototype.update = function() {
    this.checkToNotClose();
    Window_Base.prototype.update.call(this);
    while (!this.isOpening() && !this.isClosing()) {
        if (this.updateWait()) {
            //console.log(1);
            return;
        } else if (this.updateLoading()) {
            //console.log(2);
            return;
        } else if (this.updateInput()) {
            //console.log(3);
            return;
        } else if (this.updateMessage()) {
            return;
        } else if (this.canStart()) {
            //this.startMessage();
            return;
        } else {
            this.startInput();
            return;
        }
    }
};

//=======================
function Sprite_Character2() {
    this.initialize.apply(this, arguments);
}

Sprite_Character2.prototype = Object.create(Sprite_Character.prototype);
Sprite_Character2.prototype.constructor = Sprite_Character2;

Sprite_Character2.prototype.createShadowSet = function(){
    return;
}

Sprite_Character2.prototype.update_character_shadow = function(){
    return;
}

Sprite_Character2.prototype.updatePosition = function() {
    this.x = 0;
    this.y = 0;
};

//任务窗口 待办
function Window_Task(){
    this.initialize.apply(this, arguments);
}

Window_Task.prototype = Object.create(Window_Info.prototype);
Window_Task.prototype.constructor = Window_Task;

Window_Task.prototype.initialize = function(){
    Window_Message.prototype.initialize.call(this);
    this.hasText = false;
    if(BirthdayManager.currentTask){
        this.startMessage(DKTools.Localization.getText("<WordWrap>"+BirthdayManager.currentTask))
    }
}

Window_Task.prototype.updatePlacement = function() {
    this.x = BirthdayManager.upperFaceSize();
    this.y = 0;
    this._goldWindow.y = this.y > 0 ? 0 : Graphics.boxHeight - this._goldWindow.height;
};

Window_Task.prototype.windowWidth = function() {
    return Graphics.boxWidth - BirthdayManager.upperFaceSize();
};
Window_Task.prototype.windowHeight = function() {
    return BirthdayManager.upperFaceSize();
};

Window_Task.prototype.terminateMessage = function() {
    this.hasText = false;
    this.contents.clear();
    BirthdayManager.currentTask = null;
    this._textState = null;
    this._positionType = 2;
    this.updatePlacement();
    this.setBackgroundType(0);
};

Window_Task.prototype.update = function() {
    this.checkToNotClose();
    Window_Base.prototype.update.call(this);
    while (!this.isOpening() && !this.isClosing()) {
        if (this.updateWait()) {
            //console.log(1);
            return;
        } else if (this.updateLoading()) {
            //console.log(2);
            return;
        } else if (this.updateInput()) {
            //console.log(3);
            return;
        } else if (this.updateMessage()) {
            return;
        } else if (this.canStart()) {
            this.hasText = true;
            this.startMessage($gameVariables.value(40));
            return;
        } else {
            this.startInput();
            return;
        }
    }
};

Window_Task.prototype.canStart = function() {
    if($gameVariables.value(40)&&!this.hasText){
        return true;
    }else{
        return false;  
    }
};
