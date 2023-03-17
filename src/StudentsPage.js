import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import {useState} from 'react';
import {Container, Row, Col, Button, Form} from 'react-bootstrap'
import {useNavigate, useParams} from "react-router-dom";

//firebase stuff
import {db} from './firebase';
import { doc, collection, addDoc, setDoc, arrayUnion, updateDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';

// {onClose, open}
function StudentsPage() {
  const navigate = useNavigate();

  // let {sessionName, sessionPass} = useParams();
  // let sessionName = "Srishti's period 6 class";
  // let sessionPass = "englishRocks!"
  const {id} = useParams();
  let sessionId = id;

  const [newQuestion, setNewQuestion] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("Inside handle submit")
    try {
      //the sessions collection
      const questionsRef = doc(db, "sessions", sessionId);
      await updateDoc(questionsRef, {
        questions: arrayUnion(newQuestion)
      })
      //the Questions collection
      const qRef = doc(db, "Questions", sessionId);
      await updateDoc(qRef, {
        questions: arrayUnion(newQuestion)
      })
      // console.log("the question: " + formQuestion);
      // onClose();
    } catch (err) {
      alert(err);
    }
    // console.log("hello world");
    
  }

  return (
    <div>
      <header className="App">
        <h1 className="NavHeading"><a onClick={() => {navigate("/")}}>Anonymous Question Box</a></h1>
      </header>
      <Container>
          
          <Form className="my-3">
              <h3>Students</h3>
                <Form.Group>
                  <Form.Label for="inputlg">Enter Question: </Form.Label>
                  <Form.Control onChange={(event) => setNewQuestion(event.target.value)} name='formQuestion'  id="inputlg" type="text" placeholder="Enter Anonymous Question" />
                  <Form.Text className="text-muted">
                    Remember to ask serious questions only.
                  </Form.Text>
                </Form.Group>
            <Button onClick={handleSubmit} className="my-3" variant="primary" type="submit">Submit</Button> 
          </Form> 
        </Container>
        
    </div>
  );
}

export default StudentsPage;

