import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { FlexContainer } from "../components/Layout";

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const postForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    const redirectUrl = router.query.redirect;

    try {
      const res = await axios.post(
        "/api/login",
        { username, password },
        {
          maxRedirects: 0,
          params: {
            redirect: redirectUrl,
          },
        }
      );
      window.location.href = res.data.redirectUrl;
    } catch (err) {
      let message = "An error occured";
      if (axios.isAxiosError(err)) {
        if (err.response?.data.errorCode === "ERR_INVALID_CREDENTIALS") {
          message = "Username or password is invalid";
        }
      }
      setErrorMessage(message);
    }
  };

  return (
    <FlexContainer>
      <form onSubmit={postForm}>
        <label>Username</label>
        <input type="text" name="username" value={username} onChange={handleUsernameChange} />
        <label>Password</label>
        <input type="password" name="password" value={password} onChange={handlePasswordChange} />
        <button>Login</button>
      </form>
      <div>{errorMessage}</div>
    </FlexContainer>
  );
}
