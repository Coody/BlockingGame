var ModelMgr = ( function(){
    var instance;

    function createInstance(){
        var object = new _ModelManager();
        return object;
    }

    return {
        getInstance:function(){
            if ( !instance ) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

var _ModelManager = cc.Node.extend({
    _ModelDic:{},

    ctor:function(){
        this._super();
        this._ModelDic = {};
        return true;
    },

    setModel:function( key , value ){
        if( this._ModelDic[key] != null ){
            cc.log( "isExist!" );
        }
        this._ModelDic[key] = value;
        // cc.log("key = " + key + "  , value = " + this._ModelDic[key]);
    },
    getModel:function( key ){
        if( this._ModelDic[key] == null ){
            cc.log( "Model is not Exist!" );
        }
        // cc.log("key = " + key + "  , value = " + this._ModelDic[key]);
        return this._ModelDic[key];
    }
});
