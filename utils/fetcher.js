import axios from "axios";

export const fetcher = async (url, data = undefined) => {
    let res = await axios(window.location.origin + url, {
        method: data ? 'POST' : 'GET',
        data
    })
    return res.data;
}


export const deleter = async (url, data = undefined) =>
    axios.delete(window.location.origin + url).then((r) => r.data);