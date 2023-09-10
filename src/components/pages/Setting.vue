<template>
    <section>
        <h1>選択</h1>
        <div class="setting">
            <select class="select-item" v-model="selectedDifficulty">
                <option>簡単</option>
                <option>普通</option>
                <option>難しい</option>
            </select>
        </div>
    </section>
    <section>
        <h1>カスタム</h1>
        <div class="setting">
            横の長さ
            <input type="number" id="w" :min="2" :max="50" v-model.number="inputWidth">
        </div>
        <div class="setting">
            縦の長さ
            <input type="number" id="h" :min="2" :max="50" v-model.number="inputHeight">
        </div>
        <div class="setting">
            爆弾数
            <input type="number" id="b" :min="1" :max="mineMaxNum" v-model.number="inputMine">
        </div>
    </section>
    <section>
        <div id="buttons">
            <router-link class="btn" id="cancel-btn" :to="cancelButtonUrl">キャンセル</router-link>
            <router-link class="btn" id="decision-btn" :to="decisionButtonUrl">決定</router-link>
        </div>
    </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Watch } from 'vue-property-decorator';

@Options({})

export default class Setting extends Vue {
    // 入力用の幅・高さ・爆弾の数
    inputWidth: number = 9;
    inputHeight: number = 9;
    inputMine: number = 10;

    selectedDifficulty: string | null = null;

    mounted() {
        this.inputWidth = Number(this.$route.params.width) ?? 9;
        this.inputHeight = Number(this.$route.params.height) ?? 9;
        this.inputMine = Number(this.$route.params.mine) ?? 10;
    }

    // 爆弾の最大数
    get mineMaxNum() {
        return Math.min(this.inputWidth * this.inputHeight - 9, 999)
    }

    get decisionButtonUrl() {
        return "/" + this.inputWidth + "/" + this.inputHeight + "/" + this.inputMine;
    }

    get cancelButtonUrl() {
        return "/" + Number(this.$route.params.width) + "/" + Number(this.$route.params.height) + "/" + Number(this.$route.params.mine);
    }

    @Watch("selectedDifficulty", {})
    public selectDifficulty(val: string) {
        console.log('Setting selectDifficulty selectedDifficulty:' + this.selectedDifficulty!);
        switch (val) {
            case "簡単":
                this.inputWidth = 9;
                this.inputHeight = 9;
                this.inputMine = 10;
                break;

            case "普通":
                this.inputWidth = 16;
                this.inputHeight = 16;
                this.inputMine = 40;
                break;

            case "難しい":
                this.inputWidth = 30;
                this.inputHeight = 16;
                this.inputMine = 99;
                break;

            default:
                break;
        }
    }
}

</script>

<style scoped>
h1 {
    margin: 20px auto;
    width: 200px;
    text-align: left;
    align-items: center;
}

.setting {
    margin: 10px auto;
    width: 200px;
    text-align: right;
    align-items: center;
}

.select-item {
    width: 80px;
    height: 30px;
    text-align: center;
    align-items: center;
}

#h,
#w,
#b {
    width: 50px;
    height: 30px;
    text-align: right;
}

#buttons {
    width: 400px;
    margin: 20px auto;
    display: flex;
    justify-content: flex-start;
}

#cancel-btn {
    width: 30%;
    color: black;
    border: solid 1px black;
    background: white;
}

#decision-btn {
    width: 30%;
    color: white;
    border: solid 1px black;
    background: black;
}
</style>