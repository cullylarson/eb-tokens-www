import {useState} from 'react'
import Messages from '@@client/components/Messages'
import CopyToClipboard from '@@client/components/CopyToClipboard'
import {uniqueId} from '@@client/lib/util'
import {useToken} from '@@client/eb-token/api'

const Token = ({tokenInfo}) => {
    if(tokenInfo.state === 'loading') {
        return null
    }
    else if(tokenInfo.state === 'error') {
        return <Messages error={tokenInfo.errors} />
    }
    else {
        return (
            <p>
                <strong>Current Token:</strong> {tokenInfo.token}
                <CopyToClipboard value={tokenInfo.token} />
            </p>
        )
    }
}

const GetToken = ({disabled, onClick}) => {
    return (
        <p><button disabled={disabled} onClick={onClick}>Get new token</button></p>
    )
}

export default function Home() {
    const [tokenKey, setTokenKey] = useState(uniqueId())
    const tokenInfo = useToken(tokenKey)

    const handleGetTokenClick = () => {
        // if we change the tokenKey, useToken will fetch a new token
        setTokenKey(uniqueId())
    }

    return (
        <>
            <h1>EB Tokens</h1>
            <Token tokenInfo={tokenInfo} />
            <GetToken disabled={tokenInfo.state === 'loading'} onClick={handleGetTokenClick} />
        </>
    )
}
