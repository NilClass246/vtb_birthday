var BirthdayManager = BirthdayManager || {};
BirthdayManager.temps = {};

BirthdayManager.TachiWidth = 300;
BirthdayManager.TachiHeight = 540;

BirthdayManager.camera_xoffset = 0;
BirthdayManager.camera_yoffset = 0;

BirthdayManager.windowSkin = "Window";

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
    if(this._windowSkinName !== BirthdayManager.windowSkin) {
        this.windowskin = ImageManager.loadSystem(BirthdayManager.windowSkin);
        this._windowSkinName = BirthdayManager.windowSkin;
    }
};

BirthdayManager.temps.Scene_Title_prototype_commandNewGame = Scene_Title.prototype.commandNewGame;
Scene_Title.prototype.commandNewGame = function() {
    BirthdayManager.temps.Scene_Title_prototype_commandNewGame.call(this);
    BirthdayManager.windowSkin = "Window_yellow";
};

//点击图标
BirthdayManager.hasDestinationSprite = true;

Sprite_Destination.prototype.update = function() {
    Sprite.prototype.update.call(this);

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

BirthdayManager.enterCakeScene = function(){
    this.isCakeScene = true;
    var upperheight = Graphics.boxHeight/4;
    var tilesize = (upperheight)/2;
    var focusrate = tilesize/48;
    this.focus(focusrate);
    this.camera_xoffset = 0.75;
    $gameMap._displayY += 0.25;
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
    var scene = SceneManager._scene;
    this.hideInfo();
    this.hasDestinationSprite = true;

    scene._characterWindow.destroy();
    scene._cakeDisplayWindow.destroy();
    scene._TachiWindow.destroy();
    scene._TachiBoundary.destroy();
    scene._CakeListWindow.destory();
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


    var scene = SceneManager._scene;
    var width = 600;
    var height = 600;
    var xrate = Graphics.boxWidth/width;
    var real_width = width*xrate;
    var real_height = height*xrate;
    var x = (Graphics.boxWidth-real_width)/2;
    var y = Graphics.boxHeight;
    var finalY = Graphics.boxHeight-real_height-BirthdayManager.messH();

    $gameScreen.showPicture(3, "litter", 0, x, y, xrate*100, xrate*100, 255, 0);
    $gameScreen.movePicture(3, 0, x, finalY, xrate*100, xrate*100, 255, 0, 60);
    
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

BirthdayManager.Pacman_Senteces = [
    "{pacman_sentence1}",
    "{pacman_sentence2}",
    "{pacman_sentence3}",
    "{pacman_sentence4}",
]

BirthdayManager.Pacman_RenderSentences = function(){

    var sent = this.Pacman_Senteces[Math.floor(Math.random()*this.Pacman_Senteces.length)]
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
    this.bitmap = new Bitmap(32, 32);
    this.write(this.num);
}

Counter.prototype.update = function(){
    Sprite.prototype.update.call(this);
    this.actualTime+=1;
    this.scale.x = 2-this.actualTime/60;
    this.scale.y = 2-this.actualTime/60;
    if(this.actualTime>=60){
        this.actualTime = 0;
        this.num -=1;
        this.write(this.num);
    }
    if(this.num ==0){
        this.destroy();
    }
}

Counter.prototype.write = function(t){
    this.bitmap.clear();
    this.bitmap.drawText(t, 0, 0, 32, 32, 'center');
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
    this.drawText("连击X"+num+" ");
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
        rate = 1;
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
    var x = Graphics.boxWidth-(162.5*rate);
    //var seq = this.pics*20;
    var actualwidth = picwidth*0.65*rate;
    //var actualheight = picheight*0.65*rate;
    if(!emoji){
        emoji = "normal";
    }
    if(position=="left"){
        this.tachiOrder.push(id);
        this.arrangeTachi();
        $gameScreen.showPicture(id, root+name, 0, -actualwidth, y, 65*rate, 65*rate, 0, 0);
        $gameScreen.showPicture(id+1, root+emoji, 0, -actualwidth, y, 65*rate, 65*rate, 0, 0);
        $gameScreen.movePicture(id, 0, 0, y, 65*rate, 65*rate, 255, 0, 30);
        $gameScreen.movePicture(id+1, 0, 0, y, 65*rate, 65*rate, 255, 0, 30);

    }else if(position =="right"){
        if(!BirthdayManager.already2){
            $gameScreen.showPicture(id, root+name, 0, x+actualwidth, y, 65*rate, 65*rate, 0, 0);
            $gameScreen.showPicture(id+1, root+emoji, 0, x+actualwidth, y, 65*rate, 65*rate, 0, 0);
            $gameScreen.movePicture(id, 0, x, y, 65*rate, 65*rate, 255, 0, 30);
            $gameScreen.movePicture(id+1, 0, x, y, 65*rate, 65*rate, 255, 0, 30);
            BirthdayManager.already2 = true;
        }else{
            $gameScreen.showPicture(id, root+name, 0, x, y, 65*rate, 65*rate, 255, 0);
            $gameScreen.showPicture(id+1, root+emoji, 0, x, y, 65*rate, 65*rate, 255, 0);
        }
    }
}

BirthdayManager.changeEmoji = function(id, emoji, position){
    var rate = this.getTachiRate();
    //console.log(rate);
    var y = Graphics.boxHeight-(277*rate)-SceneManager._scene._messageWindow.height;
    var x = Graphics.boxWidth-(162.5*rate);
    if(position=="left"&&this.already1&&this.tachiName1){
        $gameScreen.showPicture(id+2, root+emoji, 0, 0, y, 65*rate, 65*rate, 255, 0);
    }
    if(position=="right"&&this.already2&&this.tachiName2){
        $gameScreen.showPicture(id+2, root+emoji, 0, 0, y, 65*rate, 65*rate, 255, 0);
    }
}

BirthdayManager.deactivateTachi = function(id, position){
    var rate = this.getTachiRate();
    //console.log(rate);
    var y = Graphics.boxHeight-(277*rate)-SceneManager._scene._messageWindow.height;
    var x = Graphics.boxWidth-(162.5*rate);
    if(position=="left"){
        $gameScreen.movePicture(id, 0, 50*rate, y, 65*rate, 65*rate, 255, 0, 30);
        $gameScreen.movePicture(id+1, 0, 50*rate, y, 65*rate, 65*rate, 255, 0, 30);
    }
    if(position=="right"){
        $gameScreen.movePicture(id, 0, x+50*rate, y, 65*rate, 65*rate, 255, 0, 30);
        $gameScreen.movePicture(id+1, 0, x+50*rate, y, 65*rate, 65*rate, 255, 0, 30);
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


BirthdayManager.setTaskText = function(txt){
    SceneManager._scene._TaskWindow.contents.clear();
    SceneManager._scene._TaskWindow.drawText(txt, 0, 0)
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

BirthdayManager.temps._Window_TitleCommand_updatePlacement = Window_TitleCommand.prototype.updatePlacement;
Window_TitleCommand.prototype.updatePlacement = function() {
    BirthdayManager.temps._Window_TitleCommand_updatePlacement.call(this);
    this.x = (Graphics.boxWidth-this.width)/2;
    this.y =Graphics.boxHeight/2;
    this.setBackgroundType(1);
};

Window_TitleCommand.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};


//制作上下窗口
BirthdayManager.temps._Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    BirthdayManager.temps._Scene_Map_createAllWindows.call(this);
    var upperFaceSize = Graphics.boxHeight/6
    this._TaskWindow = new Window_Base(upperFaceSize, 0 , Graphics.boxWidth - upperFaceSize, upperFaceSize);
    this._TaskWindow.drawText("任务……", 0, 0);
    this._FaceWindow = new Window_Face(upperFaceSize);
    this._button1 = new Window_Base(0, this._messageWindow.y , Graphics.boxWidth*(1/5), this._messageWindow.height/2);
    this._button2 = new Window_Base(0, this._messageWindow.y+this._messageWindow.height/2 , Graphics.boxWidth*(1/5), this._messageWindow.height/2);
    //this._CakeListWindow = new Window_CakeList(upperFaceSize);
    this.addWindow(this._TaskWindow);
    this.addWindow(this._FaceWindow);
        this._InfoWindow = new Window_Info();
    this.addWindow(this._InfoWindow);
    this.addWindow(this._button1);
    this._button1.drawText("1", 7, 5);
    this.addWindow(this._button2);
    this._button2.drawText("2", 7, 5);

    //this.addWindow(this._CakeListWindow);
};

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

//任务窗口 待办
function Window_Task(){
    this.initialize.apply(this, arguments);
}

Window_Task.prototype = Object.create(Window_Base.prototype);
Window_Task.prototype.constructor = Window_Task;

//头像窗口
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
    this.change("koyori");
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

    this._faceSprite.scale.x = (this.width-36) / 144;
    this._faceSprite.scale.y = (this.height-36) / 144;
}

//蛋糕编辑窗口
BirthdayManager.allCakes = {
    "{Strawberry}{CherryBlossoms}{WhiteChocolate}":{

    },
    "":{

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
    this._confirm_window.setHandler("remove", this.removeFromSelection.bind(this));
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
    this.deactivate();
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
    if(!this._selectionList.contains(this.index())){
        this._selectionList.push(this.index());
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
    this._selectionList.sort();
    var key = "";
    var keyNum = 0;
    for(var i = 0; i<this._selectionList.length; i++){
        key+= this._data[this._selectionList[i]].name;
        keyNum+=1;
    }
    console.log(key);
    BirthdayManager.cakeKey = key;

    var scene =SceneManager._scene;
    if(BirthdayManager.allCakes[key]){
        scene._cakeDisplayWindow.showCake(BirthdayManager.allCakes[key].image);
    }else{
        scene._cakeDisplayWindow.showCake("cake1");
    }
    this.deactivate();
    this._finalConfirm_window.showConfirm();
    this._finalConfirm_window.activate();
    BirthdayManager._caketachi.changeEmoji("koyori_v");
}

Window_CakeList.prototype.returnToSelection = function(){
    this._finalConfirm_window.deactivate();
    this._finalConfirm_window.hideConfirm();
    this.activate();
    this._confirm_window.activate();
    var scene =SceneManager._scene;
    scene._cakeDisplayWindow.hideCake();
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

Window_Confirm.prototype.maxCols = function(){
    return 3;
}

Window_Confirm.prototype.makeCommandList = function(){
    this.addCommand("{add}", "add");
    this.addCommand("{remove}","remove");
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
    this.drawTextEx("<WordWrap>"+"{finalConfirm_Text_1}"+BirthdayManager.cakeKey+"{finalConfirm_Text_2}",0,0);
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

Window_Message.prototype.standardFontSize = function() {
    return 19;
};

Window_Base.prototype.standardFontSize = function() {
    return 19;
};

Window_Message.prototype.windowHeight = function() {
    return this.fittingHeight(4);
};

Window_Message.prototype.numVisibleRows = function() {
    return 5;
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
    SceneManager._scene._InfoWindow.startMessage();
}

Window_Info.prototype.startMessage = function() {
    //this.drawText("hi!",0,0);
    //console.log(2);
    this._textState = {};
    this._textState.index = 0;
    this._textState.text = this.convertEscapeCharacters(BirthdayManager.allText());
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