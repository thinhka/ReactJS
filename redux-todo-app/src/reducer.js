import { List, Map } from 'immutable';

const init = List([]);

export default function reducer(todos=init, action) {
  switch(action.type) {
    case 'ADD_TODO':
        return todos.push(Map(action.payload));
      case 'DELETE_TODO':
          return todos.filter(item => item.get('id') !== action.payload)
              //return todos.map(t => {  
              //    if(t.get('id') === action.payload) {
              //        return todos.slice(0, t);
              //    } else {
              //        return t;
              //    }
              //});
      case 'TOGGLE_TODO':
        return todos.map(t => {  
        if(t.get('id') === action.payload) {
            return t.update('isDone', isDone => !isDone);
        } else {
          return t;
        }
      });
    default:
      return todos;
  }
}

