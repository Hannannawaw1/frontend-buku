//import hook useState from react
import { useState } from "react";

//import component Bootstrap React
import { Card, Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

//import axios
import axios from "axios";

//import hook history dari react router dom
import { useHistory } from "react-router-dom";

function CreatePost() {
  //state
  const [nama, setNama] = useState("");
  const [judulbuku, setJudulbuku] = useState("");

  //state validation
  const [validation, setValidation] = useState({});

  //history
  const history = useHistory();

  //method "storePost"
  const storePost = async (e) => {
    e.preventDefault();

    //send data to server
    await axios
      .post("http://localhost:3000/api/posts/store", {
        nama: nama,
        judulbuku: judulbuku,
      })
      .then(() => {
        //redirect
        history.push("/posts");
      })
      .catch((error) => {
        //assign validation on state
        setValidation(error.response.data);
      });
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md="{12}">
          <Card className="border-0 rounded shadow-sm">
            <Card.Body>
              {validation.errors && (
                <Alert variant="danger">
                  <ul class="mt-0 mb-0">
                    {validation.errors.map((error, index) => (
                      <li key={index}>{`${error.param} : ${error.msg}`}</li>
                    ))}
                  </ul>
                </Alert>
              )}

              <Form onSubmit={storePost}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control type="text" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Masukkan Nama" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Judul Buku</Form.Label>
                  <Form.Control as="textarea" rows={3} value={judulbuku} onChange={(e) => setJudulbuku(e.target.value)} placeholder="Masukkan Judul Buku" />
                </Form.Group>

                <Button variant="primary" type="submit">
                  SIMPAN
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CreatePost;
