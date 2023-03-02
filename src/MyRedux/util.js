export function isPlan(obj){
   if(typeof(obj) === 'object' && obj.__proto__ === Object.prototype){
    return true;
   }
   return false;
}

export const INIT_ACTION = '@redux/init.g.l.c';
export const INIT_RANDOM_ACTION = '@redux/redux.random.g.l.c';