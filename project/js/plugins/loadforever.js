(function() {
    var alias = Scene_Boot.prototype.isReady;
    Scene_Boot.prototype.isReady = function() {
        alias.call(this);
        return false;
    };
})()