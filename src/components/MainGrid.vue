<script setup lang="ts">
import VarEditor from './VarEditor.vue';
import GamePane from './GamePane.vue';
</script>

<template>
  <q-card class="fit">
    <var-editor />
  </q-card>
  <q-card>
    <game-pane />
  </q-card>

</template>
