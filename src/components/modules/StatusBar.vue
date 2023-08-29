<template>
    <div class="status-bar">
        <div class="counters">
            <div class="counter">1</div>
            <div class="counter">2</div>
        </div>
        <div id="start-btn" @click="$emit('init')">START</div>
        <router-link to="/Game">設定</router-link>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        width: Number,
        height: Number,
        mine: Number,
    }
})

export default class StatusBar extends Vue {
    width!: number;
    height!: number;
    mine!: number;
}
</script>

<style scoped>
.status-bar {
    display: flex;
    justify-content: space-between;
    width: 400px;
    margin: 0 auto;
}

.counters{
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
</style>