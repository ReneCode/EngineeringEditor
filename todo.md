# ISSUES

fixed - selected item in shown on top - even if it is below other items

- Questions

* when importJson into a new createdItem => that item is not shown

- TODO

* during selection-from-rectangle all items are: "selected" (also one item is selected - not edit)

- hover-paint same as "edit" "selected" new Mode "hover"

- Escape: to not remove IacHover
-
- box the pop-menu into visible area

- remove edit-box on moving item

* create item in frontEnd - to not wait for backend
* select id after creating Line/Arc

- panning

  - move canvas
  - move also popup-menu

- no redraw after saving to backend

* disable redux-dev-tools in production / https://medium.com/@zalmoxis/using-redux-devtools-in-production-4c5b56c5600f

- cmd-C cmd-V copy paste

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

* handles of the resizeBox has fixed size - independent on zoom.
* resize without keepRatio on Rectangle
* change z-index for items (to background/foreground)
* create metaData on a new drawn placement

- multi-selection expands the resize-box
- resize of that box resizes the items inside
- with SHIFT the with-height ratio is fixed on resizing the box
  (- with ctrl the center of the resize-box will be fixed)

- no separate interactions.
  handleMouse... on the component where it starts.
- redraw after store.items change
- undo -> dispatch(setSelection) with last changed item

* Undo / Redo: after Undo/Redo select the "undo-ed" items
  remove the current selection

* Undo => changes the items in the state => no more subscription on redux-store.
  update the view on the changed placements. (do not use redux-store)

* do not move the resize-box

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
