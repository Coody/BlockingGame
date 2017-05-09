var TableView = cc.Node.extend({

    _cellArray:null,

    ctor:function( params ){
        this._super();

        for( let i = 0 ; i < params.length ; i++ ){
            this._createCell( params[i] , i );
        }

        this.setContentSize( cc.winSize.width , 120 * params.length );

        return true;
    },

    _createCell:function( object , index ){
        var size = cc.winSize;
        let nameLabel = new cc.LabelTTF(
            index + 1,
            "From Cartoon Blocks",
            60,
            null,
            cc.TEXT_ALIGNMENT_CENTER,
            cc.VERTICAL_TEXT_ALIGNMENT_LEFT
        );
        nameLabel.setPosition( cc.p( size.width*0.15 , -40 - 60*(index+1) ) );
        nameLabel.setColor( cc.color.BLACK );
        this.addChild( nameLabel );

        let scoreLabel = new cc.LabelTTF(
            object["score"],
            "From Cartoon Blocks",
            60,
            null,
            cc.TEXT_ALIGNMENT_CENTER,
            cc.VERTICAL_TEXT_ALIGNMENT_RIGHT
        );
        scoreLabel.setPosition( cc.p( size.width*0.75 , -40 - 60*(index+1) ) );
        scoreLabel.setColor( cc.color.BLACK );
        this.addChild( scoreLabel );
    }
});
