<template>
    <section class="workflow">
        <div class="container">
            <a-typography-title :level="2" style="text-align: center;">How we work?</a-typography-title>
            <div class="workflow-graph">
                <div class="graph">
                    <img src="../assets/ellipse-1.svg" alt="graph-1">

                    <card-flow v-for="(card, index) in listCards" :key="index" :img-src="card.imgSrc"
                        :title="card.title" :content="card.content" :position-props="card.positionProps" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import SearchIcon from '../assets/icons/search-normal.svg'
import DollarIcon from '../assets/icons/dollar-square.svg'
import VerifyIcon from '../assets/icons/verify.svg'
import CardFlow from './SectionWorkflow/CardFlow.vue';

const listCards = [
    {
        imgSrc: SearchIcon,
        title: 'Lookings For Photos',
        content: 'Assumenda eius ab nostrum libero pariatur at necessitatibus tempore eius',
        positionProps: 'left: 0; top: 131px; transform: translateX(-50%);'
    },
    {
        imgSrc: DollarIcon,
        title: 'Bidding Photos',
        content: 'Assumenda eius ab nostrum libero pariatur at necessitatibus tempore eius',
        positionProps: 'right: 0; top: 131px; transform: translateX(50%);'
    },
    {
        imgSrc: VerifyIcon,
        title: 'Successful Bidding',
        content: 'Assumenda eius ab nostrum libero pariatur at necessitatibus tempore eius',
        positionProps: 'left: 50%; bottom: 0; transform: translate(-50%, 50%)'
    }
]
</script>

<style scoped lang="scss">
.workflow-graph {
    text-align: center;
    margin-top: 70px;
    margin-bottom: 200px;

    .graph {
        position: relative;
        width: fit-content;
        margin: auto;
    }
}
</style>