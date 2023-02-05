<script setup lang="ts">
import IncrementBtn from 'src/components/IncrementBtn.vue';

</script>

<template>
  <div>
    <IncrementBtn item="a" />
    <IncrementBtn item="a" by-func="s" />
    <IncrementBtn item="a" by-var="z" />
  </div>
</template>
