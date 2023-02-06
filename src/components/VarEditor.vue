<script setup lang="ts">
import { gameItems } from 'src/DoNotTouch';
import { ref } from 'vue';
import { GameItemTypes, }  from 'src/ts/game';
import { parse, ConstantNode, isNumber, isOperatorNode, } from 'mathjs';

const fs = window.fs;

const filePath = ref('c:\\users\\hw\\projects\\quasar\\ig-builder\\src\\DoNotTouch.ts');

const newName = ref('');
const newExpr = ref('');
const error = ref('');

const IsDev = (process.env.DEV as unknown as boolean) && process.env.MODE === 'electron';

function addVar() {
  try {
    error.value = '';
    const node = parse(newExpr.value);
    if (node instanceof ConstantNode) {
      const value = node.value;
      if (isNumber(value)) {
        mkCode('nVar');
      } else if (typeof value === 'boolean')  {
        mkCode('bVar');
      } else {
        throw new Error('Invalid type for ${expr}');
      }
    } else if  (isOperatorNode(node)) {

     if( node.op in ['>', '<', '>=', '<=', '==', '!=', '&&', '||']) {
      mkCode('bFunc');
    } else {
      mkCode('nFunc');
    }} else {
      throw new Error('Invalid expression ${expr}');
    }

  } catch (e) {
    error.value = `${e}`;
    return;
  }
}

  function mkCode(type: GameItemTypes) {

    let code = `
const nVar = {
  ${Object.keys(gameItems.items.nVar).map(key => `${key}: ${gameItems.items.nVar[key as never]}`).join(',')}
  ${ type === 'nVar' ? `,${newName.value}: ${newExpr.value}` : ''}
};


const  bVar = {
  ${Object.keys(gameItems.items.bVar).map(key => `${key}: ${gameItems.items.bVar[key as never]}`).join(',')}
  ${ type === 'bVar' ? `,${newName.value}: ${newExpr.value}` : ''}
};

const nFunc = {
  ${Object.keys(gameItems.items.nFunc).map(key => `${key}: '${gameItems.items.nFunc[key as never]}'`).join(',')}
  ${ type === 'nFunc' ? `,${newName.value}: '${newExpr.value}'` : ''}
};

const bFunc = {
  ${Object.keys(gameItems.items.bFunc).map(key => `${key}: '${gameItems.items.bFunc[key as never]}'`).join(',')}
  ${ type === 'bFunc' ? `,${newName.value}: '${newExpr.value}'` : ''}
};

export const gameItems = {
  items: { nVar, bVar, nFunc, bFunc},
  names: {
    nVar: Object.keys(nVar) as [(keyof typeof nVar)],
    bVar: Object.keys(bVar) as [(keyof typeof bVar)],
    nFunc: Object.keys(nFunc) as [(keyof typeof nFunc)],
    bFunc: Object.keys(bFunc) as [(keyof typeof bFunc)],
  },
}
`;

  fs.writeFileSync( filePath.value, code);
}
</script>

<template>
  <div v-if="IsDev">
    <q-input v-model="filePath" />
    <q-input v-model="newName" />
    <q-input v-model="newExpr" />
    <q-btn @click="addVar">Add</q-btn>
    <q-list>
    <template v-for="obj,type in gameItems.items" :key="type">
      {{ type  }}
      <q-item v-for="expr,name in obj" :key="name">
        <q-item-section>{{ name }}</q-item-section>
        <q-item-section>
          {{expr}}
        </q-item-section>
      </q-item>
    </template>
    </q-list>
  </div>
</template>
