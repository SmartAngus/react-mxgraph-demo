import React, { } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import Square from '../../entities/Square';

const useStyles = makeStyles((theme) => ({
    drawerContainer: {
        overflow: 'auto',
    },
}));

export default function Sidebar({ editorInitialized }) {
    const classes = useStyles()

    return (
        <>
            <Toolbar />
            <div className={classes.drawerContainer}>
                <List>
                    <Square />
                </List>
                <Divider />
            </div>
        </>
    )
};