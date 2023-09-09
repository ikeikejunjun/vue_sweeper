<template>
    <td class="cell" :class="classArray" @click="$emit('left-click')" @click.right.prevent="$emit('right-click')">
        <div v-if="cell.isOpen">
            {{ cell.mineCount }}
            <icon-mine v-if="cell.hasMine" />
            <!-- <ms-icon-miss v-if="miss" /> -->
        </div>
        <div v-else>
            <icon-flag v-if="cell.isFlag" />
        </div>
    </td>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import type CellInterface from '@/script/CellInterface.js';
import IconFlag from '@/assets/icons/IconFlag.vue';
import IconMine from '@/assets/icons/IconMine.vue';

@Options({
    components: {
        IconFlag,
        IconMine,
    },
    props: {
        cell: {
            type: Object,
            required: true,
        }
    }
})
export default class Cell extends Vue {
    cell!: CellInterface;

    // Class上書き
    get classArray() {
        const { cell } = this;
        if (this.cell.isOpen) {
            // openのクラスで上書き
            return ['open', `color-${cell.mineCount}`]
        }
        if (cell.isFlag) {
            return ['flag']
        }
        return []
    }
}
</script>

<style scoped>
.cell {
    width: 2.1rem;
    height: 2.1rem;
    line-height: 2.1rem;
    font-size: 1.5rem;
    margin: 0.15rem;
    background-color: #888;
    font-family: "Roboto Mono", monospace;
    font-weight: bold;
    text-align: center;
    position: relative;
}

/**
 * 各数字ごとのカラーリング
 */
.cell.open {
    background-color: #e3e3e3;
}

.cell.color-1 {
    background-color: #e3e3e3;
    color: #0200fb;
}

.cell.color-2 {
    background-color: #e3e3e3;
    color: #1f8255;
}

.cell.color-3 {
    background-color: #e3e3e3;
    color: #fe0000;
}

.cell.color-4 {
    background-color: #e3e3e3;
    color: #010180;
}

.cell.color-5 {
    background-color: #e3e3e3;
    color: #7f0203;
}

.cell.color-6 {
    background-color: #e3e3e3;
    color: #027f80;
}

.cell.color-7 {
    background-color: #e3e3e3;
    color: #42b983;
}

.cell.color-8 {
    background-color: #e3e3e3;
    color: black;
}
</style>