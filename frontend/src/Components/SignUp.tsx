import "../Styles/Login.scss";

interface SignUpProps {
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSignUp: (e: React.FormEvent<HTMLFormElement>) => void;
  setSignUp: (signUp: boolean) => void;
}

export function SignUp(props: SignUpProps) {
  return (
    <>
      <button
        onClick={() => {
          props.setSignUp(false);
        }}
        className="return-button"
      >
        {"<"}
      </button>
      <h3 className="login-title">Sign up</h3>
      <form onSubmit={props.handleSignUp} className="form-container">
        <input
          required
          type="text"
          name="username"
          onChange={(e) => {
            props.handleOnChange(e);
          }}
          placeholder="Username"
          className="form-container__input"
          autoFocus
        />
        <input
          required
          type="email"
          name="email"
          onChange={(e) => {
            props.handleOnChange(e);
          }}
          placeholder="bira@bärs.com"
          className="form-container__input"
        />
        <input
          required
          type="text"
          name="password"
          onChange={(e) => {
            props.handleOnChange(e);
          }}
          placeholder="Password"
          minLength={5}
          className="form-container__input"
        />
        <button className="form-container__button">Sign Up</button>
      </form>
    </>
  );
}
