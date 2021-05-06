import {useContext} from 'react'
import DepsContext from '@@client/app/DepsContext'

export default function useConfig() {
    const {config} = useContext(DepsContext)

    return config
}
