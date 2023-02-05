import { parse, MathNode, parser as mathParser,  } from 'mathjs';
import { reactive } from 'vue';
import { gameItems } from '../DoNotTouch';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fs: any;
  }
}

const parser = mathParser();
parser.set('time', 0);

export type NVarName = keyof typeof gameItems.items.nVar;
export type BVarName = keyof typeof gameItems.items.bVar;
export type NFuncName = keyof typeof gameItems.items.nFunc;
type BFuncName = keyof typeof gameItems.items.bFunc;
export type GameItems = typeof gameItems.items;
export type GameItemTypes = keyof GameItems;
export const GameItemTypes = Object.keys(gameItems.items) as [GameItemTypes];

type GameMath = {
  [key in GameItemTypes]: { [type in keyof GameItems[key]]: MathNode | undefined }
}


type State = {
  nVar: {[key in NVarName]: number },
  bVar: {[key in BVarName]: boolean },
  nFunc: { [key in NFuncName]: number },
  bFunc: { [key in BFuncName]: boolean },
  ready: boolean
};

const nodes = {} as GameMath;

function initState() {
  const state = gameState as Record<GameItemTypes, Record<string, number | boolean>> & { ready: boolean };
  for (const type of GameItemTypes) {
    for (const name of gameItems.names[type]) {
      //@ts-expect-error nested indexing
      const expr = gameItems.items[type][name] as string;
        state[type]??={};
        nodes[type]??={} as never;
      try {
          //@ts-expect-error nested indexing
          nodes[type][name] = parse(expr);
          state[type][name] = parser.evaluate(expr);
      } catch {
        state[type][name] =  name.startsWith('b') ? false: 0;
      }
    }
  }
  state.ready = true;
}

function refreshState() {
  if (!nodes) { return }
  const state = gameState as Record<GameItemTypes, Record<string, number | boolean>>;
  for (const type of GameItemTypes) {
    for (const name of gameItems.names[type]) {
      //@ts-expect-error nested indexing
      const node = nodes[type][name];
      if (node) {
        try {
        state[type][name] = parser.evaluate(node.toString());
        } catch {}
      }
    }
  }
}

export const gameState = reactive({} as State);
initState();


const tickTime = 100;
let time = 0;
let lastTickTime = 0;
function gameLoop(timeStamp: number) {
  // Calculate the number of seconds passed since the last frame
  const ticks = Math.floor((timeStamp - lastTickTime) / tickTime);
  lastTickTime = lastTickTime + ticks * tickTime;
  time += ticks/10;

  parser.set('time', time);

  refreshState();

  // Request another animation frame
  window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
