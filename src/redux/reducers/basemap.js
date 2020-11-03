
import { INIT_MAP } from '../actionTypes';

const initState = {
    baseMap: null,

}

export default function(state=initState, action) {
    switch(action.type) {
        case INIT_MAP: { // 底图初始化
            let { mapObj } = action.payload;
            return {
                ...state,
                baseMap: mapObj
            }
        }
        default:
            return state;
    }
}