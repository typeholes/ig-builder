<script setup lang="ts">
  import { gameState, NVarName, NFuncName } from 'src/ts/game';
import { computed } from 'vue';

  const props = defineProps<{
    item: NVarName;
    byVar?: NVarName;
    byFunc?: NFuncName;
  }>();

  const incBy = computed(() => {
    if (props.byVar) {
      return gameState.nVar[props.byVar];
    } else if (props.byFunc) {
      return gameState.nFunc[props.byFunc];
    } else {
      return 1;
    }
  });

  function increment() {
    gameState.nVar[props.item] += incBy.value;
  }
</script>

<template>
  <q-card v-if="gameState.ready">
    <q-card-section>
      <q-item>
        <q-item-section>
          <q-item-label>{{ props.item }}</q-item-label>
          <q-item-label>{{ gameState.nVar[props.item] }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-btn
            dense
            round
            glossy
            icon="add"
            :label="incBy"
            :color="incBy > 0 ? 'positive' : 'negative'"
            @click="increment"
          />
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>

