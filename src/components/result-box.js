import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ResultBox(props) {
  const [speaking, setSpeaking] = useState(false);
  const msg = new SpeechSynthesisUtterance();
  const speak = () => {
    setSpeaking(true);
    msg.text = props.data;
    window.speechSynthesis.speak(msg);
    setTimeout(() => {
      setSpeaking(false);
    }, props.data.split(" ").length * 270);
  };

  useEffect(() => {
    window.speechSynthesis.addEventListener("end", (event) => {
      setSpeaking(false);
    });
    return () => {
      window.removeEventListener("finish", setSpeaking(false));
    };
  }, [setSpeaking]);

  const cleanData = () => {
    if (props.data.match(/^.*((unknown)|(problem)|(error)).*$/gm)) {
      return ["Please try a new query"];
    }
    const reg = /(?<=[X|Y] = )(.*?)(?=<)/gm;

    return Array.from(props.data?.match(reg) ?? []);
  };

  return (
    <Form className="p-3">
      <h4 className="font-monospace ">Answer</h4>

      <div className="overflow-auto" style={{ height: "50vh" }}>
        {cleanData().map((x) => (
          <p className="text-capitalize">{x}</p>
        ))}
      </div>
      <Button variant="info" className="m-2 float-end" onClick={() => speak()}>
        <FontAwesomeIcon
          className={speaking ? "speaking" : ""}
          icon={faVolumeHigh}
        />
      </Button>
    </Form>
  );
}

export default ResultBox;