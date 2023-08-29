<template>
    <div id="setting">
        W
        <input type="number" id="w" min="2" max="50" v-model.number="inputWidth">
        H
        <input type="number" id="h" min="2" max="25" v-model.number="inputHeight">
        B
        <input type="number" id="b" min="1" :max="mineMaxNum" v-model.number="inputMine">
        <span class="bombCount">0</span>
    </div>
    <div id="setting2">
        <div id="btn">
            START
        </div>
        <span id="time" class="timer">000</span>
    </div>
    <table id="board">
    </table>
    <h3 id="result"></h3>
    <div id="text">
        <h3>
            設定
        </h3>
        <p>W: 横のマスの数</p>
        <p>H: 縦のマスの数</p>
        <p>B: 爆弾の数</p>
        <h3>
            操作
        </h3>
        <p>左クリック: マスを開ける</p>
        <p>右クリック: <span class="flag"></span>マークを付ける</p>
    </div>
    <status-bar @init="init" />
    <board :width="width" :height="height" :mine="mine"/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
// import { Watch } from 'vue-property-decorator';
import Board from '@/components/modules/Board.vue';
import StatusBar from '@/components/modules/StatusBar.vue';

@Options({
    components: {
        Board,
        StatusBar
    }
})
export default class Game extends Vue {
    // 実際の盤面の幅・高さ・爆弾の数
    width: number = 9;
    height: number = 9;
    mine: number = 10;

    // 入力用の幅・高さ・爆弾の数
    inputWidth: number = 9;
    inputHeight: number = 9;
    inputMine: number = 10;

    // @Watch('inputWidth')
    // onTextChanged(newText: number) {
    //     this.inputWidth = newText > 50 ? 50 : newText < 1 ? 1 : newText;
    // }
    
    get mineMaxNum(){
        return Math.min(this.inputWidth * this.inputHeight - 9, 999)
    }

    init() {
        this.width = this.inputWidth;
        this.height = this.inputHeight;
        this.mine = this.inputMine;
    }

    leftClicked(x: number, y: number){
        console.log('Game leftClicked x:' + x + ' y:' + y);
        this.inputWidth = x;
        this.inputHeight = y;
    }

    rightClicked(x: number, y: number) {
        console.log('Game rightClicked x:' + x + ' y:' + y);
        this.inputWidth = y;
        this.inputHeight = x;
    }

}
</script>