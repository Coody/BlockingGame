var XSG_SaveFileMgr = (function(){
    var instance;

    function _createInstance(){
        var object = new _XSG_SaveFileMgr();
        return object;
    };

    return {
        getInstance:function(){
            if ( !instance ) {
                instance = _createInstance();
            }
            return instance;
        }
    };

})();

var _XSG_SaveFileMgr = cc.Node.extend({

    _dataDic:null,

    ctor:function(){
        this._super();

        this._dataDic = {};

        return true;
    },

    //setKeyAndMembers:function( key , members ){
    //    var memberArray = this._memberDic[ key ];
    //    if( memberArray == null ) {
    //        // craete new
    //        this._memberDic[ key ] = members;
    //    }
    //    else{
    //        this._memberDic[ key ] = members;
    //    }
    //},

    saveDataWithKeyAndMembers:function( key , members ){
        this._dataDic[ key ] = members;
        var baseData = JSON.stringify( members );
        sys.localStorage.setItem( key, baseData );
    },

    loadDataWithKey:function( key ) {
        var localBaseData = sys.localStorage.getItem(key);
        var localBaseDataAfterParse = JSON.parse( localBaseData );
        if ( localBaseDataAfterParse == null ){
            cc.log( "No Data with key( " + key + " ) , PLEASE check this!" );
        }
        return localBaseDataAfterParse;
    },

    hasData:function( key ){
        if( this.loadDataWithKey( key ) ){
            return true;
        }
        return false;
    },

    // Show data
    showAllData:function(){
        var length = Object.keys(this._dataDic).length;
        if ( length > 0 ){
            for( var key in this._dataDic ){
                this.showDataWithKey( key );
            }
        }
        else{
            cc.log(" No Data! ");
        }
    },

    showDataWithKey:function( key ){
        cc.log( "Key: " + key + "\n" );
        cc.log( "Data: \n" + this._dataDic[ key ].toSource() );
    },
});
