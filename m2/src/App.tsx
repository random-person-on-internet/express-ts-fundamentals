import { lazy, Suspense } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ErrorBoundary from "./components/ErrorBoundary";

const AdminPanel = lazy(() => import("./pages/AdminPanel"));

export default function App() {
  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/admin"
            element={
              <ErrorBoundary>
                <Suspense fallback={<div>Loading admin panel...</div>}>
                  <AdminPanel />
                </Suspense>
              </ErrorBoundary>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
