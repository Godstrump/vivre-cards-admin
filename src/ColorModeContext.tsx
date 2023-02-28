import { createContext } from "preact/compat";


const ColorModeContext = createContext({
    toggleColorMode: () => {},
});

export default ColorModeContext;
