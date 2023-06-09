import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import { convertInformalQueryAnswerSets } from "./approximate-match";
import CodeForm from "./components/code-form";
import ResultBox from "./components/result-box";
import SearchBox from "./components/search-box";
import { EDITOR_TEXT } from "./editor";
import { TERMS } from "./terms";
const END_POINT = "https://someerfanapp.azurewebsites.net/api/v1/wave";

function App() {
  const [data, setData] = useState("");

  const [editor, setEditor] = useState(EDITOR_TEXT);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem("code-sparc");
    if (v) {
      setEditor(v);
    }
  }, []);

  const searchBtnClick = (q) => {
    setLoading(true);
    const formalQuery = convertInformalQueryAnswerSets(q, TERMS);

    // Replace 'q' with 'formalQuery' in the fetch request
    fetch(END_POINT, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "getQuery",
        query: formalQuery,
        editor: editor,
      }),
      method: "POST",
    })
      .then((response) => {
        if (!response.ok) {
          return response
            .json()
            .catch(() => {
              // Couldn't parse the JSON
              throw new Error(response.status);
            })
            .then(({ message }) => {
              // Got valid JSON with error response, use it
              throw new Error(message || response.status);
            });
        }
        return response.json();
      })
      .then((data) => {
        setData(data.result);
        setLoading(false);
      })
      .catch((d) => {
        setData(`${d}`);

        setLoading(false);
      });
  };
  return (
    <Container fluid className="p-0 app-page overflow-hidden">
      <Navbar expand="lg" bg="dark" variant="dark">
        <Col className="font-monospace p-4">
          <Row className="justify-content-between">
            <Col xs={0} md={3} className="mb-2">
              <span className="text-bg-danger px-1 pt-1 p-4">Music Agent</span>
            </Col>
            <Col xs={12} md={6}>
              <SearchBox search={searchBtnClick} loading={loading} />
            </Col>
          </Row>
        </Col>
      </Navbar>
      <Row>
        <Col xs={12} md={6}>
          <ResultBox data={data} loading={loading} />
        </Col>
        <Col xs={12} md={6}>
          <CodeForm editor={editor} setEditor={setEditor} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
