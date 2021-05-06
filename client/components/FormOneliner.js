import FormOnelinerGeneric from '@@client/components/FormOnelinerGeneric'

function idFromPrefix(idPrefix, inputName) {
    return idPrefix
        ? `${idPrefix}--${inputName}`
        : null
}

export default function FormOneliner({
    idPrefix,
    id,
    type,
    onChange,
    value,
    name,
    placeholder,
    disabled = false,
    'aria-label': ariaLabel,
    step,
    required,
    autoComplete,
    ...restAtts
}) {
    id = id || idFromPrefix(idPrefix, name)

    value = value === null || value === undefined
        ? ''
        : value

    const errorId = id + '--error'

    return (
        <FormOnelinerGeneric
            id={id}
            name={name}
            errorId={errorId}
            disabled={disabled}
            required={required}
            {...restAtts}
        >
            <input autoComplete={autoComplete} type={type} id={id} name={name} value={value} step={step} placeholder={placeholder} onChange={onChange} aria-label={ariaLabel} disabled={disabled ? 'disabled' : ''} aria-describedby={errorId} required={required} />
        </FormOnelinerGeneric>
    )
}
