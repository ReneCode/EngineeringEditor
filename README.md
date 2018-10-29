# EngineeringEditor

started on CodeSandbox

Layout inspired by CodeSandbox ;-)

https://github.com/typicode/json-server

## redux-saga

### call

// when using call, the arguments has to be separated
const result = yield call(getPointSaga, actionTypes.MOUSE_DOWN);

const result = yield (getPointSaga(actionTypes.MOUSE_DOWN));
