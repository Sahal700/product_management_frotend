import { BrowserRouter } from "react-router-dom";
import { AppProviders } from "./providers/AppProviders";
import AppRoutes from "./routes/appRoutes";

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
