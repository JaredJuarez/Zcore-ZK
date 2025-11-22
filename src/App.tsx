import { Button, Layout } from "@stellar/design-system";
import ConnectAccount from "./components/ConnectAccount.tsx";
import { Routes, Route, Outlet, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Debugger from "./pages/Debugger.tsx";
import Zcore from "./pages/Zcore";

const AppLayout: React.FC = () => (
  <main>
    <header
      style={{
        position: "sticky",
        top: 0,
        width: "100%",
        background: "white",
        borderBottom: "1px solid #e5e7eb",
        zIndex: 1000,
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <NavLink
          to="/"
          style={{
            textDecoration: "none",
            color: "#1f2937",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            ZCore
          </h1>
        </NavLink>

        <nav style={{ display: "flex", gap: "0.5rem" }}>
          <NavLink
            to="/zcore"
            style={{
              textDecoration: "none",
            }}
          >
            {({ isActive }) => (
              <Button variant="tertiary" size="md" disabled={isActive}>
                Calcular Score
              </Button>
            )}
          </NavLink>
          <a
            href="https://v0-zc-ore-landing-page.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
            }}
          >
            <Button variant="tertiary" size="md">
              Documentación API
            </Button>
          </a>
        </nav>
      </div>
    </header>
    <Outlet />
    <Layout.Footer>
      <span>
        © {new Date().getFullYear()} Noir App. Licensed under the{" "}
        <a
          href="http://www.apache.org/licenses/LICENSE-2.0"
          target="_blank"
          rel="noopener noreferrer"
        >
          Apache License, Version 2.0
        </a>
        .
      </span>
    </Layout.Footer>
  </main>
);

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/zcore" element={<Zcore />} />
        <Route path="/debug" element={<Debugger />} />
        <Route path="/debug/:contractName" element={<Debugger />} />
      </Route>
    </Routes>
  );
}

export default App;
