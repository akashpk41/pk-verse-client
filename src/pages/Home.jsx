import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function Home() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["todo"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = res.json();
      return data;
    },
  });
  console.log(posts);
  console.log(isLoading);

  if (isLoading) {
    return <p> Loading...🤖🤖👾 </p>;
  }
  return (
    <div>
      Home - Total Posts ({posts?.length})
      <button onClick={() => toast.success("skdkfj")}>Test🔔</button>
    </div>
  );
}
