<template>
    <table id="board" style="pointer-events; auto;">
        <tr id="row" v-for="x in height" :key="x">
            <cell v-for="y in width" :key="y" @click="leftClicked(x, y)" @right-click="rightClicked(x, y)">
            </cell>
        </tr>
    </table>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Cell from '@/components/modules/Cell.vue';

@Options({
    components: {
        Cell,
    },
    props: {
        width: Number,
        height: Number,
        mine: Number,
    }
})

export default class Board extends Vue {
    width!: number;
    height!: number;
    mine!: number;
    cellClass!: string;

    leftClicked(x: number, y: number) {
        console.log('Board leftClicked x:' + x + ' y:' + y);
        this.$emit('leftClicked', { x, y });
    }

    rightClicked(x: number, y: number) {
        console.log('Board rightClicked x:' + x + ' y:' + y);
        this.$emit('rightClicked', { x, y });
    }
}
</script>

<style scoped>
td {
    border: solid 3px white;
    width: 30px;
    height: 30px;
    font-weight: bold;
    text-align: center;
}
</style>