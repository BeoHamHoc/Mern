import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/form";
import { Link } from "react-router-dom";
const RegisterForm = () =>{
    return (
        <>
          <Form className="my-4">
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
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="Confirm Password"
                required
              />
            </Form.Group>
            <br/>
            <Button varient="success" type="submit">
              Register
            </Button>
          </Form>
          <p>Already have an account
          <Link to="/login">
            <Button variant="info" size="sm" className="ml-2">
              Login
            </Button>
          </Link>
          </p>
        </>
      );
    
}
export default RegisterForm