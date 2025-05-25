import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function GetData(url, key) {
  return useQuery({
    queryKey: [...key],
    queryFn: async () => {
      const res = await axios.get(url);
      return await res.data;
    },
  });
}


export default function useGetData(props){
    return GetData(props.url,props.key);
}