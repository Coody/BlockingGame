var XSG_SwitchButton = cc.Layer.extend({

    RECENT_SWITCH_STATE:{
        OFF:0,
        ON:1
    },

    _recentState:null,

    _onImageSprite:null,
    _offImageSprite:null,

    _targetDelegate:null,
    _targetCallFuncN:null,

    _isNeedOffImage:null,

    ctor:function( onImage , offImage ){
        this._super();

        this._isNeedOffImage = true;

        this._recentState = this.RECENT_SWITCH_STATE.OFF;
        this._onImageSprite = new cc.Sprite( onImage );
        if ( offImage == null || offImage == "" ){
            offImage = onImage;
            this._isNeedOffImage = false;
        }
        this._offImageSprite = new cc.Sprite( offImage );
        this.addChild(this._onImageSprite);
        this.addChild(this._offImageSprite);
        this._onImageSprite.setVisible(false);

        // Touch event
        var touchListener = cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:false,

            onTouchBegan:this._onTouchBegan.bind(this),
            onTouchEnded:this._onTouchEnded.bind(this)
        });

        cc.eventManager.addListener( touchListener , this );

        return true;
    },

    setRecentState:function( newState ){
        if ( newState == this.RECENT_SWITCH_STATE.ON ){
            this._recentState = this.RECENT_SWITCH_STATE.ON;
            this._onImageSprite.setVisible(true);
            this._offImageSprite.setVisible(false);
        }
        else{
            this._recentState = this.RECENT_SWITCH_STATE.OFF;
            this._onImageSprite.setVisible(false);
            this._offImageSprite.setVisible(true);
            if( this._isNeedOffImage == false ){
                this._offImageSprite.setOpacity(0);
            }
        }
    },

    setDelegate:function( target , callFuncN ){
        this._targetDelegate = target;
        this._targetCallFuncN = callFuncN;
    },

    _onTouchBegan:function( touch , event ){
        var sprite;
        if( this._recentState == this.RECENT_SWITCH_STATE.ON ){
            sprite = this._onImageSprite;
        }
        else{
            sprite = this._offImageSprite;
        }
        var touchLocation = sprite.convertToNodeSpace(touch.getLocation());
        var spriteSize = sprite.getContentSize();
        var rect = cc.rect( 0 , 0 , spriteSize.width , spriteSize.height );
        if ( cc.rectContainsPoint(rect , touchLocation) ) {
            return true;
        }
        return false;
    },

    _onTouchEnded:function( touch , event ){
        var sprite;
        if( this._recentState == this.RECENT_SWITCH_STATE.ON ){
            sprite = this._onImageSprite;
        }
        else{
            sprite = this._offImageSprite;
        }
        var touchLocation = sprite.convertToNodeSpace(touch.getLocation());
        var spriteSize = sprite.getContentSize();
        var rect = cc.rect(0,0,spriteSize.width , spriteSize.height);
        if ( cc.rectContainsPoint(rect , touchLocation) ) {

            this.setRecentState( !this._recentState );
            if ( this._targetDelegate != null && this._targetCallFuncN != null ){
                this._targetCallFuncN.call( this._targetDelegate , this._recentState );
            }
        }
    }
});
