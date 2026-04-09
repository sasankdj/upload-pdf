export default function Login() {

  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <button onClick={handleLogin}>
        🔐 Login with Google
      </button>
    </div>
  );
}