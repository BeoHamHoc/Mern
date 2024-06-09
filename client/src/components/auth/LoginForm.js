import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/form";
import { Link } from "react-router-dom";
const LoginForm = () => {
  return (
    <>
      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
          />
        </Form.Group>
        <br/>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </Form.Group>
        <br/>
        <Button varient="success" type="submit">
          Login
        </Button>
      </Form>
      <p>Don't have an account
      <Link to="/register">
        <Button variant="info" size="sm" className="ml-2">
          Register
        </Button>
      </Link>
      </p>
    </>
  );
};
export default LoginForm;
