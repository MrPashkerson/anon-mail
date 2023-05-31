import React, {FC, useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Container, Row, Col, Toast, Alert, Accordion} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {observer} from "mobx-react-lite";
import {IToastMessage} from "../models/IToastMessage";
import {TextField, Button, Autocomplete} from "@mui/material";
import UserService from "../services/UserService";
import ScrollToTop from './ScrollToTop';
import { useUsers } from '../hooks/useUsers';
import { useMessages } from '../hooks/useMessages';
import '../css/AccordioBlinkingItem.css';

const MainPage: FC = () => {
    const {store} = useContext(Context);
    const {users, setUsers} = useUsers();
    const {messages, setMessages} = useMessages();
    const [recipient, setRecipient] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [toastMessages, setToastMessages] = useState<IToastMessage[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [blinkingMessages, setBlinkingMessages] = useState<string[]>([]);

    useEffect(() => {
        subscribe()
    }, [])

    const subscribe = async () => {
        try {
            const responseNewMessage = await UserService.getNewMessage(store.user.username);
            setMessages(prev => [...prev, responseNewMessage.data]);
            setBlinkingMessages(prev => [...prev, responseNewMessage.data._id]);
            await subscribe();
        } catch (e) {
            setTimeout(() => {
                subscribe()
            }, 500)
        }
    }

    const closeToast = (id: number) => {
        setToastMessages(prev => prev.filter(msg => msg.id !== id));
    }

    const handleAccordionClick = (messageId: string) => {
        setBlinkingMessages(prev => prev.filter(id => id !== messageId));
    }

    const handleSendButton = async () => {
        try {
            if (!recipient) {
                setError('Enter recipient');
                return;
            }
            let finalTitle = title.trim().length === 0 ? 'Without title' : title;
            let finalBody = body.trim().length === 0 ? 'Empty message' : body;

            const response = await UserService.sendMessage(store.user.username, recipient, finalTitle, finalBody);
            if (response.status === 200) {
                setToastMessages(prev => [...prev, {id: Date.now(), message: "Message sent successfully!"}]);
                setRecipient('');
                setTitle('');
                setBody('');
                setError('');
            } else {
                setToastMessages(prev => [...prev, {id: Date.now(), message: response.message || 'Message sending failed!'}]);
            }
        } catch (e) {
            // @ts-ignore
            setError(e);
            setToastMessages(prev => [...prev, {id: Date.now(), message: 'Message sending failed!'}]);
        }
    }

    return (
        <Container>
            <div className="w-100" style={{ minWidth: "445px" }}>
                <hr />
                <Row className="mb-3 align-items-center">
                    <Col>
                        <h1 className="mb-0">AnonMail</h1>
                    </Col>
                    <Col className="text-end col-8">
                        <p className="mb-0"><strong>Logged as: </strong>{store.user.username}</p>
                    </Col>
                    <Col className="text-end">
                            <Button variant="outlined" color="primary" onClick={() => store.logout()}>Log out</Button>
                    </Col>
                </Row>
                <hr />
                <Row className="mb-3 align-items-center">
                    <Row className="text-center">
                        <Col>
                            <h2>Write:</h2>
                        </Col>
                    </Row>
                    <Row bg="light" variant="light" className="mb-3 justify-content-center">
                        <Col xs={6} className="d-flex flex-column"
                             style={{border: '1px solid #ced4da', borderRadius: '5px', padding: '10px'}}
                        >
                            <Autocomplete
                                className="mb-2 m-auto"
                                id="combo-box-demo"
                                options={users}
                                freeSolo
                                getOptionLabel={(option) => typeof option === 'string' ? option : option.username}
                                sx={{ width: 400 }}
                                renderInput={(params) => <TextField {...params} label="Recipient" variant="outlined" />}
                                value={users.find(user => user.username === recipient) || recipient}
                                onInputChange={(event, newInputValue) => {
                                    setRecipient(newInputValue);
                                }}
                                onChange={(event, newValue) => {
                                    if (typeof newValue !== 'string' && newValue !== null) {
                                        setRecipient(newValue.username);
                                    }
                                }}
                            />
                            <TextField className="mb-2" name="title" label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <TextField
                                className="mb-2"
                                name="body"
                                label="Message Body"
                                multiline
                                rows={4}
                                variant="outlined"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            />
                            {error && <Alert variant='danger'>{error}</Alert>}
                            <Button variant="contained" color="primary" onClick={handleSendButton}>Send</Button>
                        </Col>
                    </Row>
                </Row>
                <hr />
                <Row className="mb-2">
                    <Col>
                        <h2>Messages:</h2>
                    </Col>
                </Row>
                <Row>
                    {[...messages].reverse().map((message) => (
                        <Accordion
                            key={message._id}
                            className={`mb-2 ${blinkingMessages.includes(message._id) ? 'blinking' : ''}`}
                            onClick={() => handleAccordionClick(message._id)}
                        >
                            <Accordion.Item eventKey={message._id}>
                                <Accordion.Header>
                                    <p className="mb-0">
                                        <strong>Sent at: </strong>{new Date(message.createdAt).toLocaleString()} | <strong>From: </strong>{message.sender} | <strong> Title: </strong> {message.title}
                                    </p>
                                </Accordion.Header>
                                <Accordion.Body>{message.body}</Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    ))}
                </Row>

                {toastMessages.map(toast => (
                    <div key={toast.id} style={{position: 'fixed', top: 20, right: 20}}>
                        <Toast onClose={() => closeToast(toast.id)} delay={3000} autohide>
                            <Toast.Header>
                                <strong className="mr-auto">Notification</strong>
                            </Toast.Header>
                            <Toast.Body>{toast.message}</Toast.Body>
                        </Toast>
                    </div>
                ))}
            </div>
            <ScrollToTop />
        </Container>
    );
};

export default observer(MainPage);