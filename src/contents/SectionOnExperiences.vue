<template>
    <section class="on-experiences">
        <div class="container">
            <a-row :gutter="100">
                <a-col :span="11">
                    <a-typography-title :level="2" style="max-width: 460px; margin-bottom: 24px">
                        5 years of experience in bidding
                    </a-typography-title>
                    <a-typography-paragraph style="max-width: 460px; margin-bottom: 24px">
                        sit amet consectetur adipisicing elit. Assumenda eius ab nostrum libero pariatur at
                        necessitatibus tempore veniam! Nemo, voluptatem tenetur.
                    </a-typography-paragraph>
                    <img class="illustration" src="../assets/image-4.jpg" alt="">
                </a-col>
                <a-col :span="13">
                    <a-row :gutter="40">
                        <a-col :span="12">
                            <card-info :icon-path="iconDollar" title="50.000+ Bidding"
                                content="Assumenda eius ab nostrum libero pariatur at necessitatibus tempore"
                                style="margin-bottom: 40px" />
                            <card-info :icon-path="iconPicture" title="500.000+ photos"
                                content="Assumenda eius ab nostrum libero pariatur at necessitatibus tempore" />
                        </a-col>
                        <a-col :span="12">
                            <card-info :icon-path="iconPeople" title="100.000+ Users"
                                content="Assumenda eius ab nostrum libero pariatur at necessitatibus tempore"
                                style="margin-bottom: 40px" />
                            <card-info :icon-path="iconUser" title="10.000+ Artists"
                                content="Assumenda eius ab nostrum libero pariatur at necessitatibus tempore" />
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
        </div>
    </section>

</template>

<script setup>
import iconDollar from '../assets/icons/dollar-square.svg'
import iconPicture from '../assets/icons/picture-frame.svg'
import iconPeople from '../assets/icons/people.svg'
import iconUser from '../assets/icons/user-edit.svg'
import CardInfo from './SectionOnExperiences/CardInfo.vue'
</script>

<style scoped>
</style>