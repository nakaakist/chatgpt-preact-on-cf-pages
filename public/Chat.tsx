import { useState } from "preact/hooks";
import { Message } from "../types";
import styles from "./Chat.module.css";

// To save cost, limit the number of messages & length of questions to be sent to the server.
const MAX_MESSAGES = 5;
const MAX_QUESTION_LENGTH = 100;

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const onSubmit = async (e: JSX.TargetedEvent) => {
    e.preventDefault();

    const question = { role: "user" as const, content: input };
    setMessages([...messages, question]);
    setLoading(true);
    setHasError(false);

    try {
      const reply: Message = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, question].slice(-MAX_MESSAGES)),
      }).then((r) => r.json());
      const answer = {
        role: "assistant" as const,
        content: reply.content,
      };

      setMessages([...messages, question, answer]);
    } catch (e) {
      console.error(e);
      setHasError(true);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <section>
      {messages.map((m, i) => (
        <div class={styles.message} key={i}>
          <div class={styles.role}>{m.role}</div>
          <pre class={styles.messageContent}>{m.content}</pre>
        </div>
      ))}

      {loading && <div class={styles.loading}>Generating...</div>}
      {hasError && (
        <div class={styles.error}>An error occurred. Please retry.</div>
      )}

      <form onSubmit={onSubmit}>
        <input
          class={styles.input}
          placeholder={`Ask anything (up to ${MAX_QUESTION_LENGTH} characters)`}
          type="text"
          value={input}
          onInput={(e) => setInput((e.target as any)?.value ?? "")}
          maxLength={MAX_QUESTION_LENGTH}
          disabled={loading}
        />
        <div>
          <input class={styles.submit} type="submit" disabled={loading} />
        </div>
      </form>
    </section>
  );
};
