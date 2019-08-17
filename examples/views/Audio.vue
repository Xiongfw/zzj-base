<template>
  <div>
    <bem-button @click="playAudio('001')">音频001</bem-button>
    <bem-button @click="playAudio('002')">音频002</bem-button>
    <bem-button @click="playAudio('003')">音频003</bem-button>
    <bem-button @click="playAudio('004')">音频004</bem-button>
    <bem-button @click="playAudio('005')">音频005</bem-button>
    <bem-button @click="playAudio('006')">音频006</bem-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  beforeDestroy() {
    this.$bem.audio.pause();
  },
  methods: {
    playAudio(filename) {
      this.$bem.audio.play(filename);
    }
  }
};
</script>