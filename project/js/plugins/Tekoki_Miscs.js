var BirthdayManager = BirthdayManager || {};
BirthdayManager.temps = {};

BirthdayManager.TachiWidth = 240;
BirthdayManager.TachiHeight = 540;

BirthdayManager.camera_xoffset = 0;
BirthdayManager.camera_yoffset = 0;

//测量
BirthdayManager.messY = function(){
    return Graphics.boxHeight - (4 * 36 + 18 * 2);
}

BirthdayManager.messH = function(){
    return 4 * 36 + 18 * 2;
}

//推箱子相关方法
BirthdayManager.current_target_list = [];

BirthdayManager.box_state = [];

BirthdayManager.sokoban_maps = {
    5: [5,5]
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
    var id = $gameVariables.value(5);
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
    var rate = this.getTachiRate();
    var trate = 0.65*rate;
    var theight = this.TachiHeight*trate;
    var twidth = this.TachiWidth*trate;

    var tachi = new Sprite(ImageManager.loadPicture("tachi/Test_Tachi3"));
    tachi.scale.x = trate;
    tachi.scale.y = trate;
    tachi.y = scene._characterWindow.y+scene._characterWindow.height;
    //scene.addWindowToCakeScene(tachi);
    scene._TachiWindow = new Window_Base(0, tachi.y, twidth+8*rate-1, scene._messageWindow.y-tachi.y+1);
    scene._TachiWindow._windowBackSprite.bitmap = tachi.bitmap;
    scene._TachiWindow._windowBackSprite.scale.x = trate;
    scene._TachiWindow._windowBackSprite.scale.y = trate;

    scene.addWindowToCakeScene(scene._TachiWindow);
    scene._CakeListWindow = new Window_CakeList(
        scene._TachiWindow.x+scene._TachiWindow.width
        ,scene._TachiWindow.y
        ,Graphics.boxWidth - scene._TachiWindow.width
        ,scene._TachiWindow.height);
    scene.addWindowToCakeScene(scene._CakeListWindow);
    BirthdayManager.openCakeSelection();
    scene._messageWindow.drawText("酱油和青椒更配哦!",5,5)
}

BirthdayManager.exitCakeScene = function(){
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
    for(var i =0; i<12; i++){
        var index = Math.floor(Math.random()*this.possible_location_list.length);
        var loc = this.possible_location_list.slice(index, index+1);
        $gameMap.event(12+i).setPosition(loc[0][0], loc[0][1]);
    }
    this.possible_location_list = [
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
}

BirthdayManager.getTachiRate = function(){
    var xrate = Graphics.boxWidth/375;
    var yrate = Graphics.boxHeight/812;
    var rate = (Graphics.boxWidth<Graphics.boxHeight)?(xrate):(yrate);
    if(rate>=2){
        rate = 1;
    }
    return rate;
}

BirthdayManager.showTachi = function(name, position){
    //console.log(SceneManager._scene._messageWindow.y);
    var root = "tachi/"
    var picheight = 540;
    var picwidth = 250;
    var rate = this.getTachiRate();
    //console.log(rate);
    var y = Graphics.boxHeight-(277*rate)-SceneManager._scene._messageWindow.height;
    var x = Graphics.boxWidth-(162.5*rate);
    if(position=="left"){
        $gameScreen.showPicture(1, root+name, 0, 0, y, 65*rate, 65*rate, 255, 0);
    }else if(position =="right"){
        $gameScreen.showPicture(2, root+name, 0, x, y, 65*rate, 65*rate, 255, 0);
    }
}

BirthdayManager.setTaskText = function(txt){
    SceneManager._scene._TaskWindow.drawText(txt, 0, 0)
}

//窗口大小
SceneManager.setWindowSize = function(){
    this._screenWidth =window.screen.availWidth;
    this._boxWidth = window.screen.availWidth;
    this._boxHeight = window.screen.availHeight;
    this._screenHeight = window.screen.availHeight;
}

SceneManager.preferableRendererType = function() {
    if (Utils.isOptionValid('canvas')) {
        return 'canvas';
    } else if (Utils.isOptionValid('webgl')) {
        return 'webgl';
    } else {
        return 'canvas';
    }
};

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
    this.addWindow(this._button1);
    this._button1.drawText("1", 7, 5);
    this.addWindow(this._button2);
    this._button2.drawText("2", 7, 5);
    this._InfoWindow = new Window_Info();
    this.addWindowToCakeScene(this._InfoWindow);
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
    this.change("mea");
}

Window_Face.prototype.change = function(name){
    switch(name){
        case "mea":
            this._faceSprite.bitmap = ImageManager.loadFace("face");
            this._faceSprite.scale.x = (this.width-36) / 144;
            this._faceSprite.scale.y = (this.height-36) / 144;
            break;
    }
}

//蛋糕编辑窗口
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
    Window_ItemList.prototype.initialize.call(this, x, y, width, height-this.fittingHeight(1)+1);
    this._confirm_window = new Window_Confirm(0, height-this.fittingHeight(1), width, this.fittingHeight(1));
    this.addChild(this._confirm_window);
    //this.drawText("temp", 0, 0);
    this._category = "item";
    this.visible = false;
    this.deactivate();
}

Window_ItemList.prototype.maxCols = function() {
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
    return 1;
}

Window_Confirm.prototype.makeCommandList = function(){
    this.addCommand("确定", "conf");
}

Window_Confirm.prototype.itemTextAlign = function(){
    return "center";
}


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
    this._cakeSprite = new Sprite(ImageManager.loadPicture("cakes/cake2"));
    this._cakeSprite.anchor.x = 0.5;
    this._cakeSprite.anchor.y = 0.5;
    this._cakeSprite.x = width/2;
    this._cakeSprite.y = height*(2/3);
    var crate = 1;
    this._cakeSprite.scale.x = crate;
    this._cakeSprite.scale.y = crate;
    //this._cakeSprite.
    this._windowBackSprite.bitmap = ImageManager.loadPicture("图");

    this.addChild(this._cakeSprite);
    //this._windowBackSprite.setFrame(0, bheight-height, width, height);
    this._windowBackSprite.scale.x = rate;
    this._windowBackSprite.y = -(bheight-height);

}

//测试
BirthdayManager.testMethod = function(){
    var scene = SceneManager._scene;
}

//覆盖性信息窗口

BirthdayManager.showInfo = function(){
    SceneManager._scene._InfoWindow.show();
}

BirthdayManager.hideInfo = function(){
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
    return false;
};

