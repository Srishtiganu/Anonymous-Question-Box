import {React, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './TeachersPage';
import './StudentsPage';

import {Container, Row, Col, Button, Form} from 'react-bootstrap';
import {Navigate, useNavigate} from "react-router-dom";
import TeachersPage from './TeachersPage';
import StudentsPage from './StudentsPage';

// import { useAuth } from "AuthContext";

import {addDoc, doc, onSnapshot, setDoc, collection, getDoc, query, getDocs, where} from "firebase/firestore";
import {db} from './firebase';
// const handleSubmit = async (event) => {
//   event.preventDefault();
//   console.log("Inside handle submit")
//   try {
//     const questionsRef = doc(db, "sessions", sessionId);
//     await updateDoc(questionsRef, {
//       questions: arrayUnion(formQuestion)
//     })
//     // console.log("the question: " + formQuestion);
//     // onClose();
//   } catch (err) {
//     alert(err);
//   }
// }

function Home() {
  let navigate = useNavigate(); //instead of usehistory

  // const [email, setEmail] = useState("");
  //const for teacher
  const [sessionName, setSessionName] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");

  //const for students
  const [sName, setSName] = useState("");
  const [sPass, setSPass] = useState("");
  // const [sId, setSId] = useState("");

  // const auth = useAuth();
  const handleTeacherSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "sessions"), {
        sessName: sessionName,
        sessPassword: password,
        questions: [],
      });
      


      // await addDoc(collection(db, "Questions", docRef.id), {
      //   questions: []
      // })
      console.log("Document written with ID: ", docRef.id);
      setId(docRef.id);
      {navigate(`/teachersPage/${docRef.id}`)}
      // {navigate(`/teachersPage/${docRef.id}`)}
    } catch (err) {
      alert(err);
    } 
  }

  const handleStudentJoin = async (event) => {
    event.preventDefault();
    try {
      const docRef = collection(db, "sessions");
      const q = query(docRef, where("sessName", "==", sName), where("sessPassword", "==", sPass));
      const qSnap = await getDocs(q);
      var sessDocId = null;
      qSnap.forEach((doc) => {
        sessDocId = doc.id;
      })
      if(sessDocId != null) {
        {navigate(`/studentsPage/${sessDocId}`)}
      } else {
        console.log("Session does not exist.")
      }
    } catch(err) {
      alert(err);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Anonymous Question Box</h1>

        <Container className="my-3">
          <Form className="my-3">
            <Row>
              <h3>Teachers</h3>
              <Col md> 
                <Form.Group>
                  <Form.Label>Session Id</Form.Label>
                  <Form.Control onChange={(event) => setSessionName(event.target.value)} placeholder="ex: Mr. Smith's 6th period" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Session Password" />
                </Form.Group>
              </Col>
            </Row>
            <Button onClick={handleTeacherSubmit} className="my-3" variant="primary" type="submit">Create Session</Button>

          </Form>
        </Container>

        {/* <Container className="my-3">
          <Form className="my-3">
            <Row>
              <h3>Teachers</h3>
              <Col md>
                <Form.Group>
                  <Form.Label>Session Id</Form.Label>
                  <Form.Control onChange={(event) => setSessionName(event.target.value)} placeholder="ex: Mr. Smith's 6th period" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Session Password" />
                </Form.Group>
              </Col>
            </Row>
            <Button onClick={handleTeacherSubmit} className="my-3" variant="primary" type="submit">Create Session</Button>

          </Form>
        </Container> */}

        <Container>
          <Form className="my-3">
            <Row>
              <h3>Students</h3>
              <Col md>
                <Form.Group>
                  <Form.Label>Session Id</Form.Label>
                  <Form.Control onChange={(event) => setSName(event.target.value)} placeholder="ex: Mr. Smith's 6th period" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control onChange={(event) => setSPass(event.target.value)} type="password" placeholder="Session Password" />
                </Form.Group>
              </Col>
            </Row>
            <Button onClick={handleStudentJoin} className="my-3" variant="primary" type="submit">Join Session</Button>
          </Form>

        </Container>
      </header>
    </div>
  );
}

export default Home;
