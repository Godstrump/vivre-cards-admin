import handleDate from "./handle-date"
import { dateOptions as options } from './constants'

const handleCell = (value: unknown) => {
    if (value === 'undefined' || value === undefined) {
        return null + ''
    }
    if (typeof value === 'string' && value?.split('-')[0] === '2023') {
        return handleDate(value, options)
    }
    return value === false ? "No" : value === true ? 'Yes' : value
}

export default handleCell