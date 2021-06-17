import React, { ReactElement } from "react";

// type AppProps = {
// };

const App = (/* {}: AppProps */): ReactElement => {
  return (
    <main>
      <div onClick={(e) => window.alert("Hello World")}>
        Hello React from Deno!
      </div>
    </main>
  );
};

export default App;
