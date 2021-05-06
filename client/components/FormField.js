import FormFieldErrors from '@@client/components/FormFieldErrors'
import {classnames} from '@@client/lib/util'

export default function FormField({
    children,
    inputId,
    errorId,
    title,
    description,
    errors,
    className,
    titleClassName,
    required = false,
    childrenFirst = false,
}) {
    const haveErrors = errors && errors.length

    const classNames = classnames([
        'field',
        haveErrors ? 'has-errors' : null,
        required ? 'is-required' : null,
        className,
    ])

    return (
        <div className={classNames}>
            {childrenFirst ? children : undefined}
            {title ? <label className={titleClassName} htmlFor={inputId}>{title}</label> : null}
            <div className='field-input'>
                {!childrenFirst ? children : undefined}
            </div>
            <FormFieldErrors id={errorId} errors={errors} />
            {description ? <div className='description'>{description}</div> : ''}
        </div>
    )
}
