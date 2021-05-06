import {getMessage} from '@@client/lib/util'

export default function FormFieldErrors({
    errors,
    id,
}) {
    const haveErrors = errors && errors.length

    if(!haveErrors) return ''

    return (
        <ul id={id} aria-live='polite' className='errors'>
            {errors.map((x, i) => <li key={i}>{getMessage(x)}</li>)}
        </ul>
    )
}
