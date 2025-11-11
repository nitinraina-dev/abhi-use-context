import { CollegeProvider } from "./CollegeContext";
import CompA from "./CompA";
import CompB from "./CompB";
import { CountProvider } from "./Components/CountContext";

function App() {
  return (
    <CountProvider>

      <CompB/>
    </CountProvider>
  
  );
}

export default App;
