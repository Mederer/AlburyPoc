import { Route, Routes } from "react-router-dom";
import HomeScreen from "./components/screens/HomeScreen";
import UIShell from "./components/layout/UIShell";
import ViewIdeasScreen from "./components/screens/ViewIdeasScreen";
import CreateIdeaScreen from "./components/screens/CreateIdeaScreen";

function App() {

  return (
    <Routes>
      <Route element={<UIShell />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/ideas" element={<ViewIdeasScreen />} />
        <Route path="/ideas/create" element={<CreateIdeaScreen />} />
      </Route>
    </Routes>
  )
}

export default App
