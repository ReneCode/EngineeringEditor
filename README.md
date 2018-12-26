[![Build Status](https://travis-ci.org/ReneCode/EngineeringEditor.svg?branch=master)](https://travis-ci.org/ReneCode/EngineeringEditor)

# EngineeringEditor

started on CodeSandbox

Layout inspired by CodeSandbox ;-)

## backend for the first days

https://github.com/typicode/json-server

##svg icons
http://svgicons.sparkk.fr/

## javascript hints

### check if property exists

```
  if ( "myprop" in obj) {
        //  obj.myprop  exists
  }
```

## redux-saga

## react ref on connected components

https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26871

    ref = { comp => this.myCompRef = (comp as any).getWrappedInstance() }

### call

when using call, the arguments has to be separated

```
const result = yield call(getPointSaga, actionTypes.MOUSE_DOWN);

const result = yield getPointSaga(actionTypes.MOUSE_DOWN);
```

## hints

### environment in react

use .env (dotenv),
start environment varialbe with `REACT_APP_`

https://medium.com/@tacomanator/environments-with-create-react-app-7b645312c09d

### deploy with travis / azure

http://sviridovserg.com/2017/05/16/cd-with-travis-and-azure/

### typescript

https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter

### toJSON / fromJSON

http://choly.ca/post/typescript-json/
