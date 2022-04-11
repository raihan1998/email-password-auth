import "./App.css";
import app from "./firebase.init";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [success, setSuccess] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleNameBlur = (event) => {
    setName(event.target.value);
  };

  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordBlur = (event) => {
    setPassword(event.target.value);
  };

  const handleRegisteredChange = (event) => {
    setRegistered(event.target.checked);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      // event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError("Password should contain al least one special character");
      return;
    }

    setValidated(true);
    setError("");
    setSuccess("");

    if (registered) {
      console.log(email, password);
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          setSuccess("Login Success");
        })
        .catch((error) => {
          console.error(error);
          setError(error.massage);
          setError(" not success login");
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          setEmail("");
          setPassword("");
          verifyEmail();
          setUserName();
        })
        .catch((error) => {
          console.error(error);
          setError(error.message);
        });
    }

    event.preventDefault();
  };

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email).then(() => {
      console.log("Email Sent");
    });
  };

  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        console.log("Updating name");
      })
      .catch(() => {
        setError(error.message);
      });
  };

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then((result) => {
      console.log(result, "Email Verification Sent");
    });
  };

  return (
    <div>
      <div className="registration w-50 mx-auto mt-5 border border-3 rounded p-4 shadow shadow-3">
        {/* ternary operator used */}
        <h2 className="text-primary text-center">
          Please {registered ? "Login" : "Register"}!!
        </h2>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          {/* your name added */}
          {!registered && (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                onBlur={handleNameBlur}
                type="text"
                placeholder="Enter Your Name"
                required
              />
              {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
              <Form.Control.Feedback type="invalid">
                Please provide your name.
              </Form.Control.Feedback>
            </Form.Group>
          )}
          
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={handleEmailBlur}
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={handlePasswordBlur}
              type="password"
              placeholder="Password"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              onChange={handleRegisteredChange}
              type="checkbox"
              label="Already Registered"
            />
          </Form.Group>
          <p className="text-success">{success}</p>
          <p className="text-danger">{error}</p>
          <Button onClick={handlePasswordReset} variant="link">
            Forget Password?
          </Button>
          <br /> <br />
          <Button variant="primary" type="submit">
            {/* ternary operator used */}
            {registered ? "Log In" : "Register"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
