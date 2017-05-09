/**
 * 單向鏈結串列
 */
function Linklist(){
    this.head = null,
    this._length = 0;
}

/**
 * Node 單一節點
 */
function Node( data ){
    this.data = data;
    this.next = null;
}

/**
 * 加入節點
 * @param  {} data  任意物件（如果物件內有 score 才會依照 score 的大小來做排列，否則就會是堆疊方式的 stack ）
 * @return {}       回傳新的 node
 */
Linklist.prototype.add = function( data ){
    var node = new Node( data );
    var currentNode = this.head;

    // 都沒有節點，則建立第一個節點
    if( !currentNode ){
        this.head = node;
        this._length++;
        return node;
    }

    if( currentNode.data["score"] == null ){
        // 堆疊（後進先出）
        while ( currentNode.next != null ) {
            currentNode = currentNode.next;
        }
        // 加到最後面
        currentNode.next = node;
    }
    else{
        // 依照大到小排列
        if( this._length == 1 ){
            if( currentNode.data["score"] >= node.data["score"] ){
                // 加在後面
                currentNode.next = node;
            }
            else{
                // 加在前面
                node.next = currentNode;
                this.head = node;
            }
        }
        else{
            // 第一個
            if( node.data["score"] > currentNode.data["score"] ){
                node.next = currentNode;
                this.head = node;
            }
            else{

                while( currentNode.next != null && node.data["score"] <= currentNode.next.data["score"] ){
                    currentNode = currentNode.next;
                }
                node.next = currentNode.next;
                currentNode.next = node;
            }
        }
    }
    this._length++;
    return node;
}

/**
 * 儲存此鏈結串列
 * @param  {} key 儲存的 Key
 */
Linklist.prototype.save = function( key ){
    let scoreArray = [];
    let currentNode = this.head;
    while ( currentNode ) {
        scoreArray.push( currentNode );
        currentNode = currentNode.next;
    }
    XSG_SaveFileMgr.getInstance().saveDataWithKeyAndMembers( key , scoreArray );
}

/**
 * 讀取本地端儲存的鏈結串列
 * @param  {} key 儲存的 Key
 */
Linklist.prototype.load = function( key ){
    if( XSG_SaveFileMgr.getInstance().hasData(key) ){
        var dataArray = XSG_SaveFileMgr.getInstance().loadDataWithKey( key );
        this.head = dataArray[0];
        this._length = dataArray.length;
    }
}

Linklist.prototype.convertToArray = function(){
    var dataArray = [];
    let currentNode = this.head;
    while ( currentNode ) {
        dataArray.push( currentNode.data );
        currentNode = currentNode.next;
    }
    return dataArray;
}

/**
 * 顯示鏈結串列
 */
Linklist.prototype.show = function(){
    let tempHead = this.head;
    while ( tempHead ) {
        cc.log( tempHead.data.toSource() + " -> ");
        tempHead = tempHead.next;
    }
    cc.log( "null" );
}
