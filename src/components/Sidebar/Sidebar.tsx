import React, { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import Toolbar from '@material-ui/core/Toolbar'
import { ListItem, ListItemText, ListItemIcon, TextField, InputAdornment, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import Inbox from '@material-ui/icons/Inbox'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import CancelIcon from '@material-ui/icons/Cancel';
import _ from 'lodash';

import { ENTITIES_MENU, EntityMenuGroup, EntityMenuItem } from '../../entities/'

const useStyles = makeStyles((theme) => ({
    drawerContainer: {
        overflow: 'auto',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    listFixWidth: {
        width: '100%'
    },
    searchFieldWrapper: {
        width: '100%',
        margin: '0 auto',
        padding: theme.spacing(2)
    },
    searchField: {
        width: '100%',
        margin: '0 auto',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}))

const renderCategory = (open: string[], setOpen: Function, classes: any, category: string, key: number, children: any) => {

    const isOpen = () => {
        return open.indexOf(category) !== -1
    }

    const toggleOpen = () => {
        (isOpen()) ? setOpen(open.filter((i, j) => { return i !== category })) : setOpen(open.concat([category]))
    }

    return (
        <div key={key}>
            <ListItem button onClick={toggleOpen}>
                <ListItemIcon>
                    <Inbox />
                </ListItemIcon>
                <ListItemText primary={category} />
                {isOpen() ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={isOpen()} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {children.map((child: any, i: number) => {
                        return <child.component label={child.name} key={i} isOpen={isOpen()} className={classes.nested} />
                    })}
                </List>
            </Collapse>
        </div>
    )
}

/**
 * Filters entities based on query.
 * Executed for each category.
 * 
 * @param category 
 * @param query 
 * @returns boolean True if query string is matched in category name or childrens labels
 */
const searchInCategory = (category: EntityMenuGroup, query?: string | null): boolean => {

    // Fetch unmutated category
    const originalCategory = ENTITIES_MENU.find((i: EntityMenuGroup) => i.group === category.group)
    if (!originalCategory)
        return false

    // Empty query
    if (!query) {
        // Reset children
        category.children = originalCategory.children.slice()
        return true
    }

    // Query in category name
    if (category.group.toLowerCase().includes(query.toLowerCase()))
        return true


    // Filter childrens' names
    const children = originalCategory.children.filter((i: EntityMenuItem) => {
        return i.name.toLowerCase().includes(query.toLowerCase())
    })

    if (children.length > 0) {
        category.children = children
        return true
    }

    // Not found
    return false
}

export default function Sidebar() {
    const em = _.cloneDeep(ENTITIES_MENU)
    const classes = useStyles()
    // eslint-disable-next-line @typescript-eslint/no-array-constructor
    const [open, setOpen] = useState(Array())
    const [searchQuery, setSearchQuery] = useState("")
    const [entitiesList, setEntitiesList] = useState(em)

    const searchFieldRef = useRef<HTMLInputElement>()

    useEffect(() => {
        const result = em.filter((i: EntityMenuGroup) => { return searchInCategory(i, searchQuery) })
        setEntitiesList(result)
        // open all
        const groups = result.map((i: EntityMenuGroup) => { return i.group })
        setOpen(groups)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery])


    // Search bar shortcuts
    useEffect(() => {
        if(typeof document === "undefined")
            return

        document.addEventListener('keydown', (e) => {
            // Handle ` Key
            if(e.keyCode === 192)
            {
                searchFieldRef?.current?.focus()
                e.preventDefault()
            }
        })
    }, [])

    return (
        <>
            <Toolbar />
            <div className={classes.drawerContainer}>
                <div className={classes.searchFieldWrapper}>
                    <TextField id="standard-basic"
                        label="(`)Search entities"
                        inputRef={searchFieldRef}
                        className={classes.searchField}
                        onChange={(e) => { setSearchQuery(e.target.value) }}
                        value={searchQuery}
                        // helperText={"Press ` to focus"}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={(e) => { setSearchQuery("") }}
                                    onMouseDown={(e) => { e.preventDefault() }}
                                  >
                                    { (!searchQuery) ? null : <CancelIcon /> }
                                  </IconButton>
                                </InputAdornment>
                            )
                        }} />
                </div>
                <Divider />

                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    className={classes.listFixWidth}>
                    {entitiesList && entitiesList.map((k: any, i: number) => {
                        return renderCategory(open, setOpen, classes, k.group, i, k.children)
                    })}
                </List>

            </div>
        </>
    )
}