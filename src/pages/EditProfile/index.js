import Modal from "../../components/modal";
import { EditProfile } from "./editProfile";


export default function ModalEdit( props ){
    return(
        <Modal show={props.show} close={props.close}>
            <EditProfile profileURL={props.profileURL} />
        </Modal>
    )
}