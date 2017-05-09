var BLOCK_MOVE_POSITION = {
    RIGHT:"RIGHT",
    LEFT:"LEFT",
    UP:"UP",
    DOWN:"DOWN",
    NONE:"NONE"
};

var BlockMoveManager = cc.Node.extend({

    _blockArray:null,

    ctor:function(){
        this._super();
        this._blockArray = [];
        return true;
    },

    getBlockArray:function(){
        return this._blockArray;
    },

    getMoveBlockArray:function(){
        var moveBlockArray = [];
        var blockCount = ModelMgr.getInstance().getModel( BLOCK_GAME_MODEL_KEY.GAME_LEVEL );
        var randomBlockCount = Math.floor(blockCount/5);

        // 目前存在的 block 的 key
        var array = [];
        for( var i = 0 ; i < 6 ; i++ ){
            for( var j = 0 ; j < 9 ; j ++ ){
                var tag = this._blockArray[i][j];
                if( tag != 0 ){
                    array.push(tag);
                }
            }
        }

        var arraylength = array.length;
        if( arraylength < randomBlockCount ){
            randomBlockCount = arraylength;
        }

        // block key 洗牌
        if( arraylength > 1 ){
            for( var i = 0 ; i < 10 ; i++ ){
                var randomNumberA = Math.floor( Math.random()*arraylength );
                var randomNumberB = Math.floor( Math.random()*arraylength );
                var tempNumber = array[ randomNumberA ];
                array[ randomNumberA ] = array[ randomNumberB ];
                array[ randomNumberB ] = tempNumber;
            }
        }

        // 取出 blockCount 的數目來讓他們隨機移動
        for( var i = 0 ; i < randomBlockCount ; i++ ){
            moveBlockArray.push( array[ i ] );
        }
        // cc.log( "move array = " + moveBlockArray.toSource() );
        return moveBlockArray;
    },

    /**
     * 移動一個 block 會自己隨機找出可以移動的方向並移動，且會更新內部邏輯，並且更新 block 的內部位置
     * @param  {BasicBlock} block
     * @return {BLOCK_MOVE_POSITION} 此 block 可以移動的位置
     */
    goGPS:function( block ){
        var position = BLOCK_MOVE_POSITION.NONE;

        var randomGoArray = [ BLOCK_MOVE_POSITION.UP , BLOCK_MOVE_POSITION.DOWN , BLOCK_MOVE_POSITION.RIGHT , BLOCK_MOVE_POSITION.LEFT ];
        for( var i = 0 ; i < 5 ; i++ ){
            var randomNumberA = Math.floor(Math.random()*5);
            var randomNumberB = Math.floor(Math.random()*5);
            var number = randomGoArray[randomNumberA];
            randomGoArray[randomNumberA] = randomGoArray[randomNumberB];
            randomGoArray[randomNumberB] = number;
        }

        var indexX = block.getIndexX();
        var indexY = block.getIndexY();

        for( var i = 0 ; i < 4 ; i++ ){
            switch ( randomGoArray[i] ) {
                case BLOCK_MOVE_POSITION.UP:
                {
                    if ( indexY == 8 ) {
                        // index == 8 已經是最上面的位置，不能再往上移動
                        continue;
                    }
                    else{
                        // 確認是否有block ，沒有就可以 Go，有的話就繼續 continue
                        if( this.canGo( indexX , indexY , randomGoArray[i] ) ){
                            position = randomGoArray[i];
                            this._blockArray[indexX][indexY+1] = this._blockArray[indexX][indexY];
                            this._blockArray[indexX][indexY] = 0;
                        }
                    }
                }
                    break;
                case BLOCK_MOVE_POSITION.DOWN:
                {
                    if ( indexY == 0 ) {
                        continue;
                    }
                    else{
                        // 確認是否有block ，沒有就可以 Go，有的話就繼續 continue
                        if( this.canGo( indexX , indexY , randomGoArray[i] ) ){
                            position = randomGoArray[i];
                            this._blockArray[indexX][indexY-1] = this._blockArray[indexX][indexY];
                            this._blockArray[indexX][indexY] = 0;
                        }
                    }
                }
                    break;
                case BLOCK_MOVE_POSITION.RIGHT:
                {
                    if ( indexX == 5 ) {
                        continue;
                    }
                    else{
                        // 確認是否有block ，沒有就可以 Go，有的話就繼續 continue
                        if( this.canGo( indexX , indexY , randomGoArray[i] ) ){
                            position = randomGoArray[i];
                            this._blockArray[indexX+1][indexY] = this._blockArray[indexX][indexY];
                            this._blockArray[indexX][indexY] = 0;
                        }
                    }
                }
                    break;
                case BLOCK_MOVE_POSITION.LEFT:
                {
                    if ( indexX == 0 ) {
                        continue;
                    }
                    else{
                        // 確認是否有block ，沒有就可以 Go，有的話就繼續 continue
                        if( this.canGo( indexX , indexY , randomGoArray[i] ) ){
                            position = randomGoArray[i];
                            this._blockArray[indexX-1][indexY] = this._blockArray[indexX][indexY];
                            this._blockArray[indexX][indexY] = 0;
                        }
                    }
                }
                    break;
                default:
                    break;
            }
            if( position != BLOCK_MOVE_POSITION.NONE ){
                break;
            }
        }
        return position;
    },

    /**
     * 確認此方位是否可以移動
     * @param  {var} indexX             block 的 X 位置
     * @param  {var} indexY             block 的 Y 位置
     * @param  {BLOCK_MOVE_POSITION} newENUMPosition 移動位置
     * @return {var} checkCanGo         true , false
     */
    canGo:function(  recentX , recentY , newENUMPosition ){
        // cc.log( "( x , y ) = ( " + recentX + " , " + recentY + " )" );
        var checkCanGo = false;
        switch ( newENUMPosition ) {
            case BLOCK_MOVE_POSITION.UP:
            {
                if( this._blockArray[recentX][recentY+1] == 0 ){
                    checkCanGo = true;
                }
            }
                break;
            case BLOCK_MOVE_POSITION.DOWN:
            {
                if( this._blockArray[recentX][recentY-1] == 0 ){
                    checkCanGo = true;
                }
            }
                break;
            case BLOCK_MOVE_POSITION.LEFT:
            {
                if( this._blockArray[recentX-1][recentY] == 0 ){
                    checkCanGo = true;
                }
            }
                break;
            case BLOCK_MOVE_POSITION.RIGHT:
            {
                if( this._blockArray[recentX+1][recentY] == 0 ){
                    checkCanGo = true;
                }
            }
                break;
            default:
                break;
        }
        return checkCanGo;
    },

    addNewBlock:function(){
        // 找的地方隨便加入 Block
    },

    removeBlockWithTag:function( blockTag ){
        var isSuccess = false;
        for( var i = 0 ; i < 6 ; i++ ){
            for( var j = 0 ; j < 9 ; j++ ){
                if( this._blockArray[i][j] == blockTag ){
                    this._blockArray[i][j] = 0;
                    isSuccess = true;
                    break;
                }
            }
        }
        return isSuccess;
    },

    removeBlockWithPosition:function( indexX , indexY ){
        var isSuccess = false;
        if( this._blockArray[indexX][indexY] != 0 ){
            this._blockArray[indexX][indexY] == 0;
            isSuccess = true;
        }
        return isSuccess;
    },

    /**
     * 初始化邏輯 block Array
     * @param  {var} blockNumber block 的數量
     */
    initialBlockArray:function( blockCount ){
        var number = 1;
        for( var i = 0 ; i < 6 ; i++ ){
            this._blockArray[i] = [];
            for( var j = 0 ; j < 9 ; j++ ){
                if( blockCount >= number ){
                    this._blockArray[i][j] = number ;
                    number++;
                }
                else{
                    this._blockArray[i][j] = 0;
                }
            }
        }
    },

    /**
     * 洗牌（將 block array 的位置洗 50 次）
     * @return {[type]} [description]
     */
    shuffleBlockArray:function(){
        for( var i = 0 ; i < 50 ; i++ ){
            var numberI = Math.floor(Math.random()*6);
            var numberJ = Math.floor(Math.random()*9);
            var exchangeNumberI = Math.floor(Math.random()*6);
            var exchangeNumberJ = Math.floor(Math.random()*9);
            var number = this._blockArray[numberI][numberJ];
            this._blockArray[numberI][numberJ] = this._blockArray[exchangeNumberI][exchangeNumberJ];
            this._blockArray[exchangeNumberI][exchangeNumberJ] = number;
        }
    },

    getBlockPosition:function( indexX , indexY ){
        return (cc.p( 70 + 100*indexX , 70 + 100*indexY ));
    },

    // MARK: Develop
    showBlockArray:function(){
        var string = "";
        for (var i = 0; i < 6 ; i++) {
            for (var j = 0; j < 9 ; j++) {
                string = string + ( this._blockArray[i][j] >= 10 ? " " + this._blockArray[i][j] : "  " + this._blockArray[i][j] );
            }
            cc.log( string );
            string = "";
        }
    },
});
