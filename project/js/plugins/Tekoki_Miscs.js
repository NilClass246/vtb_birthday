(function() {
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

    var _Window_TitleCommand_updatePlacement = Window_TitleCommand.prototype.updatePlacement;
    Window_TitleCommand.prototype.updatePlacement = function() {
        _Window_TitleCommand_updatePlacement.call(this);
        this.x = (Graphics.boxWidth-this.width)/2;
        this.y =Graphics.boxHeight/2;
        this.setBackgroundType(1);
    };

    Window_TitleCommand.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };

    

    //制作上下窗口
    var _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _Scene_Map_createAllWindows.call(this);
        var upperFaceSize = Graphics.boxHeight/6
        this._TaskWindow = new Window_Base(upperFaceSize, 0 , Graphics.boxWidth - upperFaceSize, upperFaceSize);
        this._TaskWindow.drawText("任务……", 0, 0);
        this._FaceWindow = new Window_Face(upperFaceSize);
        this._button1 = new Window_Base(0, this._messageWindow.y , Graphics.boxWidth*(1/5), this._messageWindow.height/2);
        this._button2 = new Window_Base(0, this._messageWindow.y+this._messageWindow.height/2 , Graphics.boxWidth*(1/5), this._messageWindow.height/2);
        this.addWindow(this._TaskWindow);
        this.addWindow(this._FaceWindow);
        this.addWindow(this._button1);
        this._button1.drawText("1", 7, 5);
        this.addWindow(this._button2);
        this._button2.drawText("2", 7, 5);
    };

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
    function Window_CakeList(){
        this.initialize.apply(this, arguments);
    }

    Window_CakeList.prototype = Object.create(Window_ItemList.prototype);
    Window_CakeList.prototype.constructor = Window_CakeList;

    Window_CakeList.prototype.initialize = function(){
        var x = 0;
        var y = 0;
        var width = 0;
        var height = 0;
        Window_ItemList.prototype.initialize.call(this, x, y, width, height);
    }
})();