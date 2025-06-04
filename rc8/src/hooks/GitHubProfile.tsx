import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

type GitHubUser = {
  login: string;
  name: string;
  public_repos: number;
  created_at: string;
  avatar_url: string;
  repos_url: string;
  html_url: string;
};

const fetchUser = async (username: string): Promise<GitHubUser> => {
  const res = await fetch(`https://api.github.com/users/${username}`);
  if (!res.ok) throw new Error(`User not found`);
  return res.json();
};

type Props = {
  username: string;
};

const GitHubProfile: React.FC<Props> = ({ username }) => {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery<GitHubUser, Error>({
    queryKey: ["user", username],
    queryFn: () => fetchUser(username),
    staleTime: 1000 * 60 * 0.25, // 0.25 mins
    cacheTime: 1000 * 60 * 0.3, // 3 min
  });

  //   just stimulate expensive computation
  const accountAgeInDays = useMemo(() => {
    if (!user) return 0;
    const createdDate = new Date(user.created_at);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdDate.getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }, [user]);

  const handleInvalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["user", username] });
  };

  if (isLoading) return <p>Loading profile...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;
  if (!user) return null;

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <img
        src={user?.avatar_url}
        alt={`${user?.login}'s avatar`}
        width={100}
        style={{ borderRadius: "50%" }}
      />
      <h2>
        <a href={user?.html_url} target="_blank" rel="noopener noreferrer">
          {user?.name || user?.login}
        </a>
      </h2>
      <p>Public Repos: {user?.public_repos}</p>
      <p>Account Age: {accountAgeInDays} days</p>
      <button onClick={handleInvalidate} disabled={isFetching}>
        {isFetching ? "Refreshing..." : "Invalidate Cache"}
      </button>
    </div>
  );
};

export default GitHubProfile;
