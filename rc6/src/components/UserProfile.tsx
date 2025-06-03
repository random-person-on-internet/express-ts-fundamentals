import { useDesignHubStore } from "../store";

export function UserProfile() {
  const user = useDesignHubStore((s) => s.user);
  const setUser = useDesignHubStore((s) => s.setUser);
  const clearUser = useDesignHubStore((s) => s.clearUser);

  return (
    <div>
      {!user ? (
        <button onClick={() => setUser({ id: "u1", name: "Ved" })}>
          Login
        </button>
      ) : (
        <>
          <p>Welcome, {user.name}</p>
          <button onClick={clearUser}>Logout</button>
        </>
      )}
    </div>
  );
}
