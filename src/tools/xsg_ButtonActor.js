var XSG_ButtonActor = cc.Layer.extend({

    // Sprite
    buttonSprite:null,

    // ImageName
    _normalBtnImage:null,
    _selectedBtnImage:null,
    _isSelected:false,

    // Delegate
    buttonTarget:null,
    buttonStartPressedCallFunc:null,
    buttonMovedInsideCallFunc:null,
    buttonMovedOutsideCallFunc:null,
    buttonEndCallFunc:null,


    ctor:function ( buttonBGImage , buttonSelectedBGImage ){
        this._super();

        this._normalBtnImage = buttonBGImage;
        this._selectedBtnImage = buttonSelectedBGImage || "";

        var touchListener = cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:false,

            onTouchBegan:this._onTouchBegan,
            onTouchMoved:this._onTouchMoved,
            onTouchEnded:this._onTouchEnded
        });

        cc.eventManager.addListener( touchListener , this );

        this.buttonSprite = new cc.Sprite( this._normalBtnImage );
        this.buttonSprite.setTag(100);
        this.addChild(this.buttonSprite);

        // ***  ***
        // this.setContentSize(this.buttonSprite.getContentSize());

        return true;

    },

    getContentSize:function(){
        return this.buttonSprite.getContentSize();
    },

    setDelegate:function( target, targetStartPressedCallFunc, targetMovedInsideCallFunc, targetMovedOutsideCallFunc, targetEndCallFunc){
        this.buttonTarget = target;
        this.buttonStartPressedCallFunc = targetStartPressedCallFunc;
        this.buttonMovedInsideCallFunc = targetMovedInsideCallFunc;
        this.buttonMovedOutsideCallFunc = targetMovedOutsideCallFunc;
        this.buttonEndCallFunc = targetEndCallFunc;
    },

    _onTouchBegan:function( touch , event ){
        var currentTarget = event.getCurrentTarget();
        var sprite = currentTarget.getChildByTag(100);
        var touchLocation = sprite.convertToNodeSpace(touch.getLocation());
        var spriteSize = sprite.getContentSize();
        var rect = cc.rect(0,0,spriteSize.width , spriteSize.height);
        if ( cc.rectContainsPoint(rect , touchLocation) ) {
            currentTarget.buttonSprite.setTexture( currentTarget._selectedBtnImage );
            currentTarget._isSelected = true;
            if( currentTarget.buttonTarget != null && currentTarget.buttonStartPressedCallFunc != null ){
                currentTarget.buttonStartPressedCallFunc.call( currentTarget.buttonTarget , currentTarget );
            }
            return true;
        }
        return true;
    },

    _onTouchMoved:function( touch , event ){
        var currentTarget = event.getCurrentTarget();
        var sprite = currentTarget.getChildByTag(100);
        var touchLocation = sprite.convertToNodeSpace(touch.getLocation());
        var spriteSize = sprite.getContentSize();
        var rect = cc.rect(0,0,spriteSize.width , spriteSize.height);
        if ( cc.rectContainsPoint(rect , touchLocation) ) {
            if( currentTarget._isSelected == false ){
                currentTarget._isSelected = true;
                currentTarget.buttonSprite.setTexture( currentTarget._selectedBtnImage );
                if( currentTarget.buttonTarget != null && currentTarget.buttonMovedInsideCallFunc != null ){
                    currentTarget.buttonMovedInsideCallFunc.call( currentTarget.buttonTarget , this );
                }
            }
        }
        else{
            if( currentTarget._isSelected == true ){
                currentTarget._isSelected = false;
                currentTarget.buttonSprite.setTexture( currentTarget._normalBtnImage );
                if( currentTarget.buttonTarget != null && currentTarget.buttonMovedOutsideCallFunc != null ){
                    currentTarget.buttonMovedOutsideCallFunc.call( currentTarget.buttonTarget , this );
                }
            }
        }

    },

    _onTouchEnded:function( touch , event ){
        var currentTarget = event.getCurrentTarget();
        var sprite = currentTarget.getChildByTag(100);
        var touchLocation = sprite.convertToNodeSpace(touch.getLocation());
        var spriteSize = sprite.getContentSize();
        var rect = cc.rect(0,0,spriteSize.width , spriteSize.height);
        if ( cc.rectContainsPoint(rect , touchLocation) ) {
            if( currentTarget.buttonTarget != null && currentTarget.buttonEndCallFunc != null ){
                currentTarget.buttonEndCallFunc.call(currentTarget.buttonTarget , currentTarget);
            }
        }
        if( currentTarget._isSelected == true ){
            currentTarget.buttonSprite.setTexture( currentTarget._normalBtnImage );
            currentTarget._isSelected = false;
        }
    }
});
