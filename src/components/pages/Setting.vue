<template>
    <div id="setting">
        W
        <input type="number" id="w" :min="2" :max="50" v-model.number="inputWidth">
        H
        <input type="number" id="h" :min="2" :max="25" v-model.number="inputHeight">
        B
        <input type="number" id="b" :min="1" :max="mineMaxNum" v-model.number="inputMine">
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})

export default class Setting extends Vue {
    // 入力用の幅・高さ・爆弾の数
    inputWidth: number = 9;
    inputHeight: number = 9;
    inputMine: number = 10;
    
    // 爆弾の最大数
    get mineMaxNum() {
        return Math.min(this.inputWidth * this.inputHeight - 9, 999)
    }
}

</script>