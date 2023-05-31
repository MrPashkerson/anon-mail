import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {Form, Button, Container, Row, Col, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {observer} from "mobx-react-lite";

const LoginForm: FC = () => {
    const [username, setUsername] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const {store} = useContext(Context);

    async function handleLogin() {
        try {
            await store.login(username);
        } catch (e) {
            // @ts-ignore
            setError(e);
        }
    }

    return (
        <Container className="d-flex align-items-center justify-content-center vh-100">
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Row>
                    <Col>
                        <h2 className="text-center mb-4">Login</h2>
                        <Form  className="mb-2">
                            <Form.Group controlId="formBasicEmail" className="mb-3">
                                <Form.Control
                                    onChange={e => setUsername(e.target.value)}
                                    value={username}
                                    type="text"
                                    placeholder='username'
                                />
                            </Form.Group>
                            {error && <Alert variant='danger'>{error}</Alert>}
                            <Button variant="primary" onClick={handleLogin} className="w-100">Log in</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default observer(LoginForm);