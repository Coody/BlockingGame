/**
 * 遊戲主要遊戲桌
 * @detail
 * 1. 控制流程
 * 2. 生成遊戲桌主要物件( 管理 block 邏輯的 manager )( 上方分數跟計時器 pannel )( 遊戲結束後的分數計算 Layer )
 * 3.
 */
var GameBoard = cc.Layer.extend({

    GAME_STATE:{
        INITIAL:"INITIAL",
        PLAYING:"PLAYING",
        GAMEOVER:"GAMEOVER",
    },

    // Object
    _blockMgr:null,
    _pannel:null,
    _calculateLayer:null,

    /**
     * 儲存 bolck view 的物件
     * @type {BasicBlock}
     */
    _visibleBlockDic:null,
    /**
     * 畫面目前狀態
     * @type {GAME_STATE}
     */
    _gameState:null,

    ctor:function( totalBlockCount ){
        this._super();

        this._preloadSound();
        this._gameState = this.GAME_STATE.INITIAL;

        var size = cc.winSize;

        // set logic block manager
        this._blockMgr = new BlockMoveManager();
        this._blockMgr.initialBlockArray( totalBlockCount );
        this._blockMgr.shuffleBlockArray();
        this._blockMgr.showBlockArray();

        // create blocks
        this._visibleBlockDic = {};
        for( var i = 0 ; i < 6 ; i++ ){
            for( var j = 0 ; j < 9 ; j++ ){
                if( this._blockMgr.getBlockArray()[i][j] != 0 ){
                    var blockNumber = this._blockMgr.getBlockArray()[i][j];
                    var block = new BasicBlock( blockNumber , i , j );
                    this.addChild( block );
                    this._visibleBlockDic[ block.tag ] = block ;
                    block.setPosition( this._blockMgr.getBlockPosition( i , j ).x , size.height * 1.1 );
                    block.setDelegate( this , this._touchCallBack );
                }
            }
        }

        // 遊戲流程
        // 顯示 pannel -> 顯示 block 掉落 -> 顯示 ready go -> 開始遊戲
        this._pannel = new Pannel();
        this._pannel.setDelegate( this , this._gameOverCallBack );
        this._pannel.setFinalGoalTargetNumber( totalBlockCount );
        this.addChild( this._pannel );
        this._pannel.showPannelAnime( this , function(){
            this._showBlockDropAnime( this , function(){
                var delayTime = new cc.DelayTime(1.0);
                var callFuncAction = new cc.CallFunc( this._showReadyGoAnime , this , this._endReadyGoAnime );
                var sequenceAction = new cc.Sequence( delayTime , callFuncAction );
                this.runAction( sequenceAction );
            });
        });

        // 加入 GameOverLayer
        this._calculateLayer = new CalculateLayer();
        this._calculateLayer.setPosition( cc.p( 0 , size.height*-1 ) );
        this.addChild( this._calculateLayer );

        return true;
    },

    // MARK: Private
    // Animation
    _showBlockDropAnime:function( delegate , finishCallBack ){
        var actionArray = [];
        var length = Object.keys(this._visibleBlockDic).length;
        for( var i = 1 ; i <= length ; i++ ){
            var callFuncAction = new cc.CallFunc( this._dropBlockAction , this , this._visibleBlockDic[i] );
            actionArray.push( callFuncAction );
            var delayTimeAction = new cc.DelayTime( 0.18 );
            actionArray.push( delayTimeAction );
        }
        if( delegate != null && finishCallBack != null ){
            actionArray.push( new cc.CallFunc( finishCallBack , delegate ) );
        }
        var sequenceAction = new cc.Sequence( actionArray );
        this.runAction( sequenceAction );
    },

    _dropBlockAction:function( sender , block ){
        var position = this._blockMgr.getBlockPosition( block.getIndexX() , block.getIndexY() );
        block.runAction( ActionTools.getMoveToAction( position.x , position.y , 0.2 ) );
        block.playDropSound();
    },

    _showReadyGoAnime:function( delegate , finishCallBack ){

        var size = cc.winSize;

        /**
         * 產生 ready label
         */
        var readyLabel = new cc.LabelTTF( "Ready" , D_GAME_MENU_FONT_NAME , 210 );
        readyLabel.setColor( cc.color.BLACK );
        readyLabel.setPosition( cc.p( size.width * 0.5 , size.height * 0.46 ) );
        readyLabel.setOpacity(0.0);
        readyLabel.setScale(0.0);
        this.addChild( readyLabel );

        /**
         * 產生 go label
         */
        var goLabel = new cc.LabelTTF( "GO!" , D_GAME_MENU_FONT_NAME , 240 );
        goLabel.setColor( cc.color.RED );
        goLabel.setPosition( cc.p( size.width * 0.5 , size.height * 0.46 ) );
        goLabel.setOpacity(0.0);
        goLabel.setScale(0.0);
        this.addChild( goLabel );

        /**
         * [fadeInAction description]
         * @type {[type]}
         */
        var fadeInAction = ActionTools.getFadeInAction( 0.8 );
        var delayTime = new cc.DelayTime( 1.1 );
        var fadeOutAction = ActionTools.getFadeOutAction( 0.5 );
        var finishCallBackAction;
        var readySequenceAction = new cc.Sequence( fadeInAction , delayTime , fadeOutAction );
        var scaleAction = ActionTools.getScaleToAction( 1.0 , 0.6 , 6.0 , ACTION_EASE_TYPE.OUT );
        readyLabel.runAction( readySequenceAction );
        readyLabel.runAction( scaleAction );

        fadeInAction = ActionTools.getFadeInAction( 0.4 );
        delayTime = new cc.DelayTime( 0.8 );
        fadeOutAction = ActionTools.getFadeOutAction( 0.3 );
        var delayTimeAction = new cc.DelayTime( 2.3 );
        var goSequenceAction;
        if( delegate != null && finishCallBack != null ){
            finishCallBackAction = new cc.CallFunc( finishCallBack , delegate );
            goSequenceAction = new cc.Sequence( delayTimeAction , fadeInAction , delayTime , fadeOutAction , finishCallBackAction );
        }
        else{
            goSequenceAction = new cc.Sequence( delayTimeAction , fadeInAction , fadeOutAction );
        }
        // scaleRate , time , easeRate , easeType
        var scaleSmallAction = ActionTools.getScaleToAction( 1.0 , 0.3 , 10.0 , ACTION_EASE_TYPE.OUT );
        var goSequenceAction2 = new cc.Sequence( delayTimeAction , scaleSmallAction );
        goLabel.runAction( goSequenceAction );
        goLabel.runAction( goSequenceAction2 );
    },

    /**
     * 結束 Ready go , 開始移動 block
     * @return {[type]} [description]
     */
    _endReadyGoAnime:function(){
        this._startGame();
    },

    _showGameOverAnime:function( isWin ){
        // TODO: 計算分數
        this._calculateLayer.showCalculateLayer( this , function(){

            // let myFn = function(arg1,arg2){}.bind(this,'arg1');

            this._calculateLayer.showScoreAnime(
                function( params ){
                    return (params["level"]*10 + (D_GAME_OVER_CLOCK_TIME_MAX - params["time"]));
                },
                {"time":this._pannel.getClockTime(),
                 "level":ModelMgr.getInstance().getModel( BLOCK_GAME_MODEL_KEY.GAME_LEVEL )},
                this,
                this._changeToLeaderboard
            );
        });
    },

    // MARK: 流程
    _startGame:function(){
        this._gameState = this.GAME_STATE.PLAYING;
        this.schedule( this._updateBlockMove , D_GAMEBOARD_SCHEDULE_SPEED , cc.REPEAT_FOREVER , 0.1 );
        this._pannel.startClock();
    },

    _updateBlockMove:function(){
        this._startMoveBlock();
    },

    _startMoveBlock:function(){

        var moveBlockArray = this._blockMgr.getMoveBlockArray();
        for( var i = 0 ; i < moveBlockArray.length ; i++ ){
            var block = this._visibleBlockDic[moveBlockArray[i]];
            if( block != null && block.isMoving() ){
                continue;
            }
            var goDirection = this._blockMgr.goGPS( block );
            switch ( goDirection ) {
                case BLOCK_MOVE_POSITION.RIGHT:
                    block.goRight();
                    break;
                case BLOCK_MOVE_POSITION.LEFT:
                    block.goLeft();
                    break;
                case BLOCK_MOVE_POSITION.UP:
                    block.goUp();
                    break;
                case BLOCK_MOVE_POSITION.DOWN:
                    block.goDown();
                    break;
                case BLOCK_MOVE_POSITION.NONE:
                default:
                    break;
            }
        }
        // this._blockMgr.showBlockArray();
    },

    _stopMoveBlock:function(){
        this.unschedule( this._updateBlockMove );
    },

    _touchCallBack:function( sender ){
        var block = sender;
        cc.log( "Touch! " + block.getNumber() );
        if( this._gameState == this.GAME_STATE.PLAYING ){

            if( this._canBeTouch( block ) ){
                this._removeBlock( block );
                this._pannel.increaseTargetNumber();
            }
            else{
                // TODO: 代表按錯，執行 special function
                block.specialAction();
            }
        }
    },

    _canBeTouch:function( block ){
        var check = false;
        check = ( this._pannel.getRecentTargetNumber() == block.tag );
        return check;
    },

    _preloadSound:function(){
        // jsb.AudioEngine.preload( res.BLOCK_GAME_RES_SOUNDS_BLOCKDOWN_mp3 );
    },

    //
    _gameOverCallBack:function( sender , isWin){
        // 設定 Gameboard 狀態
        this._gameState = this.GAME_STATE.GAMEOVER;

        // 停止 move
        this._stopMoveBlock();

        // 顯示分數
        this._showGameOverAnime( isWin );
    },

    _removeBlock:function( block ){
        // 移除邏輯 block
        this._blockMgr.removeBlockWithTag( block.tag );

        // 移除畫面 block
        block.breakAction();
        this._visibleBlockDic[ block.tag ] = null;
    },

    _changeToLeaderboard:function(){
        ChangeScene.getInstance().changeSceneTo( BLOCK_GAME_SCENE.LEADER_BOARD );
    },
});
