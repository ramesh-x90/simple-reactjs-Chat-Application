import { FunctionComponent, useState, useRef, useEffect } from "react";
import React from "react";
import { Col, Row, Container, Button, Form } from "react-bootstrap";
import { UseCases } from "Domain/UseCases/UseCases";
import { Prev } from "react-bootstrap/esm/PageItem";
import { message } from "Domain/UseCases/ChatMsgUseCases";
import { getLocalUserEmail } from "Domain/UseCases/CurrentUserInfoUseCases";

interface PublicChatProps {}

const PublicChat: FunctionComponent<PublicChatProps> = () => {
  const [msg, setMsg] = useState("");
  const [msges, setmsges] = useState<message[]>(
    [...UseCases.ChatMsgUseCases.cache].reverse()
  );
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
    return UseCases.ChatMsgUseCases.messagesListner((msgs) => {
      setmsges([...msgs].reverse());
    });
  }, []);

  return (
    <React.Fragment>
      <Container className="bottom-0" style={{ height: "89vh" }}>
        <div
          className="d-flex flex-column-reverse text-white "
          style={{ height: "100%", overflow: "scroll" }}
        >
          {msges.map((it, index) => {
            const alignment: string =
              it.sender.email == getLocalUserEmail()
                ? "align-self-start bg-black"
                : "align-self-end bg-primary";
            return (
              <div
                className={`rounded-3 m-2 w-75 p-3 ${alignment}`}
                key={index}
              >
                <p>
                  <img
                    className="me-3"
                    src={it.sender.picture}
                    alt=""
                    style={{ width: 40, borderRadius: 100 }}
                  />
                  {it.sender.username}
                </p>
                {it.data.toString()}
              </div>
            );
          })}
        </div>
        <div className="">
          <Form.Group className="mb-3">
            <Form.Control
              ref={ref}
              placeholder="enter message here"
              value={msg}
              onChange={(event) => {
                if (event.isTrusted) {
                  setMsg(event.target.value);
                }
              }}
              onKeyPress={(e) => {
                if (e.key == "Enter") {
                  UseCases.ChatMsgUseCases.sendMessageToAll(msg);
                  setMsg("");
                }
              }}
            />
          </Form.Group>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default PublicChat;
