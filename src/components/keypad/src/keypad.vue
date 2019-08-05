<template>
  <div class="bem-keypad" ref="main" v-if="showKeyPad" @click.stop="_handleKeyPress">
    <div class="key-box" id="theBox">
      <div v-if="isWinCode" class="key-row">
        <div class="key-cell long-row" data-num="W" :class="{'key-active':act_num=='W'}">
          <span>W</span>
        </div>
        <div class="key-cell long-row" data-num="A" :class="{'key-active':act_num=='A'}">
          <span>A</span>
        </div>
      </div>
      <div class="key-row top-row" :style="{'margin-top': theMarginTop}">
        <div class="key-cell top-cell" data-num="1" :class="{'key-active':act_num=='1'}">
          <span data-num="1">1</span>
        </div>
        <div class="key-cell" data-num="2" :class="{'key-active':act_num=='2'}">
          <span data-num="2">2</span>
        </div>
        <div class="key-cell" data-num="3" :class="{'key-active':act_num=='3'}">
          <span data-num="3">3</span>
        </div>
      </div>
      <div class="key-row" :style="{'margin-top': theMarginTop}">
        <div class="key-cell top-cell" data-num="4" :class="{'key-active':act_num=='4'}">
          <span data-num="4">4</span>
        </div>
        <div class="key-cell" data-num="5" :class="{'key-active':act_num=='5'}">
          <span data-num="5">5</span>
        </div>
        <div class="key-cell" data-num="6" :class="{'key-active':act_num=='6'}">
          <span data-num="6">6</span>
        </div>
      </div>
      <div class="key-row" :style="{'margin-top': theMarginTop}">
        <div class="key-cell top-cell" data-num="7" :class="{'key-active':act_num=='7'}">
          <span data-num="7">7</span>
        </div>
        <div class="key-cell" data-num="8" :class="{'key-active':act_num=='8'}">
          <span data-num="8">8</span>
        </div>
        <div class="key-cell" data-num="9" :class="{'key-active':act_num=='9'}">
          <span data-num="9">9</span>
        </div>
      </div>
      <div class="key-row" :style="{'margin-top': theMarginTop}">
        <div class="key-cell top-cell" data-num="0" :class="{'key-active':act_num=='0'}">
          <span data-num="0">0</span>
        </div>
        <div class="key-cell" data-num="D">
          <span data-num="D">退格</span>
        </div>
        <div v-show="isClear" class="key-cell" data-num="C">
          <span data-num="C">清空</span>
        </div>
        <div v-show="!isClear" class="key-cell" data-num="Y">
          <span data-num="Y">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
	name: 'BemKeypad',
  props: {
    isClear: {
      type: Boolean,
      default: false
    },

    showKeyPad: {
      type: Boolean,
      default: false
    },
    setContent: {
      type: String,
      default: ""
    },
    isWinCode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      content: "",
      act_num: null, //焦点按钮
      haveUp: null, //键盘在上方时
      theMarginTop: null //按键行的marginTop，让按键的高度自适应
    };
  },
  computed: {},
  watch: {
    showKeyPad: {
      immediate: true,
      handler(n) {
        if (!n) {
          this.act_num = null;
        } else {
          this.$nextTick(() => {
            this.theMarginTop = document.querySelector("#theBox").offsetHeight * 0.05 + "px";
          })
        }
      }
    },
    setContent(n) {
      this.content = this.setContent;
    }
  },
  methods: {
    _handleKeyPress(e) {
      let num = e.target.dataset.num;
      switch (String(num)) {
        //删除键
        case "D":
          this._handleDeleteKey(num);
          break;
        //清空键
        case "C":
          this._handleClearKey();
          break;
        case "Y":
          this._handleConfirmKey();
          break;
        default:
          this._handleNumberKey(num);
          break;
      }
    },
    //处理删除键
    _handleDeleteKey(num) {
      this.act_num = null;
      let S = this.content;
      //否则删除最后一个
      this.content = S.substring(0, S.length - 1);
      this.$emit("changeNum", this.content, num);
    },
    //处理清空键
    _handleClearKey(num) {
      this.act_num = null;
      this.content = "";
      this.$emit("changeNum", this.content, num);
    },
    //处理确定键
    _handleConfirmKey() {
      this.$emit("changeNum", "close");
    },
    //处理数字
    _handleNumberKey(num) {
      this.act_num = num;
      let S = this.content;
      if (typeof num != "undefined") {
        this.content = S + num;
      }
      this.$emit("changeNum", this.content, num);
    }
  }
};
</script>