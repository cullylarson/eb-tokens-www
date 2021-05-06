import {isObject} from '@cullylarson/f'

export function isDev() {
    return process.env.NODE_ENV === 'development'
}

export const isServer = () => typeof window === 'undefined'

export const isBrowser = () => !isServer()

export function responseData(response) {
    return response.json()
        .then(data => ({response, data}))
}

export const getMessage = (messageOrObject) => {
    return isObject(messageOrObject) && messageOrObject.message
        ? messageOrObject.message
        : messageOrObject
}

// can provide a string, an array, or individual string arguments. e.g. classnames('my-class'), classnames(['my-class-1', 'my-class-2']), classnames('my-class-1', 'my-class-2')
export function classnames(...args) {
    if(!args.length) return ''

    const x = args.length === 1
        ? args[0]
        : args

    return Array.isArray(x)
        ? x.filter(Boolean).join(' ')
        : x
}

// generates a 6-character pseudo-random id
// taken from https://github.com/jossmac/react-toast-notifications/blob/master/src/utils.js
export function uniqueId() {
    let first = (Math.random() * 46656) | 0
    let second = (Math.random() * 46656) | 0
    first = ('000' + first.toString(36)).slice(-3)
    second = ('000' + second.toString(36)).slice(-3)
    return first + second
}
