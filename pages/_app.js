import {isDev} from '@@client/lib/util'
import DepsContext from '@@client/app/DepsContext'

import '@@client/style/global.css'

// eslint-disable-next-line no-unused-expressions
if(isDev()) import('@@client/style/debug.css')

const config = {
    ebTokens: {
        apiUrl: process.env.EB_TOKENS_API_URL,
    },
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
