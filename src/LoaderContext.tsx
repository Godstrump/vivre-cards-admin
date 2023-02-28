import { createContext } from "preact/compat";


const LoaderContext = createContext({
    Loading: () => <></>,
});

export default LoaderContext;
