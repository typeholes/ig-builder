
const nVar = {
  a: 1,z: 6
  ,a2: 3
};


const  bVar = {
  b: false
  
};

const nFunc = {
  t: 'time',s: 'sin(time)',c: 'cos(t)',l: 'log(t)'
  
};

const bFunc = {
  sgc: 's>c'
  
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
