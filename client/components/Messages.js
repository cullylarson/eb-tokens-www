import {useMemo, useRef} from 'react'
import {liftA} from '@cullylarson/f'
import {getMessage, classnames} from '@@client/lib/util'
import {useUpdate} from '@@client/lib/hooks'

export default function Messages({
    // Only one key of error, success, or notice should be set. If multiple are set, the others will be ignored
    error,
    success,
    notice,
    scrollOnMessages = true, // if there are messages, scroll to this element
}) {
    const ref = useRef(null)

    const errorFiltered = useMemo(() => liftA(error).filter(x => !!x), [error])
    const successFiltered = useMemo(() => liftA(success).filter(x => !!x), [success])
    const noticeFiltered = useMemo(() => liftA(notice).filter(x => !!x), [notice])

    // scroll into view, if we have messages
    useUpdate(() => {
        if(!scrollOnMessages) return
        if(!ref.current) return

        if(errorFiltered.length || successFiltered.length || noticeFiltered.length) {
            ref.current.scrollIntoView(true)
        }
    }, [error, success, notice])

    const renderSet = (classNames, role, messages) => {
        classNames = classnames([
            ...liftA(classNames),
            'messages',
        ])

        return (
            <ul ref={ref} role={role} aria-live={role === 'alert' ? 'assertive' : 'polite'} className={classNames}>
                {messages.map((x, i) => <li key={i}>{getMessage(x)}</li>)}
            </ul>
        )
    }

    const renderOne = (error, success, notice) => {
        if(error && error.length) return renderSet('error', 'alert', error)
        else if(success && success.length) return renderSet('success', 'status', success)
        else if(notice && notice.length) return renderSet('notice', 'status', notice)
        else return null
    }

    return (
        <>
            {renderOne(errorFiltered, successFiltered, noticeFiltered)}
        </>
    )
}
