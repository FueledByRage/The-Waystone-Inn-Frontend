import { EditProfile } from "../../pages/EditProfile/editProfile";
import { ModalBox } from "./styled-components";


export default function Modal({ show, close, children }){
    
    if(!show) return(<></>);
    return(
        <ModalBox>
            <>
                <button onClick={close} className="close-button"> X </button>
                {children}
            </>
        </ModalBox>
    );
}