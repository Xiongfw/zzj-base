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
      <bem-button @click="handleClick" round>round</bem-button>
      <bem-button @click="handleClick" type="success" round>success</bem-button>
      <bem-button @click="handleClick" type="info" round>info</bem-button>
      <bem-button @click="handleClick" type="warning" round>warning</bem-button>
      <bem-button @click="handleClick" type="danger" round>danger</bem-button>
    </div>
    <div>
      <bem-button @click="handleClick" transparent plain>plain</bem-button>
      <bem-button @click="handleClick" type="success" transparent plain>success</bem-button>
      <bem-button @click="handleClick" type="info" transparent plain>info</bem-button>
      <bem-button @click="handleClick" type="warning" transparent plain>warning</bem-button>
      <bem-button @click="handleClick" type="danger" transparent plain>danger</bem-button>
    </div>
    <div style="background: #2C8DF0; padding: 0.3rem 0.1rem;border-radius:0.1rem;">
      <bem-button @click="handleClick" type="transparent" round>transparent</bem-button>
      <bem-button @click="handleClick" type="transparent" round>success</bem-button>
      <bem-button @click="handleClick" type="transparent" round>info</bem-button>
      <bem-button @click="handleClick" type="transparent" round>warning</bem-button>
      <bem-button @click="handleClick" type="transparent" round>danger</bem-button>
    </div>
    <div>
      <bem-button @click="handleClick" plain round>背景透明</bem-button>
      <bem-button @click="handleClick" plain round>success</bem-button>
      <bem-button @click="handleClick" plain round>info</bem-button>
      <bem-button @click="handleClick" plain round>warning</bem-button>
      <bem-button @click="handleClick" plain round>danger</bem-button>
    </div>
    <div>
      <bem-button @click="handleClick" size="large">大按钮</bem-button>
      <bem-button @click="handleClick">默认大小</bem-button>
      <bem-button @click="handleClick" size="small">小按钮</bem-button>
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
