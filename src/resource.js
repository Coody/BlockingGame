var res = {

    BLOCK_GAME_RES_PIC_GAMEBOARDSCENE_BLOCK_png : "res/pic/GameBoardScene/block.png",
    BLOCK_GAME_RES_PIC_GAMEBOARDSCENE_TOPBAR_png : "res/pic/GameBoardScene/topBar.png",

    BLOCK_GAME_RES_PIC_STARTMENUSCENE_BLOCKBUTTON_png : "res/pic/StartMenuScene/blockButton.png",
    BLOCK_GAME_RES_PIC_STARTMENUSCENE_BLOCKBUTTONSELECTED_png : "res/pic/StartMenuScene/blockButtonSelected.png",
    BLOCK_GAME_RES_PIC_STARTMENUSCENE_STARTMENUBG_png : "res/pic/StartMenuScene/startMenuBG.png",

    BLOCK_GAME_RES_SOUNDS_BLOCKDISAPPEAR_mp3 : "res/sounds/blockDisappear.mp3",
    BLOCK_GAME_RES_SOUNDS_BLOCKDOWN_mp3 : "res/sounds/blockDown.mp3",
    BLOCK_GAME_RES_SOUNDS_BLOCKTOUCHFAIL_mp3 : "res/sounds/blockTouchFail.mp3",
    BLOCK_GAME_RES_SOUNDS_STARTMENUBGMUSIC_mp3 : "res/sounds/startMenuBGMusic.mp3",
    BLOCK_GAME_RES_SOUNDS_STARTMENUBTNPRESSED_mp3 : "res/sounds/startMenuBtnPressed.mp3",
    BLOCK_GAME_RES_SOUNDS_STARTMENUMUSIC_mp3 : "res/sounds/startMenuMusic.mp3",

    BLOCK_GAME_RES_SOUNDS_TAP_mp3 : "res/sounds/tap.mp3",
    BLOCK_GAME_RES_SOUNDS_TAP2_mp3 : "res/sounds/tap2.mp3",
    BLOCK_GAME_RES_SOUNDS_TAP3_mp3 : "res/sounds/tap3.mp3",
    BLOCK_GAME_RES_SOUNDS_TAP4_mp3 : "res/sounds/tap4.mp3",

    BLOCK_GAME_RES_UI_UP_ARROW_png : "res/pic/ui/but_arrow_1.png",
    BLOCK_GAME_RES_UI_DOWN_ARROW_png : "res/pic/ui/but_arrow2_1.png",
    BLOCK_GAME_RES_UI_SCROLL_BAR_BG_png : "res/pic/ui/selectgame_dragbar_1.png",
    BLOCK_GAME_RES_UI_SCROLL_BAR_SCROLL_png : "res/pic/ui/but_drag_1.png",

};

var g_resources = [
    // fonts
    {
        fontName:"From Cartoon Blocks",
        src:[{src:"res/FromCartoonBlocks.ttf", type:"truetype"}]
    },
    {
        fontName:"Luckiest Guy",
        src:[{src:"res/LuckiestGuy.ttf", type:"truetype"}]
    }
];

for (var i in res) {
    g_resources.push(res[i]);
}
