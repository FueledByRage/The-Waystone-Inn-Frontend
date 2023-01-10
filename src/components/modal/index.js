import { useEffect, useRef } from "react";
import { EditProfile } from "../../pages/EditProfile/editProfile";
import { ModalBox } from "./styled-components";


export default function Modal({ show, close, children }){
    
    const ref = useRef();

    useEffect(()=>{
        document.body.addEventListener('click', closeModal);
    },[]);

    const closeModal = event =>{
        event.stopPropagation();
        const contain = ref.current == event.target;

        if(contain) {
            close();
            document.body.removeEventListener("click", closeModal);
        }
    }

    return(
        <ModalBox ref={ref} >
            { children }
        </ModalBox>
    );
}