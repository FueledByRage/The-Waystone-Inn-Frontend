import React, { useEffect, useState }from 'react'
import { useNavigate } from 'react-router'
import { useParams, Link } from 'react-router-dom'
import api from '../../services/api'
import { getToken, getSubs, isLogged, setSubs } from '../../storage/utils'
import InfoBox from '../../components/infoBox'
import StyledLink from '../../components/Link/Link'
import Upload from '../../components/Upload'
import { DropContainer } from '../../components/Upload/DropContainer'
import  { PostBox }  from '../../components/PostBox'
import { Container, Main, Aside, Header, Section, StyledForm, StyledInput, PostsContainer, StyledButton } from './style'




export default function Community(props){

    const [ error, setError ] = useState(null)
    const [ errorData, setErrorData ] = useState(null)
    const [ errorPosts, setErrorPosts ] = useState(null)
    const [ data, setData ] = useState({})
    const [ posts, setPosts ] = useState({})
    const [ subscribed, setSub] = useState(false)
    const { id, page } = useParams()
    const token = getToken()
    const  [ title, setTitle ] = useState('')
    const  [ body, setBody ] = useState('')
    const [file, setFile ] = useState(null)
    const [loading, setLoading ] = useState(null)
    const navigate = useNavigate()
    let isLastPage
    let parsePage = parseInt(page)

    useEffect(async ()=>{
        let isCancelled = false
        const subs = getSubs()
        
        if(token) setSub(subs.includes(id))

        await api.get(`/community/${id}/${parsePage}`).then((response)=>{
            
            if(!isCancelled){
                setData(response.data['Community'])
                setPosts(response.data['Posts'])
                isLastPage = response.data['lastPage']
            }

        }).catch((error) => setErrorData(error.response.data.message))
        return () => {
            isCancelled = true
        }
    }, [])

    async function sub(){
        
        api.post('/community/sub',{ token, id }).then((response) => {
            setSubs(response.data.subs)
            setSub(!subscribed)
        }).catch((e)=>{setError(e)})        
    }

    async function handleSubmit(e){

        if(title == '' || body == '') return setError('Post fields cannot be empty!')

        e.preventDefault()
        const formData = new FormData()
        formData.append('title', title)
        formData.append('body', body)
        formData.append('token', token)
        formData.append('id', id)
        formData.append('file', file)

        if(!isLogged()) setError("You must be logged to post something!")
        try {
            const response = await api.post('/post/register', formData).catch((error) =>{ throw error })
            navigate(`/post/${response.data._id}`)
        } catch (error) {
            setError(error.message)
        }
    }

    function getDate(date){
        const newDate = new Date(date)

        return `${newDate.getDay()}/${newDate.getMonth()}/${newDate.getFullYear()}`
    }

    function handleFile(files){ setFile(files[0]) }

    return(
        <div>
            <Header>
                <h1>{data.name}</h1>
                <StyledButton disabled={isLogged()} onClick={sub}>{ subscribed ? 'unsub' : 'sub'}</StyledButton>
           </Header>
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
                    
                    <StyledButton>Post</StyledButton>
                </StyledForm>
                {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
                <PostsContainer>
                    {
                        error ? <h1>{error.message}</h1> : Array.from(posts).map((post)=>(
                            <PostBox>
                                <StyledLink to={`/post/${post._id}`}><span>{post.title}</span></StyledLink>
                                <div className='postBody' >
                                    { !post.url ? <p>{post.body}</p> : <img className='postImg' src={post.url}/>}
                                </div>
                                <div className='footer'>
                                    <span>By {post.authorId.user } </span>
                                    <span> at {getDate(post.date)}</span>
                                </div>
                            </PostBox>
                        )
                        )
                    }
                </PostsContainer>
            </Main>
            <Aside>
                <InfoBox community={data}/>
            </Aside>
        </Container>
        </div>

    )
}