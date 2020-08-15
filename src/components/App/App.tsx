import React, { useState, useContext } from 'react';
import './App.css';
import Editor from '../Editor/Editor';
import Layout from '../Layout/Layout'
import Sidebar from '../Sidebar/Sidebar'
import { EditorContext } from '../../editor';

export default function App() {

  // Handle editor context setup
  const editorCtx = useContext(EditorContext);
  const [initialized, setInitialized] = useState(false);
  editorCtx.initialized = initialized;
  editorCtx.setInitialized = setInitialized;

  return (
    <Layout sidebar={<Sidebar />}>
      <Editor />
    </Layout>
  )
};