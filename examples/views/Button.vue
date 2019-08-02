<template>
  <div>
    <div>
      <bem-button @click="handleClick">默认按钮</bem-button>
      <bem-button @click="handleClick" type="success">success</bem-button>
      <bem-button @click="handleClick" type="info">info</bem-button>
      <bem-button @click="handleClick" type="warning">warning</bem-button>
      <bem-button @click="handleClick" type="danger">danger</bem-button>
    </div>
    <div>
      <bem-button @click="handleClick" round>圆角</bem-button>
      <bem-button @click="handleClick" type="success" round>success</bem-button>
      <bem-button @click="handleClick" type="info" round>info</bem-button>
      <bem-button @click="handleClick" type="warning" round>warning</bem-button>
      <bem-button @click="handleClick" type="danger" round>danger</bem-button>
    </div>
    <div style="background: #2C8DF0; padding: 0.3rem 0.1rem;border-radius:0.1rem;">
      <bem-button @click="handleClick" type="success" round transparent>透明</bem-button>
      <bem-button @click="handleClick" type="success" round transparent>success</bem-button>
      <bem-button @click="handleClick" type="info" round transparent>info</bem-button>
      <bem-button @click="handleClick" type="warning" round transparent>warning</bem-button>
      <bem-button @click="handleClick" type="danger" round transparent>danger</bem-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(e) {
      console.log(e);
    }
  }
};
</script>

<style scoped>
div + div {
  margin-top: 0.3rem;
}
</style>
