import React from "react";

// components
import Properties from "./pages/properties";

function App() {
  React.useEffect(() => {
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data) => {
      });
  }, []);

  return (
    <div className="App">
      <Properties />
    </div>
  );
}

export default App;