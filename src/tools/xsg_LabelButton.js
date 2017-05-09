var XSG_LabelButton = cc.Node.extend({

    _label:null,
    _targetDelegate:null,
    _targetBeginCallFunc:null,
    _targetMovedCallFunc:null,
    _targetEndCallFunc:null,

    _labelTag:null,

    /**
     * 客製化 Label Button
     * @param  {string} message
     * @param  {string} fontName can be null
     * @param  {number} fontSize
     * @param  {cc.color} color
     * @param  {number} tag
     * @param  {cc.size} labelSize can be null
     * @param  {cc.TEXT_ALIGNMENT_CENTER} CENTER if null (horizontal)
     * @param  {cc.VERTICAL_TEXT_ALIGNMENT_CENTER} CENTER if null (Virtucal)
     */
    ctor:function( message , fontName , fontSize , color , tag , labelSize , hTextAlignment , vTextAlignment ){
        this._super();
        var size = cc.winSize;

        labelSize = labelSize || null;

        message = message || "";
        color = color || cc.color.WHITE;

        if( fontName == null ){
            if (cc.sys.isNative) {
                if(cc.sys.os == cc.sys.OS_ANDROID) {
                    fontName = "res/FromCartoonBlocks.ttf";
                }
                else {
                    fontName = "From Cartoon Blocks";
                }
            }
        }

        this._label = new cc.LabelTTF(
            message,
            fontName,
            fontSize,
            labelSize,
            hTextAlignment || cc.TEXT_ALIGNMENT_CENTER,
            vTextAlignment || cc.VERTICAL_TEXT_ALIGNMENT_CENTER
        );
        this._label.setColor( color );
        this._label.setAnchorPoint( cc.p(0.5 , 0.5) );
        this.addChild( this._label );
        this._labelTag = tag;
        if( this._labelTag ){
            this._label.setTag( this._labelTag );
        }

        // add touch listener
        var touchListener = cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:false,

            onTouchBegan:this._onTouchBegan,
            onTouchMoved:this._onTouchMoved,
            onTouchEnded:this._onTouchEnded
        });
        cc.eventManager.addListener( touchListener , this );

        return true;
    },

    // MARK: Public
    // Delegate
    setDelegate:function( target , beganCallBack , movedCallBack , EndedCallBack ){
        this._targetDelegate = target;
        this._targetBeginCallFunc = beganCallBack;
        this._targetMovedCallFunc = movedCallBack;
        this._targetEndCallFunc = EndedCallBack;
    },

    getLabelTag:function(){
        return this._labelTag;
    },

    setText:function( text ){
        this._label.setString( text );
    },

    // MARK: Private
    // Touch Event
    _onTouchBegan:function( touch , event ){
        var currentTarget = event.getCurrentTarget();
        var touchLocation = currentTarget._label.convertToNodeSpace( touch.getLocation() );
        var spriteSize = currentTarget._label.getContentSize();
        var rect = cc.rect(0,0,spriteSize.width,spriteSize.height);
        if( cc.rectContainsPoint( rect , touchLocation ) ){
            if( currentTarget._targetDelegate != null && currentTarget._targetBeginCallFunc != null ){
                currentTarget._targetBeginCallFunc.call( currentTarget._targetDelegate , currentTarget );
            }
            return true;
        }
        return false;
    },

    _onTouchMoved:function( touch , event ){
        var currentTarget = event.getCurrentTarget();
        if( currentTarget._targetDelegate != null && currentTarget._targetMovedCallFunc != null ){
            currentTarget._targetMovedCallFunc.call( currentTarget._targetDelegate , currentTarget );
        }
    },

    _onTouchEnded:function( touch , event ){
        var currentTarget = event.getCurrentTarget();
        if( currentTarget._targetDelegate != null && currentTarget._targetEndCallFunc != null ){
            currentTarget._targetEndCallFunc.call( currentTarget._targetDelegate , currentTarget );
        }
    },
});
