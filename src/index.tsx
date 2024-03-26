import { Button, Frog } from "@airstack/frog";
import { config } from "dotenv";
import { devtools } from "@airstack/frog/dev";
import { serveStatic } from "@hono/node-server/serve-static";

config();

// Instantiate new Frog instance with Airstack API key
export const app = new Frog({
  apiKey: process.env.AIRSTACK_API_KEY as string,
});

app.frame("/", async (c) => {
  const { buttonValue } = c;
  let displayText = "Welcome! Choose a fruit...";
  if (buttonValue) {
    displayText = `You selected: ${buttonValue}`;
  }

  return c.res({
    image: (
      <div
        style={{
          color: "#34495e",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          fontFamily: "'Arial', sans-serif",
          backgroundColor: "#ecf0f1",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
          width: "100%", // Adjusted width
          height: "100%",
        }}
      >
        {displayText}
      </div>
    ),
    intents: [
      <Button value="apple">Apple</Button>,
      <Button value="banana">Banana</Button>,
      <Button value="orange">Orange</Button>,
      <Button value="grape">Grape</Button>,
    ],
  });
});

devtools(app, { serveStatic });
