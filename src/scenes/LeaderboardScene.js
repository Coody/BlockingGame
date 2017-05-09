var LeaderboardLayer = cc.LayerColor.extend({

    _scrollBar:null,
    _tableView:null,
    _scoreLinklist:null,

    ctor:function(){
        this._super( D_COLOR_GREEN );

        var size = cc.winSize;

        // 資料
        this._scoreLinklist = new Linklist();
        this._scoreLinklist.load( SAVE_FILE_KEY.SCORE_ARRAY_KEY );

        // title
        let titleLabel = new cc.LabelTTF(
        "Leaderboard",
        D_GAME_MENU_FONT_NAME,
        90,
        null,
        cc.TEXT_ALIGNMENT_CENTER,
        cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM);

        // buttons - message , fontName , fontSize , color , tag , labelSize
        let backToTitleBtn = new XSG_LabelButton(
            "Title" ,
            D_GAME_MENU_FONT_NAME ,
            60 ,
            cc.color.RED ,
            null ,
            null ,
            cc.TEXT_ALIGNMENT_LEFT,
            cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        let restartBtn = new XSG_LabelButton(
            "Restart" ,
            D_GAME_MENU_FONT_NAME ,
            60 ,
            cc.color.RED ,
            null ,
            null ,
            cc.TEXT_ALIGNMENT_RIGHT ,
            cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

        // TableView
        this._tableView = new TableView( this._scoreLinklist.convertToArray() );
        this.addChild( this._tableView );
        this._tableView.setPosition( 0 , size.height - titleLabel.getContentSize().height );

        this._scrollBar = new XSG_ScrollBar( size.height - titleLabel.getContentSize().height - 80 );
        this._scrollBar.setPosition( cc.p(size.width - this._scrollBar.getContentSize().width*0.5 , 80) );
        this.addChild( this._scrollBar );

        this._scrollBar.setScrollCenterAndSize( this._tableView.getPosition() , this._tableView.getContentSize() );

        var touchListener = cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:false,

            onTouchBegan:this._onTouchBegan.bind(this),
            onTouchMoved:this._onTouchMoved.bind(this),
            onTouchEnded:this._onTouchEnded.bind(this)
        });

        cc.eventManager.addListener( touchListener , this );

        // Title
        titleLabel.setPosition( size.width*0.5 , size.height - titleLabel.getContentSize().height*0.7 );
        titleLabel.setColor( cc.color.BLACK );
        this.addChild( titleLabel );

        // return to title button
        backToTitleBtn.setPosition( cc.p( 100 , 40 ) );
        this.addChild( backToTitleBtn );
        backToTitleBtn.setDelegate( this , null , null , function(){
            jsb.AudioEngine.stopAll();
            ChangeScene.getInstance().changeSceneTo( BLOCK_GAME_SCENE.HOMEPAGE );
        });

        // return to select level button
        restartBtn.setPosition( cc.p( size.width - 150 , 40 ) );
        this.addChild( restartBtn );
        restartBtn.setDelegate( this , null , null , function(){
            ChangeScene.getInstance().changeSceneTo( BLOCK_GAME_SCENE.SELECT_LEVEL );
        });

        return true;
    },

    _onTouchBegan:function( touch , event ){
        this._scrollBar.setTouchBegan( touch , event );
        return true;
    },

    _onTouchMoved:function( touch , event ){
        this._tableView.setPosition( this._scrollBar.getTocuhMoved( touch , event ) );
    },

    _onTouchEnded:function( touch , event ){
        this._scrollBar.getTouchEnded( touch , event );
    },


});

var LeaderboardScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new LeaderboardLayer();
        this.addChild(layer);
    }
});
