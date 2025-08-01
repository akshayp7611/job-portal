import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJob = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withCredentials: true,
        });
        console.log(res.data);
        if (res.data.success) {
        
          dispatch(setAllAppliedJobs(res.data.application));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAppliedJob();
  },[])
};
export default useGetAppliedJobs;
