import {INIT_MAP, } from './actionTypes';

export const initMap = (mapObj)　=> {
    return(
        {
            type: INIT_MAP,
            payload: {
                mapObj
            }
        }
    )
}
