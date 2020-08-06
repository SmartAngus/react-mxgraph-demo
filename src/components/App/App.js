import React, { useEffect } from 'react';
import './App.css';
import Editor from '../../editor/editor';
import Layout from '../Layout/Layout'

export default function App(){

  const editor = new Editor('.graph-content')

  useEffect(() => {
    console.log("Initializing editor...", editor)
    editor.init()
    editor.addDemoWidgets()
  })
  
  return (
    <Layout>
        <div className="graph-content" key="graphcontent" />  
    </Layout>
  )
};