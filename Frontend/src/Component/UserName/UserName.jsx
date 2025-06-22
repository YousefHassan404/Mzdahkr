import useGetData from "../../Utils/Hooks/useGetData";

export default function UserName  ({ id })  {
  const {
    data: user,
    isLoading,
    isError,
  } = useGetData({
    url: `http://localhost:5000/api/users/${id}`,
    key: ["user", id],
  });

  if (isLoading) return <span className="text-gray-400">جاري التحميل...</span>;
  if (isError || !user) return <span className="text-red-500">خطأ في التحميل</span>;

  return <span>{user.name}-{user.NN.slice(-5)}</span>;
};
