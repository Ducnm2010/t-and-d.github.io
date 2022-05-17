<template>
  <div class="page home">
    <section class="introducing">
      <div class="container">
        <a-row>
          <a-col
            :span="20"
            :offset="2"
          >
            <a-row
              :gutter="10"
              class="custom"
            >
              <a-col :span="24">
                <div class="title">
                  <a-typography-title>About us</a-typography-title>
                </div>
                <div class="content">
                  <a-typography-paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, non.
                  </a-typography-paragraph>
                  <a-typography>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda eius ab nostrum libero pariatur
                    at
                    necessitatibus tempore veniam! Nemo, voluptatem tenetur. Aut molestiae blanditiis dolores maxime
                    repellat
                    temporibus quibusdam fuga?
                  </a-typography>
                  <div class="space"></div>
                  <a-row
                    type="flex"
                    justify="start"
                  >
                    <a-button
                      v-wave
                      class="drop-shadow"
                      size="large"
                      style="margin-right: 10px;"
                      @click="connectToWallet"
                    >
                      Connect to your wallet
                    </a-button>
                    <a-button
                      v-wave
                      class="drop-shadow"
                      type="primary"
                      size="large"
                      @click="$router.push('/bidding')"
                    >
                      Go bidding
                    </a-button>
                  </a-row>
                </div>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useContracts } from '../store/useContracts'

const contractStore = useContracts()

const connectToWallet = async () => {
  await contractStore.connectWallet()
}
</script>

<style scoped lang="scss">
.page.home {

  section.introducing {
    background-image: url(/src/assets/urban.webp), linear-gradient(320deg, rgba(0, 0, 0, .5) 10%, rgba(255, 255, 255, 1) 50%);
    background-blend-mode: overlay;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    min-height: 500px;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container {
    max-width: 1200px;
    margin: -100px auto 0;
  }


  .space {
    height: 2rem;
  }

  .title {
    margin-top: 100px;

    h1 {
      font-size: 3.2rem;
    }
  }

  .illustration {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .image {
      max-width: 100%;
      max-height: 70vh;
      object-fit: cover;
    }
  }
}
</style>