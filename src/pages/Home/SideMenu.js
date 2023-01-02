import React, { useState } from 'react'
import { Aside, BoxAside, BoxItem, Container, Main, StyledLink } from "./components";

export default function SideMenu( props ) {

    const [ loading, setLoading ] = useState(true);


  return (
    <>
          <Aside>
                {
                    <BoxAside>
                        <h4>Communities</h4>
                            <BoxItem>Lorem</BoxItem>
                            <BoxItem>Lorem</BoxItem>
                            <BoxItem>Lorem</BoxItem>
                            {   /*!error ?
                                data.map(community => (
                                <BoxItem> <div className='icon'><FiArrowRight /></div> <StyledLink to={`/community/${community._id}/1`}><h3> {community.name}</h3> </StyledLink>  </BoxItem>
                                )) : <h2>{error}</h2>*/ 
                            }
                        </BoxAside> 
                }
                <BoxAside>
                    <h4>
                        Yout lasts posts
                    </h4>
                    <BoxItem>Lorem</BoxItem>
                    <BoxItem>Lorem</BoxItem>
                    <BoxItem>Lorem</BoxItem>
                </BoxAside>
                <BoxAside>
                    <h4>
                        Lorem
                    </h4>
                    <BoxItem>Lorem</BoxItem>
                    <BoxItem>Lorem</BoxItem>
                    <BoxItem>Lorem</BoxItem>
                </BoxAside>
            </Aside>    
    </>
  )
}
