# ISSUES

- group / undo: items no more seen
- group / ungroup: items no more seen

- group > group > colored placement. on hover colored placement not not correct redrawn after hover leave

  use ghooks / pre-commit => npm run test / https://www.npmjs.com/package/ghooks

## TODO

- icons / https://vectr.com/

- ungroup with more than one placement
- set Cursor to GraphicText on Edit based on the mouse-click-position

* use draft.js for text-editing (https://draftjs.org/)
* PaperUtil.getHitTest refactor (return all hitItemType / grip, item, temp)
* change IacHoverItem to drawHover/removeHover (for each ItemName)
* SelectedPlacementToobar as ModalToolbar (as SelectSymbolModal)
* statusbar as flowing debug-output
* Logic Item (SymbolRef + Data)
* grid / rasterize mouse position
* preview on selectSymbol
* DrawToolbar - show selected Tool ( x to go in idle-mode)
* hover item - color from/to the individual item

- typescript for actions / https://redux.js.org/recipes/usage-with-typescript

* handles of the resizeBox has fixed size - independent on zoom.
* resize without keepRatio on Rectangle

- resize of that box resizes the items inside
- with SHIFT the with-height ratio is fixed on resizing the box
  (- with ctrl the center of the resize-box will be fixed)

- no separate interactions.
  handleMouse... on the component where it starts.
- undo -> dispatch(setSelection) with last changed item

* Undo / Redo: after Undo/Redo select the "undo-ed" items
  remove the current selection

* Undo => changes the items in the state => no more subscription on redux-store.
  update the view on the changed placements. (do not use redux-store)

- box the pop-menu into visible area
- cmd-C cmd-V copy paste

* select id after creating Line/Arc

- panning

```
http://bencentra.com/code/2014/12/05/html5-canvas-touch-events.html

// pan-movement
var toolPan = new Tool();
toolPan.onMouseDrag = function(event) {
    var offset = event.downPoint - event.point;
    view.center += offset;
};

```

- move also popup-menu

- disable redux-dev-tools in production / https://medium.com/@zalmoxis/using-redux-devtools-in-production-4c5b56c5600f

## DONE

- ok - icons for project-overview
- ok - connectionPoint
- ok - GraphicText (with editing text)
- ok - generic PopupMenu
- ok - scroll the symbollist
- ok - save symbol with save project
- ok - create Symbol
- ok - use Symbol
- ok - group in group
- ok - move group
- ok - ungroup
- ok - move canvas
- ok - change color for selected Placements
- ok - zoom into selected items (center of bounding box)
- ok - selected item in shown on top - even if it is below other items
- ok - multi-selection expands the resize-box
- ok - do not move the resize-box
- ok - create item in frontEnd - to not wait for backend
- ok - redraw after store.items change

* ok - hover-paint same as "edit" "selected" new Mode "hover"
* ok - remove edit-box on moving item
* ok - no redraw after saving to backend
* ok - during selection-from-rectangle all items are: "selected" (also one item is selected - not edit)
* ok - cmd-A select all
* ok - getPlacementFromIds() as 'global'function with cache. cache will be cleared on redraw Canvas
* ok - select by drawing a selection box
* ok - check undo/redo (setMetaData on PaperPlacement)
* ok - fix undo of delete placement
* ok - switch to id => selectedPlacementIds (no selectedPaperItems, no selectedItems)
* ok - Arc. Set Start/End angle
* ok - zoom in/out
* ok - Zoom in +/- get center from cursor
* ok - ONE resize-box
* ok - delete
* ok - hover-color on resize-handle

## State machine

- has one state
- gets events that moves to an other state

  - (and may do side effects on that way)

- handle an event INSIDE a current state

```
send("CALL_PERSON", person)

// returns new state
function send(event): string {
  switch (state) {
    case "idle":
      switch (event) {
        case "CALL_PERSON":
          // so some side effects
          return "calling";
        default:
          return state;
      }
      break;

  }
}
```

# TOUCH

https://ux.stackexchange.com/questions/52259/web-standard-for-minimum-size-of-touch-icons

## Selection

### selection with window like autocad

- create rectangle from left to right => all elements that are **completely** in the rectangle. (fill of the rectangle in blue-transparent)

- create rectangle from left to right => all elements that are **partly** in the rectangle (fill of the rectangle is green-transparents)

- behaviour: all selected elements gets on own boundingbox with their own handle to modify / resize that element.

## update via websocket

update to the backend each time some data will change

inform other collaborating users via websocket - so they get an update

client-server really simple:

change -> post changes to server. Server will give you back the changes of other users.
=> "merge" that changes to your client-data-structure

on the server you also have to merge the changing-data to the data-base-structure.
And it has to be conflict-fee ! CRDT database (conflict-free replicated data types)

#cypress

https://github.com/cypress-io/cypress-example-todomvc/blob/master/package.json

#learned

```
class base {
  foo() {
    return 42;
  }
}

clas foo extends base {

  // that does not work !!
  foo = () => {
    return 666;
  }

  // use that
  foo() {
    return 123;
  }
}
```
