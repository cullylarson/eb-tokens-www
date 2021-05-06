import {useMemo} from 'react'
import useSWR from 'swr'
import urlJoin from 'url-join'
import {responseData} from '@@client/lib/util'
import useConfig from '@@client/config/useConfig'

const getUnknownError = () => {
    const error = new Error('Something went wrong and the token could not be fetched.')
    error.code = 'unknown'

    return error
}

const tokenFetcher = url => fetch(url)
    .catch(() => {
        // replace swr's default error with something helpful
        throw getUnknownError()
    })
    .then(responseData)
    .then(({response, data}) => {
        if(!response.ok) {
            // swr knows about failure only via exceptions
            throw getUnknownError()
        }

        return data
    })

const validateTokenFetcher = (url, token) => fetch(url)
    .catch(() => {
        // replace swr's default error with something helpful
        throw getUnknownError()
    })
    .then(responseData)
    .then(({response, data}) => {
        if(!response.ok) {
            // swr knows about failure only via exceptions
            throw getUnknownError()
        }

        return data
    })

// If tokeyKey changes, will fetch a new token. Since the token is random (i.e. we aren't fetching using an identifier),
// there's no domain-level way to say "I want a new token". So if you want a new one, just pass a new tokenKey. The
// tokenKey is likely just a random string of some kind. It isn't used apart from some way to say "keep this token"
// or "get a new token".
//
// You could solve this using swr's mutate function, but it would involve creating another function like
// "triggerGetNewToken" and the logic flow of doing that seems more difficult to understand (i.e. why
// would calling triggerGetNewToken cause useToken to give you another token?).
export const useToken = (tokenKey) => {
    const config = useConfig()

    const url = useMemo(() => urlJoin(config.ebTokens.apiUrl, '/v1/token'), [config.ebTokens.apiUrl])

    const {data, error} = useSWR([url, tokenKey], tokenFetcher, {
        // if we revalidate, we'll clobber our token, so we don't want to do it unless the user triggers it
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })

    const errorResult = error
        ? {message: error.message, code: error.code}
        : null

    const state = !error && !data
        ? 'loading'
        : error
            ? 'error'
            : 'ready'

    return {
        token: state === 'ready' ? data.token : null,
        errors: [errorResult],
        state,
    }
}

export const useValidateToken = (token) => {
    const config = useConfig()

    const url = useMemo(() => urlJoin(config.ebTokens.apiUrl, '/v1/token/validate?token=' + encodeURIComponent(token)), [config.ebTokens.apiUrl, token])

    // if we pass null to useSWR, it won't fetch which is what we want if token is null
    const {data, error} = useSWR(token === null ? null : [url, token], validateTokenFetcher, {
        // don't revalidate unless something changes
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })

    const failError = error
        ? [{message: error.message, code: error.code}]
        : []

    // need to test if token is null since useSWR doesn't explicitly indicate that it didn't actually fetch anything (not ideal)
    const state = !error && !data && token !== null
        ? 'loading'
        : error
            ? 'error'
            : 'ready'

    const reasons = state !== 'ready'
        ? []
        : data?.isValid
            ? []
            : data?.reasons || []

    return {
        isValid: data ? data.isValid : null,
        errors: [...failError, ...reasons],
        state,
    }
}
