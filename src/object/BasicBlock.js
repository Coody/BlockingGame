/**
 * 基本方塊
 */
var BasicBlock = Block.extend({

    _delegate:null,
    _callBack:null,

    _numberLabel:null,
    _showNumber:null,

    _isMoving:false,

    ctor:function( tag , indexX , indexY ){
        this._super( res.BLOCK_GAME_RES_PIC_GAMEBOARDSCENE_BLOCK_png , tag , indexX , indexY );

        this._preloadSound();

        this._numberLabel = new XSG_LabelButton( tag , D_GAME_MENU_FONT_NAME , 60 , cc.color.BLACK , null , this.getContentSize() );

        this.addChild( this._numberLabel );
        this._numberLabel.setPosition( cc.p( this.getContentSize().width*0.5 , this.getContentSize().width*0.5 ) );
        this._numberLabel.setDelegate( this , this._touchCallBack );
        this.setNumber( tag );

        return true;
    },

    setDelegate:function( target , touchCallBack ){
        this._delegate = target;
        this._callBack = touchCallBack;
    },

    /**
     * 設定 Block 的 Number，會一併改掉他內部的值
     */
    setNumber:function( number ){
        this._showNumber = number;
        this._numberLabel.setText( number );
        if( number%5 == 0 ){
            var action = ActionTools.getChangeColorAction( 0.7 , 223 , 37 , 33 );
            this.runAction( action );
        }
    },

    getNumber:function(){
        return this._showNumber;
    },

    breakAction:function(){
        var scaleBigAction = ActionTools.getScaleToAction();
    },

    // MARK: Sound
    playDropSound:function(){
        jsb.AudioEngine.play2d( res.BLOCK_GAME_RES_SOUNDS_BLOCKDOWN_mp3 , false );
    },

    playDisappearSound:function(){
        // jsb.AudioEngine.play2d( res.BLOCK_GAME_RES_SOUNDS_BLOCKDISAPPEAR_mp3 , false );
    },

    playFailSound:function(){
        jsb.AudioEngine.play2d( res.BLOCK_GAME_RES_SOUNDS_BLOCKTOUCHFAIL_mp3 , false );
    },

    isMoving:function(){
        return this._isMoving;
    },

    // 繼承覆寫
    breakAction:function(){
        // scaleRate , time , easeRate , easeType
        var scaleSmallAction = ActionTools.getScaleToAction( 0.0 , 0.3 , 5.0 , ACTION_EASE_TYPE.IN );
        // time , target , finishCallBack
        var fadeOutAction = ActionTools.getFadeOutAction( 0.35 , this , this._finishBreakCallBack );
        this.runAction( scaleSmallAction );
        this.runAction( fadeOutAction );

        this.playDisappearSound();
    },

    specialAction:function(){
        this.playFailSound();
    },

    // MARK: private
    _touchCallBack:function( sender ){
        if( this._delegate != null && this._callBack != null ){
            this._callBack.call( this._delegate , this );
        }
    },

    // MARK: Private
    _preloadSound:function(){
        jsb.AudioEngine.preload( res.BLOCK_GAME_RES_SOUNDS_BLOCKDOWN_mp3 );
        jsb.AudioEngine.preload( res.BLOCK_GAME_RES_SOUNDS_BLOCKDISAPPEAR_mp3 );
        jsb.AudioEngine.preload( res.BLOCK_GAME_RES_SOUNDS_BLOCKTOUCHFAIL_mp3 );
    },

    _finishMoving:function(){
        this._isMoving = false;
    },

    _finishBreakCallBack:function(){
        this.stopAllActions();
        // this._delegate = null;
        // this._callBack = null;
        cc.log( "remove !" );
        this.removeFromParent();
    },
});
