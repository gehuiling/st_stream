import {
    INIT_MAP
} from '../actionTypes';

const initState = {
    mapObj: null,

}

export default function (state = initState, action) {
    switch (action.type) {
        // 底图初始化
        case INIT_MAP: { 
            let { mapObj } = action.payload;
            return {
                ...state,
                mapObj
            }
        }
        
        default:
            return state;
    }
}