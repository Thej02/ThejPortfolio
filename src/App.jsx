import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";

import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import { AnimatePresence } from "framer-motion";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

/* =========================================================
   LAZY LOADED PAGES / COMPONENTS
========================================================= */

const Portofolio = lazy(() => import("./Pages/Portofolio"));
const ContactPage = lazy(() => import("./Pages/Contact"));
const ProjectDetails = lazy(() =>
  import("./components/ProjectDetail")
);
const WelcomeScreen = lazy(() =>
  import("./Pages/WelcomeScreen")
);
const NotFoundPage = lazy(() =>
  import("./Pages/404")
);


/* =========================================================
   LANDING PAGE
========================================================= */

const LandingPage = ({
  showWelcome,
  setShowWelcome,
}) => {
  return (
    <div className="relative min-h-screen">

      {/* ================= WELCOME SCREEN ================= */}

      <AnimatePresence mode="wait">
        {showWelcome && (
          <Suspense fallback={null}>
            <WelcomeScreen
              onLoadingComplete={() =>
                setShowWelcome(false)
              }
            />
          </Suspense>
        )}
      </AnimatePresence>


      {/* ================= MAIN SITE ================= */}

      {!showWelcome && (
        <>
          {/* Navbar */}
          <Navbar />


          {/* Home */}
          <ErrorBoundary>
            <Home />
          </ErrorBoundary>


          {/* About */}
          <ErrorBoundary>
            <About />
          </ErrorBoundary>


          {/* Portfolio + Contact */}
          <ErrorBoundary>
            <Suspense
              fallback={
                <div className="h-20" />
              }
            >
              <Portofolio />
              <ContactPage />
            </Suspense>
          </ErrorBoundary>


          {/* Footer */}
          <Footer />
        </>
      )}

    </div>
  );
};


/* =========================================================
   PROJECT PAGE
========================================================= */

const ProjectPageLayout = () => {
  return (
    <div className="relative min-h-screen">

      <ErrorBoundary>

        <Suspense
          fallback={
            <div className="min-h-screen" />
          }
        >
          <ProjectDetails />
        </Suspense>


        {/* Footer */}
        <Footer />

      </ErrorBoundary>

    </div>
  );
};


/* =========================================================
   APP
========================================================= */

function App() {
  const [showWelcome, setShowWelcome] =
    useState(true);

  return (
    <HelmetProvider>

      {/* =====================================================
          GLOBAL ANIMATED BACKGROUND
      ===================================================== */}

      <div
        className="
          fixed
          inset-0
          -z-10
          pointer-events-none
        "
      >
        <AnimatedBackground />
      </div>


      {/* =====================================================
          ROUTER
      ===================================================== */}

      <BrowserRouter>

        <Routes>

          {/* =================================================
              PUBLIC LANDING PAGE
          ================================================= */}

          <Route
            path="/"
            element={
              <LandingPage
                showWelcome={showWelcome}
                setShowWelcome={setShowWelcome}
              />
            }
          />


          {/* =================================================
              PROJECT DETAILS
          ================================================= */}

          <Route
            path="/project/:slug"
            element={
              <ProjectPageLayout />
            }
          />


          {/* =================================================
              LOGIN
          ================================================= */}

          <Route
            path="/login"
            element={<Login />}
          />


          {/* =================================================
              DASHBOARD
          ================================================= */}

          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />


          {/* =================================================
              404
          ================================================= */}

          <Route
            path="*"
            element={
              <Suspense fallback={null}>
                <NotFoundPage />
              </Suspense>
            }
          />

        </Routes>

      </BrowserRouter>

    </HelmetProvider>
  );
}

export default App;