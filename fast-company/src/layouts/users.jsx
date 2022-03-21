import React from "react";
import { useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import EditUserPage from "../components/page/editUserPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UsersLoader from "../components/ui/hoc/usersLoader";
// import { useAuth } from "../hooks/useAuth";
import UserProvider from "../hooks/useUsers";
import { getCurrentUserId } from "../store/users";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    // const { currentUser } = useAuth();
    const currentUserId = useSelector(getCurrentUserId());
    // const dataStatus = useSelector(getDataStatus());
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     if (!dataStatus) {
    //         dispatch(loadUsersList());
    //     }
    // }, []);
    // if (!dataStatus) return "Loading";
    return (
        <>
            <UsersLoader>
                <UserProvider>
                    {userId ? (
                        edit ? (
                            userId === currentUserId ? (
                                <EditUserPage />
                            ) : (
                                <Redirect to={`/users/${currentUserId}/edit`} />
                            )
                        ) : (
                            <UserPage userId={userId} />
                        )
                    ) : (
                        <UsersListPage />
                    )}
                </UserProvider>
            </UsersLoader>
        </>
    );
};

export default Users;
