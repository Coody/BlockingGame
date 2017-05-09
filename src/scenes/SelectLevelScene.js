var SELECT_LEVEL = {
    NONE:0,
    EASY:10,
    NORMAL:20,
    HARD:30
};

var SelectLevelLayer = cc.LayerColor.extend({

    _levelOneLabel:null,
    _levelTwoLabel:null,
    _levelThreeLabel:null,
    SELECT_LEVEL_LAYER_TAG:{
        ONE:100,
        TWO:200,
        THREE:300
    },

    _selectLevel:null,

    ctor:function(){
        this._super( D_COLOR_GREEN );

        var size = cc.winSize;

        this._levelOneLabel = new XSG_LabelButton( "Easy - 10 blocks" , null , 66 , null , this.SELECT_LEVEL_LAYER_TAG.ONE );
        this._levelTwoLabel = new XSG_LabelButton( "Normal - 20 blocks" , null , 66 , null , this.SELECT_LEVEL_LAYER_TAG.TWO );
        this._levelThreeLabel = new XSG_LabelButton( "Hard - 30 blocks" , null , 66 , null , this.SELECT_LEVEL_LAYER_TAG.THREE );

        this.addChild( this._levelOneLabel );
        this._levelOneLabel.setPosition( size.width*0.5 , size.height * 1.1 );
        this._levelOneLabel.setOpacity( 0 );
        this._levelOneLabel.setDelegate( this , null , null , this._onTouchEndCallBack );

        this.addChild( this._levelTwoLabel );
        this._levelTwoLabel.setPosition( size.width*0.5 , size.height * 1.1 );
        this._levelTwoLabel.setOpacity( 0 );
        this._levelTwoLabel.setDelegate( this , null , null , this._onTouchEndCallBack );

        this.addChild( this._levelThreeLabel );
        this._levelThreeLabel.setPosition( size.width*0.5 , size.height * 1.1 );
        this._levelThreeLabel.setOpacity( 0 );
        this._levelThreeLabel.setDelegate( this , null , null , this._onTouchEndCallBack );

        this._showLevelButton();

        return true;
    },

    // touch delegate call Background
    _onTouchEndCallBack:function( sender ){
        switch ( sender.getLabelTag() ) {
            case this._levelOneLabel.getLabelTag():
            {
                if( sender.getLabelTag() == this._selectLevel ){
                    // change scene
                    ModelMgr.getInstance().setModel( BLOCK_GAME_MODEL_KEY.GAME_LEVEL , SELECT_LEVEL.EASY );
                    this._startChangeSceneAnime();
                }
                else{
                    this._levelOneLabel.runAction( ActionTools.getScaleBigAndSmallRepeatAction( 1.2 , 0.4 , 1.2 ) );
                    this._levelTwoLabel.setScale( 1.0 , 1.0 );
                    this._levelTwoLabel.stopAllActions();
                    this._levelThreeLabel.setScale( 1.0 , 1.0 );
                    this._levelThreeLabel.stopAllActions();
                }
            }
                break;
            case this._levelTwoLabel.getLabelTag():
            {
                if( sender.getLabelTag() == this._selectLevel ){
                    // change scene
                    ModelMgr.getInstance().setModel( BLOCK_GAME_MODEL_KEY.GAME_LEVEL , SELECT_LEVEL.NORMAL );
                    this._startChangeSceneAnime();
                }
                else{
                    this._levelOneLabel.setScale( 1.0 , 1.0 );
                    this._levelOneLabel.stopAllActions();
                    this._levelTwoLabel.runAction( ActionTools.getScaleBigAndSmallRepeatAction( 1.2 , 0.4 , 1.2 ) );
                    this._levelThreeLabel.setScale( 1.0 , 1.0 );
                    this._levelThreeLabel.stopAllActions();
                }
            }
                break;
            case this._levelThreeLabel.getLabelTag():
            {
                if( sender.getLabelTag() == this._selectLevel ){
                    // change scene
                    ModelMgr.getInstance().setModel( BLOCK_GAME_MODEL_KEY.GAME_LEVEL , SELECT_LEVEL.HARD );
                    this._startChangeSceneAnime();
                }
                else{
                    this._levelOneLabel.setScale( 1.0 , 1.0 );
                    this._levelOneLabel.stopAllActions();
                    this._levelTwoLabel.setScale( 1.0 , 1.0 );
                    this._levelTwoLabel.stopAllActions();
                    this._levelThreeLabel.runAction( ActionTools.getScaleBigAndSmallRepeatAction( 1.2 , 0.4 , 1.2 ) );
                }
            }
                break;
            default:
                break;
        }

        this._selectLevel = sender.getLabelTag();
    },

    // Actions
    _showLevelButton:function(){
        var size = cc.winSize;
        this._labelAction( this._levelOneLabel , 0.1 , size.height * -0.35 );
        this._labelAction( this._levelTwoLabel , 0.4 , size.height * -0.6 );
        this._labelAction( this._levelThreeLabel , 0.8 , size.height * -0.85 );
    },

    _labelAction:function( targetLabel , delayTime , moveYDistance , target , callback ){
        var delayTime = new cc.DelayTime( delayTime );
        var fadeInSequenceAction = new cc.Sequence( delayTime , ActionTools.getFadeInAction( 0.5 ) );
        var moveSequenceAction = new cc.Sequence( delayTime , ActionTools.getMoveByAction( 0 , moveYDistance , 0.6 , target , callback ) );
        targetLabel.runAction( fadeInSequenceAction );
        targetLabel.runAction( moveSequenceAction );
    },

    _startChangeSceneAnime:function(){
        this._hideLevelButton();
    },

    _hideLevelButton:function(){
        var size = cc.winSize;
        this._labelAction( this._levelOneLabel , 0.1 , size.height * 1.1 );
        this._labelAction( this._levelTwoLabel , 0.4 , size.height * 1.1 );
        this._labelAction( this._levelThreeLabel , 0.8 , size.height * 1.1 , this , this._changeSceneWithBlockNumber  );
    },

    _changeSceneWithBlockNumber:function(){
        ChangeScene.getInstance().changeSceneTo( BLOCK_GAME_SCENE.GAME_BOARD );
    },
});

var SelectLevelScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new SelectLevelLayer();
        this.addChild(layer);
    }
});
