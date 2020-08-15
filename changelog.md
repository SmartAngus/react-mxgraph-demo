# Quick notes of development process

Previously, editor object wasn't a singleton and it was shared via window object.  
It was ok approach to get things working, but for code maintainability, I had to introduce context and editor state sharing throughout app tree.  
Singleton will enable entities easy access to editor and it's properties, and editor context with intiialized status can deffer code running to for example, make sidebar component draggable.  

Next step is to introduce more abstraction to entities.  
Copy/pasting Square.js and introducing new component would work fine for some time, but we'd run into code scaling issues at some point.  

----

Added type script