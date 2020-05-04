import React from "react";
import { ThemeProvider } from "@chakra-ui/core";
import Main from "./components/Main";

function App(): JSX.Element {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}

export default App;
