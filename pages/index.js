import {useState} from 'react'
import Layout from '@@client/app/Layout'
import Messages from '@@client/components/Messages'
import FormText from '@@client/components/FormText'
import CopyToClipboard from '@@client/components/CopyToClipboard'
import {uniqueId, preventDefault, handleParamChange} from '@@client/lib/util'
import {useToken, useValidateToken} from '@@client/eb-token/api'

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

const GetTokenButton = ({disabled, onClick}) => {
    return (
        <p><button disabled={disabled} onClick={onClick}>Get new token</button></p>
    )
}

const TokenValidationMesage = ({isValid}) => {
    // we don't actually have a result, or haven't tried to validate
    if(isValid === null) return null

    const message = isValid
        ? 'Token is valid.'
        : 'Token is not valid.'

    const className = isValid
        ? 'is-valid'
        : 'not-valid'

    return (
        <>
            <p className={className}>{message}</p>
            <style jsx>
                {`
                    @import '@css/variables.css';

                    p {
                        padding: 10px;
                    }

                    .is-valid {
                        border: 4px solid $c--blue--dark;
                    }

                    .not-valid {
                        border: 4px solid $c--error;
                    }
                `}
            </style>
        </>
    )
}

const ValidateTokenForm = () => {
    const [token, setToken] = useState(null)
    // we want a separate state var for the token we're validating because we only want to trigger useValidateToken when the user clicks the button. if we just used
    // token, the form would validate as the user is typeing (not what we want).
    const [tokenToValidate, setTokenToValidate] = useState(null)

    const validateTokenInfo = useValidateToken(tokenToValidate)

    const isValid = validateTokenInfo.isValid
    const disabled = validateTokenInfo.state === 'loading'
    const errors = validateTokenInfo.errors

    const handleSubmit = preventDefault(() => {
        // if we set the token, it will revalidate
        setTokenToValidate(token)
    })

    const handleTokenChange = e => {
        handleParamChange(setToken)(e)
        setTokenToValidate(null)
    }

    return (
        <>
            <TokenValidationMesage isValid={isValid} />
            <form onSubmit={handleSubmit}>
                <FormText
                    idPrefix='validate-token-home'
                    name='token'
                    title='Token'
                    value={token}
                    onChange={handleTokenChange}
                    errors={errors}
                    disabled={disabled}
                    required
                />

                <div className='actions'>
                    <button type='submit' disabled={disabled}>Validate token</button>
                </div>
            </form>
        </>
    )
}

export default function Home() {
    const [tokenKey, setTokenKey] = useState(uniqueId())

    const tokenInfo = useToken(tokenKey)

    const handleGetToken = () => {
        // if we change the tokenKey, useToken will fetch a new token
        setTokenKey(uniqueId())
    }

    return (
        <Layout>
            <h1>EB Tokens</h1>

            <hr />

            <Token tokenInfo={tokenInfo} />
            <GetTokenButton disabled={tokenInfo.state === 'loading'} onClick={handleGetToken} />

            <hr />

            <ValidateTokenForm />
        </Layout>
    )
}
