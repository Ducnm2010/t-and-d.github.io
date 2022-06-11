<template>
    <div class="footer">
        <div class="container" style="margin-top: 50px; margin-bottom: 50px;">
            <a-row>
                <a-col :span="12">
                    <div class="contact-us">
                        <a-typography-title :level="2" class="contact-us__text">Let's Talk About Your Project
                        </a-typography-title>
                        <a-button type="primary" class="contact-us__button"
                            style="padding-left: 36.5px; padding-right: 36.5px;">Contact us</a-button>
                    </div>
                </a-col>
                <a-col :span="12">
                    <div class="col-wrap">
                        <social-links></social-links>
                        <copyright style="margin-top: 1rem;"></copyright>
                    </div>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script setup>
import SocialLinks from '../../components/SocialLinks.vue';
import Copyright from '../../components/Copyright.vue';
</script>

<style scoped lang="scss">
.footer {
    .col-wrap {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
    }

    .contact-us {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .contact-us__text {
            max-width: 300px;
            margin-bottom: 24px;
        }
    }
}
</style>