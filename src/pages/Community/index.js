import React, { useEffect, useState }from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { getToken } from '../../storage/utils';
import InfoBox from '../../components/infoBox';
import StyledLink from '../../components/Link/Link';
import Upload from '../../components/Upload';
import { DropContainer } from '../../components/Upload/DropContainer';
import  { PostBody, PostBox, PostFooter }  from '../../components/PostComponets';
import { Container, Main, Aside, Header, StyledForm, StyledInput,
     PostsContainer, StyledButton, ErrorBox } from './style';
import { AlertBox } from '../../components/Alert';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { LikeBox } from '../../components/PostComponets';




export default function Community(props){

    const [ error, setError ] = useState(null)
    const [ errorData, setErrorData ] = useState(null)
    const [ data, setData ] = useState({})
    const [ posts, setPosts ] = useState([])
    const [ subscribed, setSub] = useState(false)
    const { id, page } = useParams()
    const token = getToken()
    const  [ title, setTitle ] = useState('')
    const  [ body, setBody ] = useState('')
    const [file, setFile ] = useState(null)
    const [loading, setLoading ] = useState(null)
    const navigate = useNavigate()
    const [lastPage, setLastPage ] = useState(false)
    let parsePage = parseInt(page)

    useEffect(()=>{
        async function fetchData(){
            try{
                const response = await api.get(`/community/${id}/${parsePage}`)
                .catch((error) =>{
                    throw new Error(error.response.data)
                });
                const { sub, posts, lastPage, Community } =  response.data;

                setSub(sub);
                setData(Community);
                setPosts(posts);
                setLastPage(lastPage);
                setLoading(false);
            }catch(error){
                setErrorData(error.message);
                setLoading(false);
            }
        }
        fetchData();
        
    }, []);

    async function sub(){
        await api.get(`/community/sub/${id}`).catch((e)=>{
            return setError(e.response.data);
        })        
        setSub(!subscribed);
    }

    async function handleSubmit(e){
        e.preventDefault();

        if(title == '' || body == '' ) return setError('Post fields cannot be empty!');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', body);
        formData.append('id', id);
        formData.append('file', file);

        
        if(!token) return setError("You must be logged to post something!");

        try {
            const response = await api.post('/post/register', formData).catch((error) =>{ throw error })
            navigate(`/post/${response.data._id}`);
        } catch (error) {
            setError(error.response);
        }
    }

    function getDate(date){
        const newDate = new Date(date);

        return `${newDate.getDay()}/${newDate.getMonth()}/${newDate.getFullYear()}`
    }

    function handleFile(files){ setFile(files[0]) }

    function handleNavigate(next){
        navigate(`/community/${id}/${next}`);
        window.location.reload();
    }

    if(loading) return(<h1>Loading...</h1>)

    return(
        <div>
            <Header>
                {errorData ? <h1>{errorData}</h1> : <h1>{data.name}</h1>}
                <StyledButton className='button' onClick={sub}>{ subscribed ? 'unsub' : 'sub'}</StyledButton>
            </Header>
           {
            !errorData ?
            
           <Container>

            <Main>
                  <StyledForm onSubmit={handleSubmit}>
                        <StyledInput 
                        type='text'
                        placeholder='Title'
                        onChange = {(e) => setTitle(e.target.value)}
                        />

                        <StyledInput
                        rows='5'
                        placeholder='Body'
                        onChange = { (e)=>setBody(e.target.value)}
                        />
                        
                        {file ? <DropContainer> { file.name } </DropContainer> : <Upload onUpload={handleFile}/>}
                        
                        <StyledButton className='button' >Post</StyledButton>
                    </StyledForm>
                    {error && 
                    <ErrorBox>
                        <AlertBox><span>{error}</span></AlertBox>
                    </ErrorBox>
                    }
                    <PostsContainer>
                        {
                            errorData != null ? <h1>{errorData}</h1> : posts.map((element)=>(
                                <PostBox>
                                    <LikeBox> <FiThumbsUp /> <span>{element.likes || 0}</span> <FiThumbsDown /></LikeBox>

                                    <StyledLink to={`/post/${element._id}`}><span>{element.title}</span></StyledLink>
                                    <PostBody className='postBody' >
                                        { !element.url ? <p>{element.body}</p> : <img className='postImg' src={element.url}/>}
                                    </PostBody>
                                    <PostFooter className='footer'>
                                        <StyledLink to={`/profile/${element.authorId.user}`} > {element.authorId.user } </StyledLink >
                                        <span>  {getDate(element.date)}</span>
                                    </PostFooter>
                                </PostBox>
                            )
                            )
                        }
                    </PostsContainer>
                    <div className='footerButtons' ><button className='button' disabled = { page == '1' } onClick={() => handleNavigate(parseInt(page) - 1)} >Previous</button> <button className='button' disabled = {lastPage} onClick={() => handleNavigate(parseInt(page) + 1)} >Next</button> </div >

            
            </Main>
            
            <Aside>
                <InfoBox community={data}/>
            </Aside>
        </Container> :
        <ErrorBox>
            <AlertBox><span>{errorData}</span></AlertBox>
        </ErrorBox>
        }
        </div>
    )
}