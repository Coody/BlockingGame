var ActionTools = {

    /**
     * 心跳的動作( RepeatForever )
     * @param  {float} rate 心跳的速率 , 1.0 為預設
     * @return {Sequence}
     */
    getHeartBeatAction:function( rate ){
        rate = rate || 1.0;
        var scaleToAction = new cc.ScaleTo( 0.03 * rate , 1.2 );
        var easeInAction = new cc.EaseIn( scaleToAction , 0.3 * rate );
        var scaleALittleSmall = new cc.ScaleTo( 0.03 * rate , 1.0 );
        var easeOutAction = new cc.EaseOut( scaleALittleSmall , 0.5 * rate );
        var delayTiem = new cc.DelayTime( 0.68 * rate );
        var sequenceHeartBitAction = new cc.Sequence( easeInAction , easeOutAction , delayTiem );
        return sequenceHeartBitAction;
    },

    /**
     * 移動Action ( MobeBy )
     * @param  {float} distanceX
     * @param  {float} distanceY
     * @param  {float} time ( 預設 0.2 )
     * @param  {} targetDelegate 回呼target
     * @param  {} targetCallBack 回呼function
     * @param  {float} easeRate ( 預設 0.8 )
     * @return {Sequence}
     */
    getMoveByAction:function( distanceX , distanceY , time , targetDelegate , targetCallBack , easeRate ){
        time = time || 0.2;
        easeRate = easeRate || 0.8;
        var moveBy = new cc.MoveBy( time , cc.p( distanceX , distanceY ) );
        var easeIn = new cc.EaseIn( moveBy , easeRate );
        if( targetDelegate != null && targetCallBack != null ){
            var callBackAction = new cc.CallFunc( targetCallBack , targetDelegate );
            var delayTime = new cc.DelayTime( 0.15 );
            var sequenceAction = new cc.Sequence( easeIn , delayTime , callBackAction );
            return sequenceAction;
        }
        else{
            return easeIn;
        }

    },

    /**
     * 移動Action ( MoveTo )
     * @param  {float} distanceX
     * @param  {float} distanceY
     * @param  {float} time ( 預設 0.2 )
     * @param  {} targetDelegate 回呼target
     * @param  {} targetCallBack 回呼function
     * @param  {float} easeRate ( 預設 0.8 )
     * @return {Sequence}
     */
    getMoveToAction:function( distanceX , distanceY , time , targetDelegate , targetCallBack ){
        time = time || 0.2;
        var moveTo = new cc.MoveTo( time , cc.p( distanceX , distanceY ) );
        var easeOut = new cc.EaseOut( moveTo , 2.0 );
        if( targetDelegate != null && targetCallBack != null ){
            var callBackAction = new cc.CallFunc( targetCallBack , targetDelegate );
            var delayTime = new cc.DelayTime( 0.15 );
            var sequenceAction = new cc.Sequence( easeOut , delayTime , callBackAction );
            return sequenceAction;
        }
        else{
            return easeOut;
        }

    },

    /**
     * 漸進顯示動作
     * @param  {float} time
     * @param  {} target
     * @param  {} finishCallBack
     * @return {Sequence}
     */
    getFadeInAction:function( time , target , finishCallBack){
        time = time || 0.2;
        var fadeInAction = new cc.FadeIn( time );
        if( target != null && finishCallBack != null ){
            var callBackAction = new cc.CallFunc( finishCallBack , target );
            var delayTime = new cc.DelayTime( 0.1 );
            var sequenceAction = new cc.Sequence( fadeInAction , delayTime , callBackAction );
            return sequenceAction;
        }
        else{
            return fadeInAction;
        }
    },

    /**
     * 漸進消失Action
     * @param  {float} time
     * @param  {} target
     * @param  {} finishCallBack
     * @return {Sequence}
     */
    getFadeOutAction:function( time , target , finishCallBack ){
        time = time || 0.2;
        var fadeOutAction = new cc.FadeOut( time );
        if( target != null && finishCallBack != null ){
            var callBackAction = new cc.CallFunc( finishCallBack , target );
            var delayTime = new cc.DelayTime( 0.1 );
            var sequenceAction = new cc.Sequence( fadeOutAction , delayTime , callBackAction );
            return sequenceAction;
        }
        else{
            return fadeOutAction;
        }
    },

    /**
     * Scale動作 ( ScaleTo )
     * @param  {float} scaleRate 比例（原始大小的幾倍）
     * @param  {float} time
     * @param  {float} easeRate
     * @param  {ACTION_EASE_TYPE} easeType Ease的種類（ IN , OUT , INOUT ）
     * @return {Sequence}
     */
    getScaleToAction:function( scaleRate , time , easeRate , easeType ){
        easeType = easeType || ACTION_EASE_TYPE.INOUT;
        easeRate = easeRate || 0.98;
        var scaleAction = new cc.ScaleTo( time , scaleRate );
        var easeAction;
        switch ( easeType ) {
            case ACTION_EASE_TYPE.IN:
                easeAction = new cc.EaseIn( scaleAction , easeRate );
                break;
            case ACTION_EASE_TYPE.OUT:
                easeAction = new cc.EaseOut( scaleAction , easeRate );
                break;
            case ACTION_EASE_TYPE.INOUT:
            default:
                easeAction = new cc.EaseInOut( scaleAction , easeRate );
                break;

        }
        return easeAction;
    },

    /**
     * 變大變小的動作 ( RepeatForever )
     * @param  {float} scaleRate
     * @param  {float} time
     * @param  {float} easeInOutRate
     * @return {Sequence}
     */
    getScaleBigAndSmallRepeatAction:function( scaleRate , time , easeInOutRate ){
        var scaleBigAction = ActionTools.getScaleToAction( scaleRate , time , easeInOutRate );
        var scaleSmallAction = ActionTools.getScaleToAction( 1.0 , time , easeInOutRate );
        var sequenceAction = new cc.Sequence( scaleBigAction , scaleSmallAction );
        var repeatAction = new cc.RepeatForever( sequenceAction );
        return repeatAction;
    },

    /**
     * 改變顏色 (RepeatForever)
     * @param  {float} time
     * @param  {} deltaRed
     * @param  {} deltaGreen
     * @param  {} deltaBlue
     * @return {Sequence}
     */
    getChangeColorAction:function( time , deltaRed , deltaGreen , deltaBlue ){
        var tintByAction1 = new cc.TintBy( time , deltaRed , deltaGreen , deltaBlue );
        var easeOutAction = new cc.EaseOut( tintByAction1 , 5.0 );
        var delayTimeAction = new cc.DelayTime( 0.5 );
        var TintByAction2 = new cc.TintBy( time , deltaRed*-1 , deltaGreen*-1 , deltaBlue*-1 );
        var easeInAction = new cc.EaseIn( TintByAction2 , 5.0 );
        var sequenceAction = new cc.Sequence( easeOutAction , delayTimeAction , easeInAction );
        var repeatAction = new cc.RepeatForever( sequenceAction );
        return repeatAction;
    },

};

var ACTION_EASE_TYPE = {
    IN:"IN",
    OUT:"OUT",
    INOUT:"INOUT",
};
