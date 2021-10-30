import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import api from "../../services/api";
import { Search } from "./styled";


export default function SearchBar(){

    const [ word, setWord ] = useState('')
    const [ data, setData] = useState([])

    async function handleSearch(event){
        const searchParam = event.target.value
        setWord(searchParam)
        if(searchParam === '') {
            setData([])
            return
        }
        const response = await api.post('/communities/filter', {name: searchParam})


        setData(response.data.communities)
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
                data.length != 0 && (
                    <div className="dataResult">
                        {
                            data.slice(0, 3).map((community)=>{
                                return(
                            
                                    <div className="dataIten">
                                        <p>
                                            {community.name}
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </Search>
    )
}