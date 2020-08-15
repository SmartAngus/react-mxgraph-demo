import React, { useEffect, useRef } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';


/**
 * Define what happens when entity is dropped on graph.
 * You can access editor via window.editor
 * 
 * @param {mxGraph} graph 
 * @param {Event} evt 
 * @param {mxCell} cell 
 * @param {int} x 
 * @param {int} y 
 */
const OnDrop = function (graph, evt, cell, x, y) {
    const parent = graph.getDefaultParent();
    const model = graph.getModel();


    model.beginUpdate();
    try {
        graph.insertVertex(parent, null, "Test Rectangle", x, y, 120, 120);
    }
    finally {
        model.endUpdate();
    }

}

/**
 * Define how entity will look while it's being dragged
 */
const DragShadow = () => {

    const dragElt = document.createElement('div');
    dragElt.style.border = 'dashed black 1px';
    dragElt.style.width = '120px';
    dragElt.style.height = '120px';

    return dragElt;
}


/**
 * Define how entity will render in the sidebar
 */
export default function Rectangle() {

    const editor = window.editor
    const eleRef = useRef(null)

    useEffect(() => {
        if (!editor)
            return;

        // Creates the image which is used as the drag icon (preview)
        editor.mxnSpace
            .mxUtils
            .makeDraggable(eleRef.current, editor.graph, OnDrop, DragShadow(), 0, 0, true, true)
            .setGuidesEnabled(true);

    }, [editor])

    return (
        <ListItem button ref={eleRef}>
            <ListItemIcon>
                <MailIcon />
            </ListItemIcon>
            <ListItemText primary={"Rectangle"} />
        </ListItem>
    )
};