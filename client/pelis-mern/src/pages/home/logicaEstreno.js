import axios from "axios";

export async function llamaTrailer(setTrailer,IdllaveTrailer){
    const options = {
        method:"GET",
        url:`https://moviesdatabase.p.rapidapi.com/titles/${IdllaveTrailer}`,
        params:{
            info:"trailer",
        },
        headers: {
            'X-RapidAPI-Key': '67f656a5b7mshe2db331fbc1afbap1ac1d4jsn2028ca1c89f4',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    }

    try{
        const data = await axios.request(options)
        let url = data.data.results.trailer+'?autoplay=1&mute=1&loop=1'
        setTrailer(url)
    }catch(err){ console.error(err) }
}

export async function llamaEstrenos(pagina,setEstrenos,colorButton){
    const options = {
        method:"GET",
        url:`https://moviesdatabase.p.rapidapi.com/titles?page=${pagina}`,
        params:{
            info:"base_info",
            list:"top_boxoffice_200",
            genre: colorButton,
            limit:15
        },
        headers: {
            'X-RapidAPI-Key': '67f656a5b7mshe2db331fbc1afbap1ac1d4jsn2028ca1c89f4',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    }

    try{
        const data = await axios.request(options)
        if (pagina > 1){
             setEstrenos(prevEstrenos => [...prevEstrenos, ...data.data.results]) //setEstrenos pasa del estado anterior del useState (prevEstrenos) a un nuevo estado que suma todos los valores del anterior más todos los valores del nuevo (con spread operator!)
        }else{setEstrenos(data.data.results)
        }
    }catch(err){ console.error(err) }
} 