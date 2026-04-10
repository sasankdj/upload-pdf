export default function Login() {

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <button onClick={handleLogin}>
         Login with Google
      </button>
    </div>
  );
}