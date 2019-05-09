# ISSUES

fixed - selected item in shown on top - even if it is below other items

# TODO

ok - zoom in/out

- Zoom in +/- get center from cursor
- change z-index for items (to background/foreground)

- resize without keepRatio on Rectangle

ok - ONE resize-box

ok- delte

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

* hover-color on resize-handle

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
