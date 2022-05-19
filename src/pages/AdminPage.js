import { Navigate } from "react-router-dom";
import AddTournament from "../Components/Admin/AddTournament";
import AdminPanel from "../Components/Admin/AdminPanel";
import AdminWrapper, { UserWrapper } from "../Components/UI/AdminWrapper";

function AdminPage() {
    return (
        <>
            <AdminWrapper>
                <AdminPanel />
            </AdminWrapper>
        </>
    )
}

export default AdminPage;