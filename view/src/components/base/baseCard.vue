<template>
  <div class="card" :class="cardClass">
    <header v-if="title" class="card-header">{{ title }}</header>
    <div class="card-content">
      <slot />
    </div>
  </div>
</template>
<style scoped>
.card {
  border: 1px solid #e0e0e0;
  padding: 16px;
  border-radius: 8px;
  background-color: #fff;
  margin: 1rem;
}
.card-header {
  font-weight: bold;
  font-size: 24px;
}
</style>
<script>
export default {
  name: "baseCardComponent",
  props: {
    title: {
      type: String,
      default: "",
    },
    cardClass: {
      type: String,
      default: "",
    },
  },
};
</script>
