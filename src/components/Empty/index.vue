<template>
  <div class="empty">
    <JwChaticon type="icon-empty" :style="sizeStyle" />
  </div>
</template>

<script>
    import JwChaticon from '@/components/Icon/index';
export default {
  name: 'JwChat-empty',
    components: {
        JwChaticon,
    },
  props: {
    size: {
      default: '5rem',
    }
  },
  computed: {
    sizeStyle () {
      let size = this.size
      if (`${size}`.match(/\d$/)) {
        size += 'px'
      }
      return {
        fontSize: size,
      }
    }
  },
}
</script>
<style scoped>
.empty {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
}
</style>