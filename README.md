# EngineeringEditor

started on CodeSandbox

Layout inspired by CodeSandbox ;-)

https://github.com/typicode/json-server

## redux-saga

### call

// when using call, the arguments has to be separated
const result = yield call(getPointSaga, actionTypes.MOUSE_DOWN);

const result = yield (getPointSaga(actionTypes.MOUSE_DOWN));

### environment in react

use .env

start environment varialbe with `REACT_APP_`

https://medium.com/@tacomanator/environments-with-create-react-app-7b645312c09d
