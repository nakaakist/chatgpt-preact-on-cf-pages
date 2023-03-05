import { hydrate, prerender as ssr } from "preact-iso";
import { Chat } from "./Chat";

export const App = () => {
  return (
    <div class="app">
      <Chat />
    </div>
  );
};

hydrate(<App />);

export const prerender = (data: JSX.IntrinsicAttributes) =>
  ssr(<App {...data} />);
