import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { FlexContainer } from "../components/Layout";

export default function RegisterPage(): JSX.Element {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const postForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      const res = await axios.post(
        "/api/register",
        { username, email, password },
        { maxRedirects: 0 }
      );
      window.location.href = res.request.responseURL;
    } catch (err) {
      let message = "An error occured";
      if (axios.isAxiosError(err)) {
        if (err.response?.data.errorCode === "ERR_USERNAME_EXISTS") {
          message = "Username already exists";
        }
        if (err.response?.data.errorCode === "ERR_INVALID_PARAMS") {
          message = "Verify your entered details";
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
        <label>Email address</label>
        <input type="text" name="email" value={email} onChange={handleEmailChange} />
        <label>Password</label>
        <input type="password" name="password" value={password} onChange={handlePasswordChange} />
        <label>Confirm password</label>
        <input
          type="password"
          name="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <button>Register</button>
      </form>
      <div>{errorMessage}</div>
    </FlexContainer>
  );
}
