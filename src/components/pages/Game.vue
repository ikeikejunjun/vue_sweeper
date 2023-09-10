<template>
    <div id="setting">
        W
        <input type="number" id="w" min="2" max="50" v-model.number="inputWidth">
        H
        <input type="number" id="h" min="2" max="25" v-model.number="inputHeight">
        B
        <input type="number" id="b" min="1" :max="mineMaxNum" v-model.number="inputMine">
    </div>

        <div class="status-bar">
            <div class="counters">
                <div class="counter">
                    {{ timer.playTime }}
                </div>
                <div class="counter">
                    {{ restMinesNum }}
                </div>
            </div>
            <div id="start-btn" @click="resetSetting()">
                {{ startButtonText }}
            </div>
            <router-link to="/HelloWorld">設定</router-link>
        </div>
        <table id="board" style="pointer-events; auto;">
            <tr id="row" v-for="(row, x) in rows" :key="x">
                <cell v-for="(point, y) in row" :key="y" :cell="point" @left-click="openCell(x, y)"
                    @right-click="setFlagToCell(x, y)" ref="cells">
                </cell>
            </tr>
        </table>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Cell from '@/components/modules/Cell.vue';
import type CellInterface from '@/script/CellInterface';
import ProgressGame from '@/script/ProgressGame';
import Timer from '@/script/Timer';


@Options({
    components: {
        Cell
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

    // 盤面の各セルの情報を持つ2次元配列
    rows: CellInterface[][] = [];

    startButtonText: string = "Reset";
    
    progressGame = new ProgressGame(this.height, this.width, this.mine);
    timer = new Timer();

    // 読み込み時に一旦盤面を作る（見せる用）
    mounted() {
        this.rows = this.progressGame.initRows();
    }

    // 爆弾の最大数
    get mineMaxNum() {
        return Math.min(this.inputWidth * this.inputHeight - 9, 999)
    }

    // 空いている数
    get openedCellsNum() {
        let countOpendCells: number = 0;
        this.rows.forEach(row => countOpendCells = countOpendCells + row.filter(cell => cell.isOpen).length);
        return countOpendCells;
    }

    // 立っている旗の数に対しての残り爆弾数
    get restMinesNum() {
        let countFlagCells: number = 0;
        this.rows.forEach(row => countFlagCells = countFlagCells + row.filter(cell => cell.isFlag).length);
        return this.mine - countFlagCells;
    }

    // 設定を反映する
    resetSetting() {
        console.log('Game resetSetting');
        this.progressGame = new ProgressGame(this.inputHeight, this.inputWidth, this.inputMine);
        this.rows = this.progressGame.initRows();
        this.startButtonText = "Reset";
        this.timer.reset();
    }


    // 左クリック -> UI側での名前がそのまま使われている openCell とか名前を変えると自然と処理の中身が分離される
    openCell(x: number, y: number) {
        console.log('Game openCell x:' + x + ' y:' + y);

        // マスが空いている・旗が立っているときは処理を行わない
        if (this.rows[x][y].isOpen || this.rows[x][y].isFlag) {
            return;
        }

        // 1手目のときは盤面の初期設定を行う
        if (this.openedCellsNum === 0) {
            this.progressGame.putMines(x, y, this.rows);
            this.progressGame.setMinesCount(this.rows);

            this.timer.start();
        }

        // 爆弾を踏んでしまった場合
        if (this.rows[x][y].hasMine) {
            console.log("pushMine");
            this.startButtonText = "Lose";
            this.rows.forEach(row => row.forEach(cell => cell.isOpen = true));
            this.timer.stop();
            return;
        }

        // マスを開ける処理
        this.rows[x][y].isOpen = true;
        // 空のマスなら上下左右も開ける処理に移行
        if (this.rows[x][y].mineCount === "") {
            this.progressGame.openAroundCells(x, y, this.rows)
        }

        // クリアしたか判定する
        if (this.openedCellsNum === this.progressGame.canBeOpenedCellNum) {
            this.startButtonText = "Clear";
            this.rows.forEach(row => row.forEach(cell => cell.isOpen = true));
            this.timer.stop();
        }
        console.log('opendCellsNum:' + this.openedCellsNum)
    }

    // 右クリック
    setFlagToCell(x: number, y: number) {
        console.log('Game rightClicked x:' + x + ' y:' + y);
        // 最初の左クリックがまだなら、処理を終了
        if (this.openedCellsNum === 0) {
            return;
        }
        // 既に空いているマスなら無視をする
        if (this.rows[x][y].isOpen) {
            return;
        }
        // 旗の数が爆弾の数と同じで、それ以上旗を立てようとしていたら処理を行わない
        if (this.restMinesNum === 0 && !this.rows[x][y].isFlag) {
            return;
        }
        // 旗が立っていたら下げて、下がっていたら立てる
        this.rows[x][y].isFlag = !this.rows[x][y].isFlag;
    }

}
</script>

<style scoped>
.status-bar {
    display: flex;
    justify-content: space-between;
    width: 400px;
    margin: 0 auto;
}

.counters {
    display: flex;
    justify-content: flex-start;
}

.counter {
    color: #fff;
    border: solid 1px #fff;
    text-align: right;
    width: 50px;
    padding: 5px;
    background-color: black;
}

#start-btn {
    width: 30%;
    margin: 3px auto;
    padding: 2px;
    font-weight: bold;
    text-align: center;
    color: white;
    border: solid 1px black;
    background: black;
    border-radius: 5px;
    cursor: pointer;
}

td {
    border: solid 3px white;
    width: 30px;
    height: 30px;
    font-weight: bold;
    text-align: center;
}
</style>