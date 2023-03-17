import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import './Styles.css';

import { useState } from 'react';
import {Container, Row, Col, Button, Form} from 'react-bootstrap';
import {useNavigate, useParams} from "react-router-dom";

// import {useParams} from "react-router-dom";
import {doc, collection, Firestore, getDoc, onSnapshot, QuerySnapshot} from "firebase/firestore";
import {db} from './firebase';

function TeacherSignUp() {
  return (
    //create a teacher account w/ authentication
    //teacher's page will change to like a main menu where they can create a new session, access data from old sessions. 
    //current teachersPage will become TeacherSessionPage

    <div>
      <header className="App">
        <h1 className="NavHeading"><a onClick={() => {navigate("/")}}>Anonymous Question Box</a></h1>
      </header>
      <Container>
      <Container className="my-3">
          <Form className="my-3">
            <Row>
              <h3>Create a New Account!</h3>
              <Col md>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control onChange={(event) => setSessionName(event.target.value)} placeholder="ex: Mr. Smith's 6th period" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Session Password" />
                </Form.Group>
                <Form.Text className="text-muted">
                    Already have an account? <a onClick={() => {navigate("/")}}>Click here to log in!</a>
                </Form.Text>
              </Col>
            </Row>
            <Button onClick={handleTeacherSubmit} className="my-3" variant="primary" type="submit">Create Session</Button>

          </Form>
        </Container>
      </Container>
    </div>
  );
}