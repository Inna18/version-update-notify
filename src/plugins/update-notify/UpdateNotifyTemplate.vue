<template>
  <div class="notification-backdrop" v-if="showNotify===true">
    <div class="update-notification">
      <p class="notification-text">
        <slot name="content" />
      </p>
      <button class="notification-btn" @click="reload">
        <slot name="reload-btn" />
      </button>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import emitter from "@/plugins/emitter";

const props = defineProps({
  width: {
    type: String, Object,
    required: false
  },
  length: {
    type: String, Object,
    required: false
  },
  color: {
    type: String, Object,
    required: false
  },
  background: {
    type: String, Object,
    required: false
  },
  btnColor: {
    type: String, Object,
    required: false
  },
  contentFontSize: {
    type: String, Object,
    required: false
  },
  btnFontSize: {
    type: String, Object,
    required: false
  }
});

// 기본값
const _width = ref("440px");
const _length = ref("64px");
const _color = ref("#fff");
const _background = ref("rgba(76, 144, 239, 0.8)");
const _btnColor = ref("#4c90ef");
const _contentFontSize = ref("12px");
const _btnFontSize = ref("13px");

const showNotify = ref(false);

onMounted(() => {
  _width.value = props.width ? props.width : _width.value;
  _length.value = props.length ? props.length : _length.value;
  _color.value = props.color ? props.color : _color.value;
  _background.value = props.background ? props.background : _background.value;
  _btnColor.value = props.btnColor ? props.btnColor : _btnColor.value;
  _contentFontSize.value = props.contentFontSize ? props.contentFontSize : _contentFontSize.value;
  _btnFontSize.value = props.btnFontSize ? props.btnFontSize : _btnFontSize.value;
})

const reload = () => {
  showNotify.value = false;
  window.location.reload();
}

emitter.on("emitNewVersion", () => { showNotify.value = true; });
</script>

<style scoped>
.notification-backdrop {
    top: 0;
    position: fixed;
    width: 100%;
    height: 100%;
}
.update-notification {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: v-bind(_width);
    height: v-bind(_height);
    margin: 30px auto;
    padding: 13px 12px;
    z-index: 99999;
    border-radius: 8px;
    background-color: v-bind(_background);
}
.notification-text {
    font-size: v-bind(_contentFontSize);
    font-weight: 500;
    color: v-bind(_color);
}
.notification-btn {
    width: 80px;
    height: 38px;
    border-radius: 4px;
    border-color: v-bind(_btnColor);
    background-color: v-bind(_btnColor);
    font-size: v-bind(_btnFontSize);
    color: v-bind(_color);
}
</style>