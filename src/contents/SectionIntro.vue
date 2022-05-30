<template>
  <section class="introducing">
    <div class="container">
      <a-row :gutter="80">
        <a-col :span="12">
          <div style="height: 100%; display: flex; flex-direction: column; justify-content: center">
            <a-typography-title :level="2" style="max-width: 277px; margin-bottom: 24px">Let's bidding your photography
            </a-typography-title>
            <a-typography-paragraph style="max-width: 460px; margin-bottom: 24px;">
              sit amet consectetur adipisicing elit. Assumenda eius ab nostrum libero pariatur at necessitatibus tempore
              veniam! Nemo, voluptatem tenetur. Aut molestiae blanditiis dolores maxime repellat temporibus quibusdam
              fuga?
            </a-typography-paragraph>
            <a-row type="flex" :gutter="16">
              <a-col>
                <a-button style="padding-left: 52.5px; padding-right: 52.5px" @click="connectToWallet">
                  Connect to your
                  wallet
                </a-button>
              </a-col>
              <a-col>
                <a-button type="primary" style="padding-right: 37.5px; padding-left: 37.5px;" @click="$router.push('/bidding')">Go bidding</a-button>
              </a-col>
            </a-row>
          </div>
        </a-col>
        <a-col :span="12">
          <a-row :gutter="30" type="flex">
            <a-col :span="12">
              <img class="illustration" src="../assets/image-1.jpg" alt="image-1" style="margin-bottom: 40px">
              <img class="illustration" src="../assets/image-3.jpg" alt="image-3">
            </a-col>
            <a-col :span="12">
              <div style="height: 100%; display: flex; align-items: flex-end">
                <img class="illustration" src="../assets/image-2.jpg" alt="image-2" style="margin-top: auto">
              </div>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
  </section>
</template>

<script setup>
import { useContracts } from '../store/useContracts'

const contractStore = useContracts()

const connectToWallet = async () => {
  await contractStore.connectWallet()
}
</script>

<style scoped lang="scss">
section.introducing {
  min-height: 700px;
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
  border-radius: 12px;
  max-width: 100%;
}
</style>