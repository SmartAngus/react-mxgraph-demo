import React, { Dispatch, SetStateAction } from 'react';

interface EditorContext {
    initialized: boolean,
    setInitialized?: Dispatch<SetStateAction<boolean>>|null
}

const initCtx = {
    initialized: false,
    setInitialized: null
};

// Exposed in separate context for easier component composition
export const EditorContext = React.createContext<EditorContext>(initCtx);