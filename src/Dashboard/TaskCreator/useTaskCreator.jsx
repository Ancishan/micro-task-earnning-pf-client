import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/UseAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";



const useTaskCreator = () => {
    const { user, loading } = useAuth();
    // const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { data: isTaskCreator, isPending: isTaskCreatorLoading } = useQuery({
        queryKey: [user?.email, 'isTaskCreator'],
        enabled: !loading,
        queryFn: async () => {
            console.log('asking or checking is taskcreator', user)
            const res = await axiosPublic.get(`/users/taskcreator/${user.email}`);
            // console.log(res.data);
            return res.data?.taskcreator;
        }
    })
    return [isTaskCreator, isTaskCreatorLoading]
};

export default useTaskCreator;