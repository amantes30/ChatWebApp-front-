import axios from "axios";
import "../login.css";
import InputField from "../Components/InputField";

export function LoginPage() {
  return (
    <>
      <h1>Login</h1>
      <form
        id="login-form"
        onSubmit={(event) => {
          handleLogin(event);
        }}
        method="POST"
      >
        <fieldset>
          <InputField id={"username"} label={"Username"} type={"text"} />
          <button type="submit" id="login-btn">
            OK
          </button>
        </fieldset>
      </form>
    </>
  );
}
function handleLogin(event) {
  event.preventDefault();
  const form = event.target;
  const loginBtn = form.querySelector("#login-btn");
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  loginBtn.disabled = true;
  loginBtn.textContent = "Logging in...";

  // authentication
  // REMOVE OR UPDATE AUTHENTICATION BASED ON YOUR BACKEND
  axios
    .post(`${process.env.REACT_APP_SERVER_URL}/login`, {
      username: data.username,
    })
    .then((response) => {
      if (response.data.success) {
        window.localStorage.setItem("username", data.username);
        // Redirect to the chat page
        window.location.href = "/chat";
      } else {
        alert("Invalid username");
        loginBtn.disabled = false;
        loginBtn.textContent = "Login";
        form.reset();
      }
    }).catch((error) => {
      alert("Backend Server is currently in down");
  })
}
