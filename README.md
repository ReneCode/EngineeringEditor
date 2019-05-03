[![Build Status](https://travis-ci.org/ReneCode/EngineeringEditor.svg?branch=master)](https://travis-ci.org/ReneCode/EngineeringEditor)

# EngineeringEditor

started on CodeSandbox

Layout inspired by CodeSandbox ;-)

## backend for the first days

https://github.com/typicode/json-server

##svg icons
http://svgicons.sparkk.fr/
http://www.zondicons.com/icons.html
http://www.steveschoger.com/2018/01/04/introducing-heroicons-ui/

# show svg as react-component

https://facebook.github.io/create-react-app/docs/adding-images-fonts-and-files

## javascript hints

https://itnext.io/advanced-react-redux-techniques-how-to-use-refs-on-connected-components-e27b55c06e34

### check if property exists

```
  if ( "myprop" in obj) {
        //  obj.myprop  exists
  }
```

## react ref on connected components

https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26871

    ref = { comp => this.myCompRef = (comp as any).getWrappedInstance() }

## redux-saga

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

## coding rules

UPDATE*... Actions => payload is the new object that will exchange the old object with the same .id.
So before dispatch(UPDATE*...Action ) a new object has to be created by `deepClone(currentObject)`

# other stuff

keyboard commands of whimsical.co
https://help.whimsical.co/faqs/keyboard-shortcuts

# Jest & PaperJs

yarn add -D jest-canvas-mock

in the jest setup file:

`import "jest-canvas-mock"`

# install

create ''.env'' file:

REACT_APP_GRAPHQL_SERVER=http://localhost:8080
