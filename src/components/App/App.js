import React, { useEffect, useState } from 'react';
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

export default function App() {
  const classes = useStyles()
  const [isEditorInitialized, setEditorInitialized] = useState(false)

  useEffect(() => {
    if (!isEditorInitialized) {
      // Editor's gonna be accessed from multiple components and it's a separate layer
      // It makes sense to have it available in global space
      window.editor = new Editor('.graph-content')
      window.editor.init()
      window.editor.addDemoWidgets()
      setEditorInitialized(window.editor.initialized)
      return
    }
  }, [isEditorInitialized])

  return (
    <Layout sidebar={<Sidebar editorInitialized={isEditorInitialized} />}>
      <div className={"graph-content " + classes.content}
        key="content" />
    </Layout>
  )
};