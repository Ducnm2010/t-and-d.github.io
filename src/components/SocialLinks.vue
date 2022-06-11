<template>
    <div class="social-links">
        <a href="#" class="social-links__icon twitter"></a>
        <a href="#" class="social-links__icon facebook"></a>
        <a href="#" class="social-links__icon tiktok"></a>
        <a href="#" class="social-links__icon instagram"></a>
    </div>
</template>

<style scoped lang="scss">
.social-links {
    display: flex;
    align-items: center;
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
            mask-image: url('../assets/social/icon-twitter.svg');
            -webkit-mask-image: url('../assets/social/icon-twitter.svg');

            &:hover {
                background-color: #1d9bf0;
            }
        }

        &.facebook {
            mask-image: url('../assets/social/icon-facebook.svg');
            -webkit-mask-image: url('../assets/social/icon-facebook.svg');

            &:hover {
                background-color: #1877f2;
            }
        }

        &.tiktok {
            mask-image: url('../assets/social/icon-tiktok.svg');
            -webkit-mask-image: url('../assets/social/icon-tiktok.svg');

            &:hover {
                background-color: #220c1c;
            }
        }

        &.instagram {
            mask-image: url('../assets/social/icon-instagram.svg');
            -webkit-mask-image: url('../assets/social/icon-instagram.svg');

            &:hover {
                background-color: #755bc4;
            }
        }
    }
}
</style>