import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
import Live from "./components/Live";
import Tadabor from "./components/Tadabor";

const Quran = lazy(() => import("./components/Quran"));
const Tafseer = lazy(() => import("./components/Tafseer"));
const Radio = lazy(() => import("./components/Radio"));
const PrayerTimes = lazy(() => import("./components/PrayerTimes"));
const Home = lazy(() => import("./components/Home"));
const AppLayout = lazy(() => import("./layouts/AppLayout"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>

          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/quran" element={<Quran />} />
            <Route path="/tafseer" element={<Tafseer />} />
            <Route path="/radio" element={<Radio />} />
            <Route path="/prayer-times" element={<PrayerTimes />} />
            <Route path="/live" element={<Live />} />
            <Route path="/Tadabor" element={<Tadabor />} />
          </Route>

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;