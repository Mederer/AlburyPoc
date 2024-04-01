import { Route, Routes } from "react-router-dom";
import HomeScreen from "./components/screens/HomeScreen";
import UIShell from "./components/layout/UIShell";
import ViewIdeasScreen from "./components/screens/ViewIdeasScreen";

function App() {

  return (
    <Routes>
      <Route element={<UIShell />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/ideas" element={<ViewIdeasScreen />} />
      </Route>
    </Routes>
  )
}

export default App
