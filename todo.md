# TODO

## Selection

### selection with window like autocad

- create rectangle from left to right => all elements that are **completely** in the rectangle. (fill of the rectangle in blue-transparent)

- create rectangle from left to right => all elements that are **partly** in the rectangle (fill of the rectangle is green-transparents)

- behaviour: all selected elements gets on own boundingbox with their own handle to modify / resize that element.

## update via websocket

update to the backend each time some data will change

inform other collaborating users via websocket - so they get an update

client-server realy simple:

change -> post changes to server. Server will give you back the changes of other users.
=> "merge" that changes to your client-data-structure

on the server you also have to merge the changing-data to the data-base-structure.
And it has to be conflict-fee ! CRDT database (conflict-free replicated data types)
