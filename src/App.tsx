import { Route, Routes } from "react-router-dom";
import UIShell from "./components/layout/UIShell";
import CreateIdeaScreen from "./components/screens/CreateIdeaScreen";
import IdeasScreen from "./components/screens/IdeasScreen";
import HomeScreen from "./components/screens/HomeScreen";
import ReportingScreen from "./components/screens/ReportingScreen";

function App() {

  return (
    <Routes>
      <Route element={<UIShell />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/ideas" element={<IdeasScreen />} />
        <Route path="/ideas/create" element={<CreateIdeaScreen />} />
        <Route path="/reporting" element={<ReportingScreen />} />
      </Route>
    </Routes>
  )
}

export default App
