import FormField from '@@client/components/FormField'

export default function FormOneliner({
    id,
    before,
    after,
    children,
    ...formFieldAtts
}) {
    return (
        <FormField inputId={id} {...formFieldAtts}>
            <div className='input-line'>
                {before}
                {children}
                {after}
            </div>
        </FormField>
    )
}
