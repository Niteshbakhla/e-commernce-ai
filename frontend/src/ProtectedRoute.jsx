import toast from "react-hot-toast";
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
            const { isLogin } = useSelector(state => state.user);
            if (!isLogin) {
                        toast.success("login first ")
                        return <Navigate to="/" replace />
            }
            return children;
}

export default ProtectedRoute;