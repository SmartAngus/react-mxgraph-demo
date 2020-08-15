import React from 'react';

// Exposed in separate context for easier component composition
export const EditorContext = React.createContext({
    initialized: null,
    setInitialized: null,
});