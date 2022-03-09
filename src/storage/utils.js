export const getUser = () => {
    const userStr = sessionStorage.getItem('user')

    if(userStr) return userStr
    else return null
}

export const getToken = () => {
    return sessionStorage.getItem('token') || null
}


export const getSubs = () =>{
  return sessionStorage.getItem('subs')  
}

export const setSubs = (subs) =>{
  sessionStorage.setItem('subs', JSON.stringify(subs))
}

export const removeUserSession = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('subs')
}

export const setUserSession = (token, user, subs) => {
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('user', user)
    sessionStorage.setItem('subs', JSON.stringify(subs))
  }

export const isLogged = () => {
  if(!sessionStorage.getItem('token') === null) return true
  else return false
}

