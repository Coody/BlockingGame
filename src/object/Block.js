var Block = cc.Sprite.extend({

    _indexX:null,
    _indexY:null,

    moveInAction:function(){},
    specialAction:function(){},
    breakAction:function(){},

    ctor:function( imageName , tag , indexX , indexY ){
        this._super( imageName );
        this.setTag( tag );
        this._indexX = indexX;
        this._indexY = indexY;
        return true;
    },

    getIndexX:function(){
        return this._indexX;
    },
    setIndexX:function( newX ){
        this._indexX = newX;
    },

    getIndexY:function(){
        return this._indexY;
    },
    setIndexY:function( newY ){
        this._indexY = newY;
    },

    /**
     * 往上走
     * @return {[type]} [description]
     */
    goUp:function(){
        this._isMoving = true;
        this.setIndexY( this._indexY+1 );
        // distanceX , distanceY , time , targetDelegate , targetCallBack
        var moveAction = ActionTools.getMoveByAction( 0 , 100 , D_BLOCK_MOVE_SPEED );
        var easeAction = new cc.EaseInOut( moveAction , 10.0 );
        var finishCallBack = new cc.CallFunc( this._finishMoving , this );
        var sequenceAction = cc.Sequence( easeAction , finishCallBack );
        this.runAction( sequenceAction );
    },

    /**
     * 往下走
     * @return {[type]} [description]
     */
    goDown:function(){
        this._isMoving = true;
        this.setIndexY( this._indexY-1 );
        // distanceX , distanceY , time , targetDelegate , targetCallBack
        var moveAction = ActionTools.getMoveByAction( 0 , -100 , D_BLOCK_MOVE_SPEED );
        var easeAction = new cc.EaseInOut( moveAction , 10.0 );
        var finishCallBack = new cc.CallFunc( this._finishMoving , this );
        var sequenceAction = cc.Sequence( easeAction , finishCallBack );
        this.runAction( sequenceAction );
    },

    /**
     * 往左走
     * @return {[type]} [description]
     */
    goLeft:function(){
        this._isMoving = true;
        this.setIndexX( this._indexX-1 );
        // distanceX , distanceY , time , targetDelegate , targetCallBack
        var moveAction = ActionTools.getMoveByAction( -100 , 0 , D_BLOCK_MOVE_SPEED );
        var easeAction = new cc.EaseInOut( moveAction , 10.0 );
        var finishCallBack = new cc.CallFunc( this._finishMoving , this );
        var sequenceAction = cc.Sequence( easeAction , finishCallBack );
        this.runAction( sequenceAction );
    },

    /**
     * 往右走
     * @return {[type]} [description]
     */
    goRight:function(){
        this._isMoving = true;
        this.setIndexX( this._indexX+1 );
        // distanceX , distanceY , time , targetDelegate , targetCallBack
        var moveAction = ActionTools.getMoveByAction( 100 , 0 , D_BLOCK_MOVE_SPEED );
        var easeAction = new cc.EaseInOut( moveAction , 10.0 );
        var finishCallBack = new cc.CallFunc( this._finishMoving , this );
        var sequenceAction = cc.Sequence( easeAction , finishCallBack );
        this.runAction( sequenceAction );
    },
});
