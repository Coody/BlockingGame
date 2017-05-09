var HomePageLayer = cc.LayerColor.extend({

    _bg:null,
    _titleLabel:null,
    _startBtn:null,
    _SCENE_TAG:{
        START_BUTTON:100,
        TITLE:200,
        BG:300,
    },

    _canTouch:true,

    ctor:function(){
        this._super( D_COLOR_WHITE );

        this._preloadAllSounds();

        var size = cc.winSize;

        // Title
        var font = "From Cartoon Blocks";
        if (cc.sys.isNative) {
            if(cc.sys.os == cc.sys.OS_ANDROID) {
                font = "res/FromCartoonBlocks.ttf";
            }
            else {
                font = "From Cartoon Blocks";
            }
        }
        this._titleLabel = new cc.LabelTTF(
            "Hit!Hit!Hit!",
            font,
            100
        );
        this._titleLabel.setColor( cc.color.BLACK );
        this._titleLabel.setTag( this._SCENE_TAG.TITLE );
        this._titleLabel.setPosition( cc.p( size.width*0.5 , size.height*0.8 ) );
        this.addChild( this._titleLabel );

        // Background
        this._bg = new cc.Sprite( res.BLOCK_GAME_RES_PIC_STARTMENUSCENE_STARTMENUBG_png );
        this._bg.setTag( this._SCENE_TAG.BG );
        this._bg.setPosition( cc.p( size.width*0.5 , -100 ) );
        this.addChild(this._bg);

        // button
        this._startBtn = new XSG_ButtonActor(
            res.BLOCK_GAME_RES_PIC_STARTMENUSCENE_BLOCKBUTTON_png,
            res.BLOCK_GAME_RES_PIC_STARTMENUSCENE_BLOCKBUTTONSELECTED_png
        );
        this._startBtn.setPosition( cc.p( size.width*0.33 , size.height*0.3 ) );
        this._startBtn.setTag( this._SCENE_TAG.START_BUTTON );
        this.addChild( this._startBtn );
        this._startBtn.setDelegate(
            this ,
            this._btnPressedCallBack ,
            this._btnMovedInsideCallBack ,
            this._btnMovedOutsideCallBack ,
            this._btnEndCallBack );

        // add Action
        var repeatAction = new cc.RepeatForever( ActionTools.getHeartBeatAction() );
        this._titleLabel.runAction( repeatAction );

        jsb.AudioEngine.play2d( res.BLOCK_GAME_RES_SOUNDS_STARTMENUBGMUSIC_mp3 , true );

        return true;
    },

    // MARK: Button Touch
    _btnPressedCallBack:function( sender ){
        if( this._canTouch )
        this._moveBgDownAction();
    },

    _btnMovedInsideCallBack:function( sender ){
        if( this._canTouch )
        this._moveBgDownAction();
    },

    _btnMovedOutsideCallBack:function( sender ){
        if( this._canTouch )
        this._moveBgUpAction();
    },

    _btnEndCallBack:function( sender ){
        if( this._canTouch )
        this._moveBgFullScreenAction();
    },

    // MARK: Actions
    _moveBgDownAction:function(){
        this._bg.runAction( ActionTools.getMoveByAction( 0 , -20 , 0.1 ) );
    },

    _moveBgUpAction:function(){
        this._bg.runAction( ActionTools.getMoveByAction( 0 , 20 , 0.1 ) );
    },

    _moveBgFullScreenAction:function(){
        this._canTouch = false;
        var downAction = ActionTools.getMoveByAction( 0 , -20 , 0.1 , null , null , 5.0);
        var delayTime = new cc.DelayTime(0.4);
        var upAction = ActionTools.getMoveByAction( 0 , this._bg.getContentSize().height*0.6 , 0.3 , this , this._finishBgFullScreenAction , 5.0);
        // var sequenceAction = new cc.Sequence( downAction , delayTime , upAction );
        this._bg.runAction( upAction );

        // btn Action
        // scaleRate , time , easeInOutRate
        var scaleSmallAction = ActionTools.getScaleToAction( 0.0 , 0.25 , 5.0 , ACTION_EASE_TYPE.IN );
        this._startBtn.runAction( scaleSmallAction );
    },

    // Change Scene
    _finishBgFullScreenAction:function(){
        ChangeScene.getInstance().changeSceneTo( BLOCK_GAME_SCENE.SELECT_LEVEL );
    },

    _preloadAllSounds:function(){
        jsb.AudioEngine.preload( res.BLOCK_GAME_RES_SOUNDS_STARTMENUBGMUSIC_mp3 );
        jsb.AudioEngine.preload( res.BLOCK_GAME_RES_SOUNDS_STARTMENUBTNPRESSED_mp3 );
    },
});

var HomePageScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HomePageLayer();
        this.addChild(layer);
    }
});
