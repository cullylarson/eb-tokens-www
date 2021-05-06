import {useState, useEffect} from 'react'
import Image from 'next/image'
import {classnames} from '@@client/lib/util'

export const copyToClipboard = str => {
    const el = document.createElement('textarea')
    el.value = str
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
}

export default function CopyToClipboard({value}) {
    const [noticeShown, setNoticeShown] = useState(false)

    const noticeClassNames = classnames([
        'notice',
        noticeShown ? 'is-shown' : null,
    ])

    useEffect(() => {
        let timeout

        if(noticeShown) {
            timeout = setTimeout(() => {
                setNoticeShown(false)
            }, 1500)
        }

        return () => timeout ? clearTimeout(timeout) : null
    }, [noticeShown])

    const handleCopy = () => {
        copyToClipboard(value)
        setNoticeShown(true)
    }

    return (
        <>
            <span className='copy-to-clipboard'>
                <span className='copy'><button className='m--no-btn' onClick={handleCopy}><Image width='15' height='15' src='/images/icons/paste.svg' alt='copy icon' /></button></span>
                <span className={noticeClassNames}>
                    <span className='notice-inner'>Copied</span>
                </span>
            </span>
            <style jsx>
                {`
                    .copy-to-clipboard {
                        display: inline-block;
                        position: relative;
                        user-select: none;
                        top: 2px;
                    }

                    .notice {
                        display: block;
                        position: absolute;
                        width: 100px;
                        opacity: 0;
                        visibility: none;
                        transition: opacity 300ms ease-out;
                        top: 10px;
                        left: calc(100% + 10px);

                        &.is-shown {
                            opacity: 1;
                            visibility: visible;
                        }
                    }

                    .notice-inner {
                        font-size: 12px;
                        line-height: 14px;
                        color: #707070;
                        background: #eee;
                        padding: 3px 5px;
                        border-radius: 3px;
                    }

                    .copy {
                        display: block;
                        margin-left: 10px;
                    }

                    button {
                        cursor: pointer;
                    }
                `}
            </style>
        </>
    )
}
