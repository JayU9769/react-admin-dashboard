/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";
import {LOGIN_API} from "../../config/URLConstant";
import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import {displayErrorMessage, displayMessage, setSessionData} from "../../config/helper";

const Login = () => {

  const history = useHistory();
  const [formLoader, setFormLoader] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const setInputVal = name => {
    return ({target: {value}}) => {
      setFormData(oldValues => ({...oldValues, [name]: value}));
    }
  };

  function handleLoginForm(event) {
    event.preventDefault();
    setFormLoader(true);
    axios.post(LOGIN_API, formData)
      .then((response) => {
        setFormLoader(false);
        setSessionData(response.data.data);
        displayMessage(response.data.message);
        history.push('/admin/index')
      })
      .catch(error => {
        setFormLoader(false);
        console.log(error.response);
        if (error.response !== undefined) {
          displayErrorMessage(error.response.data.message || "Internal server error")
        } else {
          displayErrorMessage("Internal server error")
        }
      });
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent">
            <div className="btn-wrapper text-center">
              <h1>Login</h1>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={handleLoginForm}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83"/>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={formData.email}
                    onChange={setInputVal("email")}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open"/>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={setInputVal("password")}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                {!formLoader ? (
                  <Button className="my-4" color="primary" type="submit" block>
                    <i className={"fa fa-sign-in-alt"}/> Sign in
                  </Button>
                ) : (
                  <Button className="my-4" color="primary" type="button" block disabled>
                    <i className={"fa fa-sync-alt fa-spin"}/> Loading
                  </Button>
                )}
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
