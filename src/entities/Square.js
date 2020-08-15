import React, { useEffect, useRef, useContext } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CropSquareIcon from '@material-ui/icons/CropSquare';
import { Editor as EditorJS, EditorContext } from '../editor';


/**
 * Define what happens when entity is dropped on graph.
 * 
 * @param {mxGraph} graph 
 * @param {Event} evt 
 * @param {mxCell} cell 
 * @param {int} x 
 * @param {int} y 
 */
const onDrop = function (graph, evt, cell, x, y) {
    const parent = graph.getDefaultParent();
    const model = graph.getModel();

    model.beginUpdate();
    try {
        const dimension = (typeof window !== "undefined") ? parseInt(window.prompt("Enter dimenions", 120)) : 120;
        graph.insertVertex(parent, null, `Square ${dimension}`, x, y, dimension, dimension);
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
export default function Square() {
    const editorCtx = useContext(EditorContext)
    const eleRef = useRef(null)

    useEffect(() => {
        if (!editorCtx.initialized)
            return;

        // Creates the image which is used as the drag icon (preview)
        EditorJS.mxnSpace
            .mxUtils
            .makeDraggable(eleRef.current, EditorJS.graph, onDrop, DragShadow(), 0, 0, true, true)
            .setGuidesEnabled(true);

    }, [editorCtx.initialized])

    return (
        <ListItem button ref={eleRef}>
            <ListItemIcon>
                <CropSquareIcon />
            </ListItemIcon>
            <ListItemText primary={"Square"} />
        </ListItem>
    )
};