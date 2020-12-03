/**
 * Create actions here
 */
import {
    INIT_MAP,
    
} from './actionTypes';

// 初始化底图
export const initMap = (mapObj) => {
    return ({
        type: INIT_MAP,
        payload: {
            mapObj
        }
    })
}