var ChangeScene = ( function(){
    var instance;

    function createInstance(){
        var object = new _ChangeSceneTools();
        return object;
    }

    return {
        getInstance:function(){
            if ( !instance ) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

var BLOCK_GAME_SCENE = {
    NONE:"NONE",
    HOMEPAGE:"HOMEPAGE",
    SELECT_LEVEL:"SELECT_LEVEL",
    GAME_BOARD:"GAME_BOARD",
    LEADER_BOARD:"LEADER_BOARD",
};

var _ChangeSceneTools = cc.Node.extend({

    _recentScene:null,

    ctor:function(){
        this._super();
        this._recentScene = BLOCK_GAME_SCENE.NONE;

        // 初始化一些必要項目
        // ModelMgr
        ModelMgr.getInstance();

        // SaveFileMgr
        XSG_SaveFileMgr.getInstance();

        return true;
    },

    changeSceneTo:function( sceneEnum ){
        this._recentScene = sceneEnum;

        switch ( this._recentScene ) {
            case BLOCK_GAME_SCENE.HOMEPAGE:
                cc.director.runScene(new HomePageScene());
                break;
            case BLOCK_GAME_SCENE.SELECT_LEVEL:
                cc.director.runScene(new SelectLevelScene());
                break;
            case BLOCK_GAME_SCENE.GAME_BOARD:
                cc.director.runScene(new BlockGameBoardScene());
                break;
            case BLOCK_GAME_SCENE.LEADER_BOARD:
                cc.director.runScene(new LeaderboardScene());
                break;
            case BLOCK_GAME_SCENE.NONE:
            default:
                cc.log("Change Scene FAIL !!!( SCENE: " + sceneEnum + " )");
                break;
        }
    },

});
