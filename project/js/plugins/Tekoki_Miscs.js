var BirthdayManager = BirthdayManager || {};
BirthdayManager.temps = {};

BirthdayManager.TachiWidth = 240;
BirthdayManager.TachiHeight = 540;

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
    BirthdayManager.isCakeScene = true;
    var upperheight = Graphics.boxHeight/4;
    var tilesize = (upperheight)/2;
    var focusrate = tilesize/48;
    BirthdayManager.focus(focusrate);
    $gameMap._displayY +=0.25;
    var scene = SceneManager._scene;
    scene._characterWindow = new Window_Boundary(0, scene._FaceWindow.y+scene._FaceWindow.height, Graphics.boxWidth*(3/5), upperheight);
    scene.addWindowToCakeScene(scene._characterWindow);
    scene._cakeDisplayWindow = new Window_CakeDisplay(scene._characterWindow.x+scene._characterWindow.width
        ,scene._characterWindow.y
        ,Graphics.boxWidth-scene._characterWindow.width
        ,scene._characterWindow.height);
    scene.addWindowToCakeScene(scene._cakeDisplayWindow);
    var trate = 0.65
    var theight = BirthdayManager.TachiHeight*trate;
    var twidth = BirthdayManager.TachiWidth*trate;
    var tachi = new Sprite(ImageManager.loadPicture("Test_Tachi"));
    tachi.scale.x = trate;
    tachi.scale.y = trate;
    tachi.y = scene._characterWindow.y+scene._characterWindow.height;
    //scene.addWindowToCakeScene(tachi);
    scene._TachiWindow = new Window_Base(0, tachi.y, twidth+8, scene._messageWindow.y-tachi.y);
    scene._TachiWindow._windowBackSprite.bitmap = ImageManager.loadPicture("Test_Tachi");
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

BirthdayManager.showTachi = function(name, position){
    //console.log(SceneManager._scene._messageWindow.y);
    var root = "tachi/"
    var picheight = 540;
    var picwidth = 250;
    var xrate = Graphics.boxWidth/375;
    var yrate = Graphics.boxHeight/812;
    var rate = (Graphics.boxWidth<Graphics.boxHeight)?(xrate):(yrate);
    if(rate>=2){
        rate = 1;
    }
    console.log(rate);
    var y = Graphics.boxHeight-(277*rate)-SceneManager._scene._messageWindow.height;
    var x = Graphics.boxWidth-(162.5*rate);
    if(position=="left"){
        $gameScreen.showPicture(1, root+name, 0, 0, y, 65*rate, 65*rate, 255, 0);
    }else if(position =="right"){
        $gameScreen.showPicture(2, root+name, 0, x, y, 65*rate, 65*rate, 255, 0);
    }
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
            this._faceSprite.bitmap = ImageManager.loadFace("mea");
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
    Window_ItemList.prototype.initialize.call(this, x, y, width, height);
    //this.drawText("temp", 0, 0);
    this._category = "item";
    this.visible = false;
    this.deactivate();
}

Window_ItemList.prototype.maxCols = function() {
    return 1;
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
    var rate = width/bwidth-0.05;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._cakeSprite = new Sprite(ImageManager.loadPicture("cakes/Cake"));
    this._cakeSprite.anchor.x = 0.5;
    this._cakeSprite.anchor.y = 0.5;
    this._cakeSprite.x = width/2;
    this._cakeSprite.y = height*(1/2);
    var crate = 0.90;
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