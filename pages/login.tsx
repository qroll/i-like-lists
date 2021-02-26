import { ChangeEvent, FormEvent, useState } from "react";
import { Container } from "../components/Layout";
import ClientNetwork from "../utils/ClientNetwork";

export default function LoginPage(): JSX.Element {
  const [username, setUsername] = useState("");
  const [loginError, setError] = useState(null);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const postForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await ClientNetwork.post(
        "/api/login",
        { username },
        { requestOptions: { full: true } }
      );
      window.location.href = res.url;
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Container>
      <form onSubmit={postForm}>
        <input type="text" name="username" value={username} onChange={handleUsernameChange} />
        <button>Login</button>
      </form>
      <div>{loginError ? "an error occured" : null}</div>
    </Container>
  );
}
