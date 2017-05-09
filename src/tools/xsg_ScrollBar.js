var XSG_ScrollBar = cc.Node.extend({

    upButton: null,
    downButton: null,
    scrollbarBg: null,
    barSprite: null,
    scrollTarget: null,
    scrollResponse_Began: null,
    scrollResponse_Mobed: null,
    scrollResponse_Ended: null,

    scrollTargetCenter: null,
    scrollTargetSize: null,

    scrollStartPosition: null,

    // ScrollBar
    scrollbarMoveTotalDistance: null,

    ctor: function (scrollBarHeight) {
        this._super();

        var touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,

            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        });

        cc.eventManager.addListener(touchListener, this);

        // create up , down button
        this.upButton = new XSG_ButtonActor(res.BLOCK_GAME_RES_UI_UP_ARROW_png);
        this.downButton = new XSG_ButtonActor(res.BLOCK_GAME_RES_UI_DOWN_ARROW_png);


        // create scroll bar
        this.scrollbarBg = new cc.Scale9Sprite(res.BLOCK_GAME_RES_UI_SCROLL_BAR_BG_png);
        this.scrollbarBg.setAnchorPoint(0.5, 0);
        this.scrollbarBg.setContentSize( this.scrollbarBg.getContentSize().width , scrollBarHeight );

        this.addChild(this.scrollbarBg);
        this.scrollbarBg.addChild(this.upButton);
        this.scrollbarBg.addChild(this.downButton);

        // set Position
        this.upButton.setPosition(cc.p(this.scrollbarBg.getContentSize().width*0.5, this.scrollbarBg.getContentSize().height - this.upButton.getContentSize().height * 0.33 ));
        this.downButton.setPosition(cc.p(this.scrollbarBg.getContentSize().width*0.5, this.downButton.getContentSize().height * 0.33 ));
        this.setContentSize(this.scrollbarBg.getContentSize());

        // set Bar 條長度（原始值）
        this.barSprite = new cc.Scale9Sprite(res.BLOCK_GAME_RES_UI_SCROLL_BAR_SCROLL_png);
        this.addChild(this.barSprite);
        this.barSprite.setPosition(cc.p(0, this.upButton.getPositionY() - this.barSprite.getContentSize().height*0.5 - this.upButton.getContentSize().height*0.33));

        // set scrollBar can move total distance
        this.scrollbarMoveTotalDistance = scrollBarHeight - this.upButton.getContentSize().height*0.33 - this.downButton.getContentSize().height*0.67

        return true;
    },

    onTouchBegan: function (touch, event) {

        //cc.log("scrollbar touch begin");

        // 如果碰到 bar 條，或是內部藍色背景，則把 touch 吃掉

        return true;
    },

    onTouchMoved: function () {
        //cc.log("scrollbar touch begin");
    },

    onTouchEnded: function () {
        //cc.log("scrollbar touch begin");

    },

    /**
     *
     *
     * */
    //Scroll Bar
    setScrollDelegate: function (target, targetAction_Began, targetAction_Moved, targetAction_Ended) {
        this.scrollTarget = target;
        this.scrollResponse_Began = targetAction_Began;
        this.scrollResponse_Mobed = targetAction_Moved;
        this.scrollResponse_Ended = targetAction_Ended;
    },

    setScrollCenterAndSize: function (targetCenter, targetSize) {

        this.scrollTargetCenter = targetCenter;
        this.scrollTargetSize = targetSize;

        // 重置 bar 條長度
        cc.log(" target size = " + targetSize.toSource() );

        var originalSize = this.barSprite.getContentSize();
        this.barSprite.setContentSize(
            originalSize.width ,
            originalSize.height*( this.scrollTargetSize.height / this.scrollbarBg.getContentSize().height )
        );
        this.barSprite.setPosition(
            0,
            this.upButton.getPositionY() - this.barSprite.getContentSize().height*0.5 - this.upButton.getContentSize().height*0.33
        );
    },

    /**
     *
     *
     * */
    // 設定到 touch 事件
    setTouchBegan: function (touch , event) {
        this.scrollStartPosition = touch.getLocation();
    },

    // 設定到 touch 事件，並且得到該得的位置
    getTocuhMoved: function ( touch , event) {

        var newPoint = cc.p(this.scrollTargetCenter.x, this.scrollTargetCenter.y +
            (touch.getLocation().y - this.scrollStartPosition.y ));
        cc.log("moved Point " + newPoint.x + newPoint.y);

        return newPoint;
    },

    getTouchEnded: function ( touch , event) {
        var newPoint = cc.p(this.scrollTargetCenter.x, this.scrollTargetCenter.y +
            (touch.getLocation().y - this.scrollStartPosition.y ));
        cc.log("ended Point " + newPoint.x + newPoint.y);
        this.scrollTargetCenter = newPoint;
    },

    //
    setScrollPosition: function ( touch , event ) {

        // 移動 scroll bar 的位置
        //this.barSprite.setPosition(
        //    this.barSprite.getPosition().x ,
        //    ((touch.getLocation().y - this.scrollStartPosition.y) * scrollbarMoveTotalDistance)/this.scrollTargetSize.
        //);

        // 計算位置
    }
});
