import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './Editor.css';
import { Editor as EditorJS, EditorContext } from '../../editor';

const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(3),
    },
}));

export default function Editor() {

    const classes = useStyles()
    const editorCtx = useContext(EditorContext);


    useEffect(() => {
        EditorJS.init()
        EditorJS.addDemoWidgets()
        if(EditorJS.initialized && editorCtx.setInitialized)
            editorCtx.setInitialized(true)
        else
            throw new Error(`Unable to initialize Editor`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={"graph-content " + classes.content} key="content" />
    )
};