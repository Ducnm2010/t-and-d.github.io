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
                        <div class="social-links">
                            <a href="#" class="social-links__icon twitter"></a>
                            <a href="#" class="social-links__icon facebook"></a>
                            <a href="#" class="social-links__icon tiktok"></a>
                            <a href="#" class="social-links__icon instagram"></a>
                        </div>
                        <div class="copyright">
                            © Copyright by T&D
                        </div>
                    </div>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script setup></script>

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

    .social-links {
        text-align: right;

        .social-links__icon {
            display: inline-block;
            width: 24px;
            height: 24px;
            margin-right: 14px;
            mask-size: contain;
            -webkit-mask-size: contain;
            mask-position: center;
            -webkit-mask-position: center;
            mask-repeat: no-repeat;
            -webkit-mask-repeat: no-repeat;
            background-color: #757575;
            transition: 300ms ease;

            &:last-child {
                margin-right: 0;
            }

            &.twitter {
                mask-image: url('../../assets/social/icon-twitter.svg');
                -webkit-mask-image: url('../../assets/social/icon-twitter.svg');

                &:hover {
                    background-color: #1d9bf0;
                }
            }

            &.facebook {
                mask-image: url('../../assets/social/icon-facebook.svg');
                -webkit-mask-image: url('../../assets/social/icon-facebook.svg');

                &:hover {
                    background-color: #1877f2;
                }
            }

            &.tiktok {
                mask-image: url('../../assets/social/icon-tiktok.svg');
                -webkit-mask-image: url('../../assets/social/icon-tiktok.svg');

                &:hover {
                    background-color: #220c1c;
                }
            }

            &.instagram {
                mask-image: url('../../assets/social/icon-instagram.svg');
                -webkit-mask-image: url('../../assets/social/icon-instagram.svg');

                &:hover {
                    background-color: #755bc4;
                }
            }
        }
    }

    .copyright {
        margin-top: 1rem;
        text-align: right;
        color: var(--text-secondary);
    }
}
</style>