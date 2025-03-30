export {removetv} from '../reducers/TvSlice'
import axios from '../../utils/Axios'
import { loadtv } from '../reducers/TvSlice'


export const asyncloadtv = (id) => async (dispatch, getState)=>{
    try{
        const detail = await axios.get(`/tv/${id}`)
        const externalid = await axios.get(`/tv/${id}/external_ids`)
        const recommendations = await axios.get(`/tv/${id}/recommendations`)
        const similar = await axios.get(`/tv/${id}/similar`)
        const videos = await  axios.get(`/tv/${id}/videos`)
        const watchprovider = await axios.get(`/tv/${id}/watch/providers`)
        const translations = await axios.get(`/tv/${id}/translations`)


        let theultimatedetails = {
            detail : detail.data,
            externalid : externalid.data,
            recommendations : recommendations.data.results,
            similar : similar.data.results,
            videos : videos.data.results.find(m=> m.type === "Trailer"),
            watchprovider : watchprovider.data.results.IN,
            translations : translations.data.translations.map((t => t.english_name))
        }
        dispatch(loadtv(theultimatedetails))
        
    }catch(error){
        console.log(error)
    }
}