var Pannel = cc.Layer.extend({

    _bg:null,
    _titleLabel:null,
    _targetNumberLabel:null,
    _clockLabel:null,

    _targetNumber:null,
    _clockNumber:null,

    _finalGoalTargetNumber:null,

    _delegate:null,
    _achieveFinalGoalCallBack:null,

    ctor:function(){
        this._super();

        var size = cc.winSize;

        // BG
        this._bg = new cc.Sprite( res.BLOCK_GAME_RES_PIC_GAMEBOARDSCENE_TOPBAR_png );
        this._bg.setPosition( cc.p( size.width*0.5 , size.height + this._bg.getContentSize().height*0.5 ) );
        this.addChild( this._bg );

        var bgSize = this._bg.getContentSize();

        // Title
        this._titleLabel = new cc.LabelTTF( "Target" , D_GAME_MENU_FONT_NAME , 70 , null , cc.TEXT_ALIGNMENT_CENTER );
        this._titleLabel.setColor( cc.color.BLACK );
        this._bg.addChild( this._titleLabel );
        this._titleLabel.setPosition( cc.p( bgSize.width*0.5 , bgSize.height*0.65 ) );

        // Target Label
        this._targetNumberLabel = new cc.LabelTTF( "1" , D_GAME_MENU_FONT_NAME , 160 , null , cc.TEXT_ALIGNMENT_CENTER );
        this._targetNumberLabel.setColor( cc.color.BLACK );
        this._bg.addChild( this._targetNumberLabel );
        this._targetNumberLabel.setPosition( cc.p( bgSize.width*0.5 , bgSize.height*0.2 ) );
        this._targetNumber = 1;

        // clock
        this._clockLabel = new cc.LabelTTF( "0" , D_GAME_MENU_FONT_NAME , 80 , null , cc.TEXT_ALIGNMENT_RIGHT );
        this._clockLabel.setColor( cc.color.BLACK );
        this._bg.addChild( this._clockLabel );
        this._clockLabel.setPosition( cc.p( bgSize.width*0.9 , bgSize.height*0.2 ) );
        this._clockNumber = 0;

        return true;
    },


    setDelegate:function( target , achieveFinalGoalCallBack ){
        this._delegate = target;
        this._achieveFinalGoalCallBack = achieveFinalGoalCallBack;
    },

    setRecentTargetNumber:function( number ){
        if( number > this._finalGoalTargetNumber ){
            this._gameOver( true );
        }
        else{
            this._targetNumber = number;
            this._targetNumberLabel.setString( number );
        }
    },

    getRecentTargetNumber:function(){
        return this._targetNumber;
    },

    setFinalGoalTargetNumber:function( finalGoalTargetNumber ){
        this._finalGoalTargetNumber = finalGoalTargetNumber;
    },

    increaseTargetNumber:function(){
        this.setRecentTargetNumber( this._targetNumber + 1 );
    },

    startClock:function(){
        this.schedule( this._updateClock , 1.0 , cc.REPEAT_FOREVER , 0.0 );
    },

    stopClock:function(){
        this.unschedule( this._updateClock );
    },

    getClockTime:function(){
        return this._clockNumber;
    },

    resetPannel:function(){
        this.stopClock();
        this._targetNumber = 1;
        this._clockNumber = 0;
    },

    // MARK: 動畫
    showPannelAnime:function( delegate , finishCallBack ){

        // distanceX , distanceY , time , targetDelegate , targetCallBack
        var downAction = ActionTools.getMoveByAction( 0 , this._bg.getContentSize().height*-0.86 , 0.35 );
        var delayTime = new cc.DelayTime(0.08);
        var upAction = ActionTools.getMoveByAction(0 , this._bg.getContentSize().height*0.05 , 0.2);
        var sequenceAction;
        var callBackAction;
        if ( delegate != null && finishCallBack != null ){
            callBackAction = new cc.CallFunc( finishCallBack , delegate );
            sequenceAction = new cc.Sequence( downAction , delayTime , upAction , callBackAction );
        }
        else{
            sequenceAction = new cc.Sequence( downAction , delayTime , upAction );
        }
        this._bg.runAction( sequenceAction );
    },

    hidePannelAnime:function(){
        // distanceX , distanceY , time , targetDelegate , targetCallBack
        this._bg.runAction( ActionTools.getMoveByAction( 0 , this._bg.getContentSize().height*0.9 , 0.25 ) );
    },

    _updateClock:function(){
        this._clockNumber = this._clockNumber + 1;
        this._clockLabel.setString( this._clockNumber );
        if( this._clockNumber >= D_GAME_OVER_CLOCK_TIME_MAX ){
            this._gameOver( false );
        }
    },

    _gameOver:function( isWin ){
        this.stopClock();
        // callback
        if( this._delegate != null && this._achieveFinalGoalCallBack != null ){
            this._achieveFinalGoalCallBack.call( this._delegate , this , isWin);
        }
        else{
            cc.log(" End Game! ");
        }
    },
});
