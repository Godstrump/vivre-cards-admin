import { render } from 'preact'
import { Provider } from 'react-redux'
import { App } from './app'
import { store } from './app/store'
import './index.css'

render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('app') as HTMLElement)
