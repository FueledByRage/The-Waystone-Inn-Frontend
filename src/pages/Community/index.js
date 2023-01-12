import React, { useEffect, useState }from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import InfoBox from '../../components/infoBox';
import { Container, Main, Aside, Header, StyledButton, ErrorBox } from './components';
import { AlertBox } from '../../components/Alert';
import Posts from './posts';
import FormPost from './formPost';




export default function Community(props){

    const [ error, setError ] = useState(null)
    const [ errorData, setErrorData ] = useState(null)
    const [ data, setData ] = useState({})
    const [ subscribed, setSub] = useState(false)
    const { id } = useParams()
    const [loading, setLoading ] = useState(true)

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const response = await api.get(`/community/read/${id}`)
                .catch((error) =>{
                    throw new Error(error.response.data)
                });

                if(response.data){
                    console.log(response.data);
                    setData(response.data);
                    setLoading(false);
                    setSub(response.data.sub);  
                }
                
            }catch(error){
                setErrorData(error.message);
                setLoading(false);
            }
        }
        fetchData();
        
    }, []);

    async function sub(){
        try {
            if( !subscribed ){
                await api.get(`/sub/${id}`);      
            }
            await api.delete(`/sub/delete/${id}`);
            setSub(!subscribed);
        } catch (error) {
            setError('Error handling you subscribe request');
        }
    }

    if(loading) return(<h1>Loading...</h1>)
    return(
        <>
            <Header>
                { errorData ? <h1>{errorData}</h1> : <h1>{data.community.name}</h1> }
                <StyledButton className='button' onClick={sub}> 
                    { subscribed ? 'unsub' : 'sub'}
                </StyledButton>
            </Header>
           {
            !errorData ?
            
            <Container>
                <Main>
                    <FormPost />
                    {
                        error && 
                            <ErrorBox>
                                <AlertBox><span>{error}</span></AlertBox>
                            </ErrorBox>
                    }
                    <Posts register={3}/>
                </Main>
                
                <Aside>
                    {
                        !loading && <InfoBox communityId={data.community._id}/>
                    }
                </Aside>
                
            </Container> :
            <ErrorBox>
                <AlertBox><span>{errorData}</span></AlertBox>
            </ErrorBox>
        }
        </>
    )
}