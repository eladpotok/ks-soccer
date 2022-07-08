import { useParams } from "react-router-dom";
import UserEditorWrapper from "../Components/User/UserEditorWrapper";

function FillDetails() {

    const params = useParams();

    return (
        <>
            <UserEditorWrapper userId={params.userId}/>
        </>
    )
}

export default FillDetails;