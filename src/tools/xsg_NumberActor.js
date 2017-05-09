var XSG_NumberActor = cc.Layer.extend({

    _numberLabelAtlas:null,
    _numberFontName:null,
    _numberWidthUint:null,
    _numberHeightUnit:null,
    _startCharacter:null,

    ctor:function( fontName , fontWidthUnit , fontHeightUnit , startChar ){
        this._super();

        this._numberFontName = fontName;
        this._startCharacter = startChar;
        this._numberWidthUint = fontWidthUnit;
        this._numberHeightUnit = fontHeightUnit;



        return true;
    },

    setText:function( text ){
        if ( text == "" ){
            text = "0000";
        }

        this._numberLabelAtlas = new cc.LabelAtlas(
            text ,
            this._numberFontName ,
            this._numberWidthUint ,
            this._numberHeightUnit ,
            this._startCharacter
        );

        this.addChild(this._numberLabelAtlas);

        this.showAction();

    },

    showAction:function(){
        this._numberLabelAtlas.setScale(0.0);
        this._numberLabelAtlas.setOpacity(0.0);
        var fadeInAction = new cc.FadeIn( 0.3 );
        this._numberLabelAtlas.runAction(fadeInAction);

        var scalebigAction = new cc.ScaleTo( 0.3 , 1.2 );
        var scaleSmallAction = new cc.ScaleTo( 0.3 , 1.0 );
        var finishFunc = new cc.CallFunc( this.hideAction , this  );
        var sequenceAction = new cc.Sequence( scalebigAction , scaleSmallAction , finishFunc );
        this._numberLabelAtlas.runAction(sequenceAction);
    },

    hideAction:function(){
        var fadeOutAction = new cc.FadeOut(0.3);
        var finishFunc = new cc.CallFunc( this.removeFunc , this );
        var sequenceAction = new cc.Sequence( fadeOutAction , finishFunc );
        this._numberLabelAtlas.runAction( sequenceAction );

    },

    removeFunc:function(){
        cc.log("remove !");
        this.removeFromParent();
    }

});
