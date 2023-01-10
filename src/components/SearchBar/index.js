import React, { useEffect, useRef, useState } from "react";
import api from "../../services/api";
import { DataResult, Search } from "./styled";


export default function SearchBar(){

    const [ word, setWord ] = useState('');
    const [ data, setData] = useState([]);
    const ref = useRef();

    
    async function handleSearch(event){
        document.body.addEventListener('click', handleClick);
        const searchParam = event.target.value
        setWord(searchParam)
        if(searchParam === '') {
            setData([])
            return
        }
        const response = await api.get(`communities/${searchParam}`, {name: searchParam})


        setData(response.data)
    }

    const handleClick = (event) =>{
        event.stopPropagation();

        if(event.target == ref) return

        setWord('');
        setData([]);
        document.body.removeEventListener('click', handleClick);
    }

    return(
        <Search>
            <input 
                type='field'
                placeholder='Search for a community'
                value={word}
                onChange={handleSearch}
            />
            {
                (data && data.length != 0) && (
                    <DataResult className="dataResult">
                        {
                            data.slice(0, 3).map((community, index)=>{
                                return(
                            
                                    <a ref={ref} key={index} href={`/community/${community._id}/1`}>
                                        <div className="dataIten">
                                            <p>
                                                { community.name }
                                            </p>
                                         </div>
                                    </a>
                                )
                            })
                        }
                    </DataResult>
                )
            }
        </Search>
    )
}