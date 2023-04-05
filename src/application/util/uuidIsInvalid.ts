import { validate } from 'uuid';

export function uuidIsInvalid(uuid: string, variableName: string): void{
    if(!validate(uuid)){
        throw new Error(`invalid ${variableName} as it is not a uuid`)
    }
}