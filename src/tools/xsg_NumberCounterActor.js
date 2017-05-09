var XSG_NumberCounterActor = cc.Layer.extend({

    _numberCounterLabel:null,
    _numberCounterSpeed:null,
    _numberCounterSpeedRate:0.5,
    _isNeedPlayAnime:true,
    _targetNumber:0,
    _recentNumber:0,
    _increaseOrDecreaseNumber:10,

    _targetDelegate:null,
    _targetCallFunc:null,

    _isStartSound:false,
    _countingSoundKey:null,


    ctor:function( fontName , fontWidthUnit , fontHeightUnit , fontStartCharacter  , isNeedPlayAnime , recentNumber , speed){
        this._super();

        // preload Sound
        this._preloadAllSounds();

        // initial
        this._isNeedPlayAnime = isNeedPlayAnime;
        this._numberCounterSpeed = speed;

        // let TargetNumber the same with RecentNumber
        this._recentNumber = recentNumber;
        this._targetNumber = recentNumber;

        this._numberCounterLabel = new cc.LabelAtlas(
            "0" ,
            fontName ,
            fontWidthUnit ,
            fontHeightUnit ,
            fontStartCharacter
        );

        this.addChild( this._numberCounterLabel );

        return true;
    },

    /**
     * Delegate
     * @param target
     * @param
     * */
    setDelegate:function( target , tergetCallBack ){
        this._targetDelegate = target;
        this._targetCallFunc = tergetCallBack;
    },

    isNeedAnime:function( isNeed ){
        this._isNeedPlayAnime = isNeed;
    },

    setTargetNumber:function( newTargetNumber ){
        this._targetNumber = newTargetNumber;
        this._recentNumber = newTargetNumber;
        this._numberCounterLabel.setString( this._targetNumber );
    },

    getTargetNumber:function(){
        var tempTargetNumber = this._targetNumber;
        return tempTargetNumber;
    },

    increaseNumbers:function( numbers ){
        this._targetNumber = this._targetNumber + numbers;
        if( this._isNeedPlayAnime == true &&
            this._recentNumber < this._targetNumber ){
            this.unschedule( this._update );
            this.schedule( this._update , 0.2 / this._numberCounterSpeed , cc.REPEAT_FOREVER , 0.1 );
            this._increaseSpeed();
            this._playNumberCountingSound();
        }
        else{
            this._numberCounterLabel.setString(this._targetNumber);
            if ( this._targetDelegate ){
                this._targetCallFunc.call( this._targetDelegate , this );
            }
        }
    },

    increaseForever:function(){
        this._targetNumber = Number.MAX_SAFE_INTEGER;
        this.schedule( this._update , 0.2 / this._numberCounterSpeed , cc.REPEAT_FOREVER , 0.1 );
        this._playNumberCountingSound();
    },

    _update:function( dt ){
        this._recentNumber = this._recentNumber + this._increaseOrDecreaseNumber;
        if( this._recentNumber < this._targetNumber ){
            this._numberCounterLabel.setString( this._recentNumber );
        }
        else{
            this.unschedule( this._update );
            this._recentNumber = this._targetNumber;
            this._numberCounterLabel.setString( this._targetNumber );
            this._numberCounterSpeed = 1.0;
            if ( this._targetDelegate ){
                this._targetCallFunc.call( this._targetDelegate , this );
            }
            this._playEndNumberCountingSound();
        }
    },

    _increaseSpeed:function(){
        this._numberCounterSpeed = this._numberCounterSpeed + this._numberCounterSpeedRate;
    },

    decreaseNumbers:function( numbers ){
        if( numbers < 0 ){
            numbers = numbers * -1;
        }
        this._targetNumber = this._targetNumber - numbers;
        if( this._isNeedPlayAnime == true &&
            this._recentNumber > this._targetNumber ){
            this.unschedule( this._updateDecrease );
            this.schedule( this._updateDecrease , 0.2 / this._numberCounterSpeed , cc.REPEAT_FOREVER , 0.1 );
            this._increaseSpeed();
            this._playNumberCountingSound();
        }
        else{
            this._numberCounterLabel.setString(this._targetNumber);
            if ( this._targetDelegate ){
                this._targetCallFunc.call( this._targetDelegate , this );
            }
            this._playEndNumberCountingSound();
        }
    },

    decreaseForever:function(){
        this._targetCallFunc = Number.MIN_SAFE_INTEGER;
        this.schedule( this._updateDecrease , 0.2 / this._numberCounterSpeed , cc.REPEAT_FOREVER , 0.1 );
        this._playNumberCountingSound();
    },

    _updateDecrease:function( dt ){
        this._recentNumber = this._recentNumber - this._increaseOrDecreaseNumber;
        cc.log( "recent = " + this._recentNumber + "    target = " + this._targetNumber );
        if( this._recentNumber > this._targetNumber ){
            this._numberCounterLabel.setString( this._recentNumber );
        }
        else{
            this.unschedule( this._updateDecrease );
            this._recentNumber = this._targetNumber;
            this._numberCounterLabel.setString( this._targetNumber );
            this._numberCounterSpeed = 1.0;
            if ( this._targetDelegate ){
                this._targetCallFunc.call( this._targetDelegate , this );
            }
            this._playEndNumberCountingSound();
        }
    },

    _preloadAllSounds:function(){
        jsb.AudioEngine.preload( res.HW8_Sound_Scoring_wav );
        jsb.AudioEngine.preload( res.HW8_Sound_ScoringEnd_wav );
    },

    _playNumberCountingSound:function(){
        if( this._isStartSound == false ){
            this._isStartSound = true;
            this._countingSoundKey = jsb.AudioEngine.play2d( res.HW8_Sound_Scoring_wav , true );
        }
    },

    _playEndNumberCountingSound:function(){
        if ( jsb.AudioEngine.getState( this._countingSoundKey ) == jsb.AudioEngine.AudioState.PLAYING ){
            jsb.AudioEngine.pause( this._countingSoundKey );
        }
        jsb.AudioEngine.play2d( res.HW8_Sound_ScoringEnd_wav , false );
        this._isStartSound = false;
    },

    stopIncreaseOrDecreaseForever:function(){
        this._targetNumber = this._recentNumber;
    },
});
