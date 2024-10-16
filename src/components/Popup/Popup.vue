<template>
    <div class="popup">
        <slot class="popup_inner"></slot>
    </div>
</template>

<script>
export default {
    name: 'Popup',
}
</script>

<style lang="scss" scoped>
.popup {
  min-width: 100px;
  border-radius: 5px;
  background-color: white;
  padding: 10px 15px;
  -webkit-box-shadow: 0px 0px 8px 5px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 0px 8px 5px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 0px 8px 5px rgba(34, 60, 80, 0.2);
  z-index: 999;
  text-align: left;
}

</style>