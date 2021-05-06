import {useRef, useEffect} from 'react'

// basically a componentDidUpdate hook
export const useUpdate = (onChange, watchUsForChanges) => {
    const hasRun = useRef(false)

    useEffect(() => {
        if(!hasRun.current) {
            hasRun.current = true
        }
        else {
            onChange(watchUsForChanges)
        }
    }, watchUsForChanges)
}
