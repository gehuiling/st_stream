import {
    INIT_MAP
} from '../actionTypes';

const initState = {
    mapObj: null,

}

export default function (state = initState, action) {
    switch (action.type) {
        case INIT_MAP: { // 底图初始化
            let {
                mapObj
            } = action.payload;
            return {
                ...state,
                mapObj
            }
        }
        default:
            return state;
    }
}