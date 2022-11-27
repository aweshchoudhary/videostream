import { createRoot } from "react-dom/client";

import { AuthProvider } from "./Context/AuthProvider";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
