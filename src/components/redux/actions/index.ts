import { ActionType } from '../action_types/index'

export type actionTypeSchema = {
    type: ActionType,
    payload: object
}

export default class Add{
    add(payload:object): actionTypeSchema{
        return {
            type: ActionType.ADD,
            payload
        }
    }
}