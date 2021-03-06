var BlockGameBoardLayer = cc.LayerColor.extend({
    ctor:function(){
        this._super( D_COLOR_GREEN );

        var blockNumber = ModelMgr.getInstance().getModel( BLOCK_GAME_MODEL_KEY.GAME_LEVEL );
        var gameBoard = new GameBoard( blockNumber );
        this.addChild(gameBoard);

        return true;
    }
});

var BlockGameBoardScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new BlockGameBoardLayer();
        this.addChild( layer );
        return true;
    }
});
