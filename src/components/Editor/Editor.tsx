import React, { useEffect, useContext } from 'react';
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import './Editor.css';
import { Editor as EditorJS, EditorContext } from '../../editor';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        padding: theme.spacing(3),
    },
    content: {
        zIndex: 0
    },
}));

const calculateContentHeight = (tbHeight:number, paddingOffset:number):string => {

    if(typeof window === "undefined")
        return "100%";

    const height:number = (window.innerHeight - tbHeight - paddingOffset) * 0.9;

    return `${height}px`;
}

export default function Editor() {

    const classes = useStyles()
    const editorCtx = useContext(EditorContext);
    const theme = useTheme();

    useEffect(() => {
        EditorJS.init()
        EditorJS.addGrid()
        EditorJS.addDemoWidgets()
        if(EditorJS.initialized && editorCtx.setInitialized)
            editorCtx.setInitialized(true)
        else
            throw new Error(`Unable to initialize Editor`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Calculate toolbar height
    let tbHeight = 56;
    const xsTb = useMediaQuery(`${theme.breakpoints.up('xs')} and (orientation: landscape)`);
    if(xsTb)
        tbHeight = 48;
    const smTb = useMediaQuery(`${theme.breakpoints.up('sm')}`);
    if(smTb)
        tbHeight = 64;


    return (
        <div className={"graph-wrapper " + classes.wrapper}>
            <Paper elevation={3}
                   className={"graph-content " + classes.content}
                   style={{"minHeight": calculateContentHeight(tbHeight, theme.spacing(3))}} />
        </div>
    )
};