import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import './Styles.css';

import { useState } from 'react';
import {Container, Row, Col, Button, Form} from 'react-bootstrap';
import {useNavigate, useParams} from "react-router-dom";

// import {useParams} from "react-router-dom";
import {doc, collection, Firestore, getDoc, onSnapshot, QuerySnapshot} from "firebase/firestore";
import {db} from './firebase';
import { FirebaseError } from 'firebase/app';
import { getAdditionalUserInfo } from 'firebase/auth';



function TeachersPage() {
  const {id} = useParams();
  // let sessionId = id;
  let sessionId = "pCc1Ilh5p53MvNssmEhV";
  let navigate = useNavigate();



  const [questions, setQuestions] = useState([]);

  const getQuestionDoc = async () => {
    const docRef = doc(db, "Questions", sessionId);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists) {
      setQuestions(docSnap.data().questions);
      // console.log(sessionId);
      // console.log(docSnap.data());
      // console.log(questions);
    }
    getSessionNamePass();
    // debugging, can comment out: 
    // if(questions === null || questions === undefined) 
    //   console.log("questions is null/undefined");
    // console.log(questions);
  }

  useEffect(() => {
    getQuestionDoc();
  }, []);
  
  const [sessionName, setSessionName] = useState("");
  const [sessionPass, setSessionPass] = useState("");

  const getSessionNamePass = async () => {
    const docRef = doc(db, "sessions", sessionId);
    const docSnap = await getDoc(docRef);
    if(docSnap && docSnap.exists) {
      setSessionName(docSnap.data().sessName);
      setSessionPass(docSnap.data().sessPassword);
    }
    
  }

  const [checked, setChecked] = useState([]);

  const handleCheck = (event) => {
    var updatedQuestions = [...checked];
    if(event.target.checked) {
      updatedQuestions = [...checked, event.target.value];
    } else {
      updatedQuestions.splice(checked.indexOf(event.target.value));
    }
    setChecked(updatedQuestions);
  }

  var isChecked = (q) =>
  checked.includes(q) ? "checked-question" : "not-checked-question";
    return (
        <div>
          
          <Container>
            <header>
              <h1 className="NavHeading"><a onClick={() => {navigate("/")}}>Anonymous Question Box</a></h1> 
            </header>
            
            <div >
              <Container>

                <div>
                  <Row>
                    <Col className="float-left">
                      Session: {sessionName}
                      &emsp;Password: {sessionPass}
                    </Col>
                    <Col className="float-right">
                      <Button >End Session</Button>
                    </Col>
                  </Row>
                </div>
                <div>
                  {/* <Button onClick={getQuestionDoc}>Refresh</Button> */}
                </div>
                <div>
                  <Row class="float-left">
                    <h3 >Questions</h3>
                    <Row>
                      <div className="checkList">
                        <div className="list-container">
                          {questions.map((q, index) => (
                            <div key={index}>
                              <input value={q} type="checkbox" onChange={handleCheck} />
                              <span className={isChecked(q)}>{q}</span>
                            </div>
                          ))}
                          {/* for testing: 
                          <li>{questions}</li> */}
                        </div>
                      </div>
                    </Row>
                  </Row>
                </div>
              </Container>
            </div>
          </Container>
          
        </div>

        
    );
}

export default TeachersPage;