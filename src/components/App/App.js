import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Editor from '../../editor/editor';
import Layout from '../Layout/Layout'
import Sidebar from '../Sidebar/Sidebar'

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3),
  },
}));

export default function App(){
  const classes = useStyles()
  const editor = new Editor('.graph-content')
  const [isEditorInitialized, setEditorInitialized] = useState(false)
  const sidebar = (<Sidebar editor={editor}
                            editorInitialized={isEditorInitialized} />)

  useEffect(() => {
    // console.log("[APP]", "Initializing editor...", isEditorInitialized, editor)
    editor.init()
    editor.addDemoWidgets()
    setEditorInitialized(true)
  }, [])

  return (
    <Layout sidebar={sidebar}>
        <div className={"graph-content " + classes.content}
             key="content" />
    </Layout>
  )
};