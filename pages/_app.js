import DepsContext from '@@client/app/DepsContext'

import '@@client/style/global.css'

function buildPrefetchUrls(urls) {
    if(!urls || !urls.length) return []

    return [...new Set(
        urls
            .filter(Boolean)
            .map(x => new URL(x))
            .map(x => `${x.protocol}//${x.host}`),
    )]
}

const config = {
    ebTokens: {
        apiUrl: process.env.EB_TOKENS_API_URL,
    },
    dnsPrefetchUrls: buildPrefetchUrls([
        process.env.EB_TOKENS_API_URL,
    ]),
}

function App({Component, pageProps}) {
    const deps = {
        config,
    }

    return (
        <DepsContext.Provider value={deps}>
            <Component {...pageProps} />
        </DepsContext.Provider>
    )
}

export default App
