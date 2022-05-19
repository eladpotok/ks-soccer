import { useContext } from "react";
import { UserContext } from "../../Store/UserContext";
import { checkIsAdmin } from "../../Utils/commonUtils";

function AdminWrapper(props) {

    const userContext = useContext(UserContext);
    return (
        <>
            {checkIsAdmin(userContext.user.isAdmin)  ? props.children : <></>}
        </>
    );
}

export function UserWrapper(props) {

    const userContext = useContext(UserContext);
    return (
        <>
            {!checkIsAdmin(userContext.user.isAdmin) ? props.children : <></>}
        </>
    );
}

export default AdminWrapper;