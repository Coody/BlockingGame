/**
 * 計算分數的白色半透明 Layer
 */
var CalculateLayer = cc.Layer.extend({

    _bgLayer:null,
    _hardLabel:null,
    _levelBonusLabel:null,
    _plusLabel:null,
    _timeLabel:null,
    _timeBonusLabel:null,

    _equalLabel:null,
    _scoreLabel:null,

    _score:null,
    _delegate:null,
    _callBack:null,

    ctor:function(){
        this._super();

        var size = cc.winSize;
        this._score = 0;

        this._bgLayer = new cc.LayerColor( cc.color.WHITE );
        this._bgLayer.setPosition( cc.p( 0 , 0 ) );
        this._bgLayer.setOpacity(180);
        this.addChild(this._bgLayer);

        // Level:
        var level = ModelMgr.getInstance().getModel( BLOCK_GAME_MODEL_KEY.GAME_LEVEL );
        var levelString = ( level <= 15 ? "Easy" : ( level > 15 && level < 30 ? "Normal" : "Hard" )  ) + " mode:";
        this._hardLabel = new cc.LabelTTF( levelString , D_GAME_MENU_FONT_NAME , 60 , null , cc.TEXT_ALIGNMENT_CENTER , cc.VERTICAL_TEXT_ALIGNMENT_CENTER );
        this._hardLabel.setColor( cc.color.BLACK );
        this._hardLabel.setPosition( cc.p( size.width*0.5 , size.height*0.88 ) );
        this.addChild( this._hardLabel );
        this._hardLabel.setOpacity(0.0);
        this._hardLabel.setScale(3.0);


        // bonus number
        this._levelBonusLabel = new cc.LabelTTF( level , D_GAME_MENU_FONT_NAME , 60 , null , cc.TEXT_ALIGNMENT_CENTER , cc.VERTICAL_TEXT_ALIGNMENT_CENTER );
        this._levelBonusLabel.setColor( cc.color.RED );
        this._levelBonusLabel.setPosition( cc.p( size.width*0.5 , size.height*0.78 ) );
        this.addChild( this._levelBonusLabel );
        this._levelBonusLabel.setOpacity(0.0);
        this._levelBonusLabel.setScale(3.0);

        // plus label
        this._plusLabel = new cc.LabelTTF( "+" , D_GAME_MENU_FONT_NAME , 70 , null , cc.TEXT_ALIGNMENT_CENTER , cc.VERTICAL_TEXT_ALIGNMENT_CENTER );
        this._plusLabel.setColor( cc.color.BLACK );
        this._plusLabel.setPosition( cc.p( size.width*0.5 , size.height*0.68 ) );
        this.addChild( this._plusLabel );
        this._plusLabel.setOpacity(0.0);
        this._plusLabel.setScale(3.0);

        // time number
        this._timeLabel = new cc.LabelTTF( "Time Bonus:" , D_GAME_MENU_FONT_NAME , 60 , null , cc.TEXT_ALIGNMENT_CENTER , cc.VERTICAL_TEXT_ALIGNMENT_CENTER );
        this._timeLabel.setColor( cc.color.BLACK );
        this._timeLabel.setPosition( cc.p( size.width*0.5 , size.height*0.58 ) );
        this.addChild( this._timeLabel );
        this._timeLabel.setOpacity(0.0);
        this._timeLabel.setScale(3.0);

        // time bonus
        this._timeBonusLabel = new cc.LabelTTF( "0" , D_GAME_MENU_FONT_NAME , 60 , null , cc.TEXT_ALIGNMENT_CENTER , cc.VERTICAL_TEXT_ALIGNMENT_CENTER );
        this._timeBonusLabel.setColor( cc.color.RED );
        this._timeBonusLabel.setPosition( cc.p( size.width*0.5 , size.height*0.48 ) );
        this.addChild( this._timeBonusLabel );
        this._timeBonusLabel.setOpacity(0.0);
        this._timeBonusLabel.setScale(3.0);

        // time bonus
        this._equalLabel = new cc.LabelTTF( "=" , D_GAME_MENU_FONT_NAME , 80 , null , cc.TEXT_ALIGNMENT_CENTER , cc.VERTICAL_TEXT_ALIGNMENT_CENTER );
        this._equalLabel.setColor( cc.color.BLACK );
        this._equalLabel.setPosition( cc.p( size.width*0.5 , size.height*0.38 ) );
        this.addChild( this._equalLabel );
        this._equalLabel.setOpacity(0.0);
        this._equalLabel.setScale(3.0);

        // time bonus
        this._scoreLabel = new cc.LabelTTF( "0" , D_GAME_MENU_FONT_NAME , 180 , null , cc.TEXT_ALIGNMENT_CENTER , cc.VERTICAL_TEXT_ALIGNMENT_CENTER );
        this._scoreLabel.setColor( cc.color.RED );
        this._scoreLabel.setPosition( cc.p( size.width*0.5 , size.height*0.21 ) );
        this.addChild( this._scoreLabel );
        this._scoreLabel.setOpacity(0.0);
        this._scoreLabel.setScale(3.0);
    },

    showCalculateLayer:function( delegate , callback ){
        var size = cc.winSize;
        var fadeInAction = ActionTools.getFadeInAction( 0.7 );
        var moveUpAction = ActionTools.getMoveByAction( 0 , size.height , 0.8 );
        var finishCallBack;
        var sequenceAction;
        this.runAction( fadeInAction );
        if( delegate != null && callback != null ){
            finishCallBack = new cc.CallFunc( callback , delegate );
            sequenceAction = new cc.Sequence( moveUpAction , finishCallBack );
            this.runAction( sequenceAction );
        }
        else{
            this.runAction( moveUpAction );
        }
    },

    hideCalculateLayer:function(){
        var size = cc.winSize;
        var fadeOutAction = ActionTools.getFadeOutAction( 0.7 );
        var moveDownAction = ActionTools.getMoveByAction( 0 , size.height*-1 , 0.8 );
        this.runAction( fadeOutAction );
        this.runAction( moveDownAction );
    },

    showScoreAnime:function( func , params , delegate , callBack ){
        this._delegate = delegate;
        this._callBack = callBack;

        var level = params["level"];
        var time = ( D_GAME_OVER_CLOCK_TIME_MAX - params["time"] );
        // this._score = level*10 + time;
        this._score = func( params );

        // 將分數記錄起來
        let linklist = new Linklist();
        linklist.load( SAVE_FILE_KEY.SCORE_ARRAY_KEY );
        linklist.add({
            score:this._score,
        });
        linklist.save( SAVE_FILE_KEY.SCORE_ARRAY_KEY );

        // set level string
        this._levelBonusLabel.setString( level*10 );
        // set time string
        this._timeBonusLabel.setString( time );
        // set Score string
        this._scoreLabel.setString( this._score );

        this._runLabelAction( this._hardLabel );
        this._runLabelAction( this._levelBonusLabel , 0.5 );
        this._runLabelAction( this._plusLabel , 1.0 );
        this._runLabelAction( this._timeLabel , 1.5 );
        this._runLabelAction( this._timeBonusLabel , 2.0 );
        this._runLabelAction( this._equalLabel , 2.5 );
        this._runLabelAction( this._scoreLabel , 3.0 , this , function(){
            // TODO: 出現按鈕
            //  message , fontName , fontSize , color , tag , labelSize
            var btn = new XSG_LabelButton(
                "Leaderboard",
                null,
                80,
                cc.color.BLACK
            );
            this.addChild( btn );
            btn.setPosition( cc.winSize.width*0.5 , 70 );
            btn.setDelegate( this._delegate , null , null , this._callBack );

        });

    },

    _runLabelAction:function( targetLabel , delay , delegate , callBack ){
        delay = delay || 0;
        var delayTime = new cc.DelayTime( delay );
        var fadeInAction = ActionTools.getFadeInAction( 0.2 );
        //scaleRate , time , easeRate , easeType
        var scaleAction = ActionTools.getScaleToAction( 1.0 , 0.3 , 10.0 , ACTION_EASE_TYPE.OUT );
        var sequenceAction1;
        var sequenceAction2;
        if( delay > 0 ){
            sequenceAction1 = new cc.Sequence( delayTime , fadeInAction );
            var finishCallBack;
            if( delegate != null && callBack != null ){
                finishCallBack = new cc.CallFunc( callBack , delegate );
                sequenceAction2 = new cc.Sequence( delayTime , scaleAction , finishCallBack);
            }
            else{
                sequenceAction2 = new cc.Sequence( delayTime , scaleAction );
            }
            targetLabel.runAction( sequenceAction1 );
            targetLabel.runAction( sequenceAction2 );
        }
        else{
            targetLabel.runAction( fadeInAction );
            targetLabel.runAction( scaleAction );
        }

    }
});
