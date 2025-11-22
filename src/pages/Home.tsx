import React from "react";
import { Layout, Text, Button } from "@stellar/design-system";
import { Box } from "../components/layout/Box";
import { NavLink } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <Layout.Content>
      <Layout.Inset>
        {/* Hero Section */}
        <Box
          direction="column"
          gap="xl"
          style={{
            textAlign: "center",
            padding: "0 2rem 4rem 2rem",
            background: "#ffffff",
            color: "#111827",
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Text
            as="h1"
            size="xl"
            style={{
              fontSize: "3.5rem",
              fontWeight: "300",
              lineHeight: "1.1",
              color: "#111827",
              marginBottom: "1rem",
              letterSpacing: "-0.02em",
            }}
          >
            Credit Scoring
          </Text>
          <Text
            as="h2"
            size="lg"
            style={{
              fontSize: "3.5rem",
              fontWeight: "700",
              color: "#1f2937",
              marginBottom: "1rem",
              letterSpacing: "-0.02em",
            }}
          >
            Descentralizado
          </Text>
          <Text
            as="p"
            size="lg"
            style={{
              fontSize: "1.25rem",
              color: "#6b7280",
              maxWidth: "700px",
              margin: "0 auto 3rem auto",
              lineHeight: "1.7",
              fontWeight: "400",
            }}
          >
            La primera API de scoring crediticio 100% on-chain. Evalúa riesgo
            crediticio en tiempo real basándose únicamente en datos verificados
            de blockchain Stellar.
          </Text>

          <Box
            direction="row"
            gap="lg"
            style={{ justifyContent: "center", flexWrap: "wrap" }}
          >
            <NavLink to="/zcore" style={{ textDecoration: "none" }}>
              <Button variant="primary" size="lg">
                Calcular Score
              </Button>
            </NavLink>
            <a
              href="https://v0-zc-ore-landing-page.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              <Button variant="tertiary" size="md" style={{ height: "2.6rem" }}>
                Documentación API
              </Button>
            </a>
          </Box>
        </Box>

        {/* Features Section */}
        <Box
          direction="column"
          gap="xxl"
          style={{
            padding: "8rem 2rem",
            background: "#f8fafc",
            textAlign: "center",
          }}
        >
          <Box
            direction="column"
            gap="lg"
            style={{ maxWidth: "800px", margin: "0 auto" }}
          >
            <Text
              as="h2"
              size="xl"
              style={{
                fontSize: "2.5rem",
                fontWeight: "600",
                color: "#1f2937",
                letterSpacing: "-0.02em",
                marginBottom: "1rem",
              }}
            >
              Scoring Crediticio del Futuro
            </Text>
            <Text
              as="p"
              size="lg"
              style={{
                fontSize: "1.125rem",
                color: "#6b7280",
                lineHeight: "1.7",
                fontWeight: "400",
              }}
            >
              Evaluación de riesgo crediticio instantánea y transparente basada
              en actividad on-chain verificable.
            </Text>
          </Box>

          <Box
            direction="row"
            gap="xl"
            style={{
              marginTop: "4rem",
              flexWrap: "wrap",
              justifyContent: "center",
              maxWidth: "1200px",
              margin: "4rem auto 0 auto",
            }}
          >
            <Box
              direction="column"
              gap="lg"
              style={{
                padding: "3rem 2rem",
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                border: "1px solid #e5e7eb",
                flex: 1,
                minWidth: "320px",
                textAlign: "center",
              }}
            >
              <Text
                as="h3"
                size="lg"
                style={{
                  color: "#1f2937",
                  fontWeight: "600",
                  fontSize: "1.5rem",
                  marginBottom: "1rem",
                }}
              >
                Evaluación Instantánea
              </Text>
              <Text
                as="p"
                size="md"
                style={{
                  color: "#6b7280",
                  lineHeight: "1.6",
                  fontSize: "1rem",
                }}
              >
                Score automático en segundos desde tu actividad Stellar. Solo
                necesitas tu wallet address.
              </Text>
            </Box>

            <Box
              direction="column"
              gap="lg"
              style={{
                padding: "3rem 2rem",
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                border: "1px solid #e5e7eb",
                flex: 1,
                minWidth: "320px",
                textAlign: "center",
              }}
            >
              <Text
                as="h3"
                size="lg"
                style={{
                  color: "#1f2937",
                  fontWeight: "600",
                  fontSize: "1.5rem",
                  marginBottom: "1rem",
                }}
              >
                Reputación Portable
              </Text>
              <Text
                as="p"
                size="md"
                style={{
                  color: "#6b7280",
                  lineHeight: "1.6",
                  fontSize: "1rem",
                }}
              >
                Tu score funciona en todas las DeFi integradas. Construye
                reputación una vez, úsala en todas partes.
              </Text>
            </Box>

            <Box
              direction="column"
              gap="lg"
              style={{
                padding: "3rem 2rem",
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                border: "1px solid #e5e7eb",
                flex: 1,
                minWidth: "320px",
                textAlign: "center",
              }}
            >
              <Text
                as="h3"
                size="lg"
                style={{
                  color: "#1f2937",
                  fontWeight: "600",
                  fontSize: "1.5rem",
                  marginBottom: "1rem",
                }}
              >
                100% Verificado
              </Text>
              <Text
                as="p"
                size="md"
                style={{
                  color: "#6b7280",
                  lineHeight: "1.6",
                  fontSize: "1rem",
                }}
              >
                Información completamente verificada on-chain. Sin datos
                auto-reportados, sin manipulación posible.
              </Text>
            </Box>
          </Box>
        </Box>

        {/* Problem & Solution */}
        <Box
          direction="column"
          gap="xxl"
          style={{ padding: "8rem 2rem", background: "white" }}
        >
          <Text
            as="h2"
            size="xl"
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              fontWeight: "600",
              color: "#1f2937",
              letterSpacing: "-0.02em",
              marginBottom: "4rem",
            }}
          >
            Transformando DeFi
          </Text>

          <Box
            direction="row"
            gap="xl"
            style={{
              alignItems: "stretch",
              flexWrap: "wrap",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            <Box
              direction="column"
              gap="lg"
              style={{
                flex: 1,
                minWidth: "350px",
                padding: "3rem",
                borderRadius: "12px",
                border: "1px solid #374151",
                background: "#111827",
              }}
            >
              <Text
                as="h3"
                size="lg"
                style={{
                  color: "white",
                  fontWeight: "600",
                  fontSize: "1.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                Limitaciones Actuales
              </Text>
              <Box direction="column" gap="md">
                <Text
                  as="p"
                  size="md"
                  style={{ color: "#d1d5db", lineHeight: "1.6" }}
                >
                  DeFi requiere 150-200% de colateral para préstamos
                </Text>
                <Text
                  as="p"
                  size="md"
                  style={{ color: "#d1d5db", lineHeight: "1.6" }}
                >
                  Sin historial crediticio = Sin acceso a crédito
                </Text>
                <Text
                  as="p"
                  size="md"
                  style={{ color: "#d1d5db", lineHeight: "1.6" }}
                >
                  Cada plataforma es un silo independiente
                </Text>
                <Text
                  as="p"
                  size="md"
                  style={{ color: "#d1d5db", lineHeight: "1.6" }}
                >
                  Procesos manuales y formularios complejos
                </Text>
              </Box>
            </Box>

            <Box
              direction="column"
              gap="lg"
              style={{
                flex: 1,
                minWidth: "350px",
                padding: "3rem",
                borderRadius: "12px",
                border: "1px solid #374151",
                background: "#111827",
              }}
            >
              <Text
                as="h3"
                size="lg"
                style={{
                  color: "#e5e7eb",
                  fontWeight: "600",
                  fontSize: "1.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                Solución ZCore
              </Text>
              <Box direction="column" gap="md">
                <Text
                  as="p"
                  size="md"
                  style={{ color: "#d1d5db", lineHeight: "1.6" }}
                >
                  Score automático desde actividad Stellar (0-350)
                </Text>
                <Text
                  as="p"
                  size="md"
                  style={{ color: "#d1d5db", lineHeight: "1.6" }}
                >
                  Reputación portable entre todas las DeFi
                </Text>
                <Text
                  as="p"
                  size="md"
                  style={{ color: "#d1d5db", lineHeight: "1.6" }}
                >
                  Solo necesitas tu wallet address
                </Text>
                <Text
                  as="p"
                  size="md"
                  style={{ color: "#d1d5db", lineHeight: "1.6" }}
                >
                  Evaluación instantánea y automatizada
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* How It Works */}
        <Box
          direction="column"
          gap="xxl"
          style={{
            padding: "8rem 2rem",
            background: "#f8fafc",
            textAlign: "center",
          }}
        >
          <Text
            as="h2"
            size="xl"
            style={{
              fontSize: "2.5rem",
              fontWeight: "600",
              color: "#1f2937",
              letterSpacing: "-0.02em",
              marginBottom: "2rem",
            }}
          >
            Proceso Simplificado
          </Text>
          <Text
            as="p"
            size="lg"
            style={{
              fontSize: "1.125rem",
              color: "#6b7280",
              maxWidth: "600px",
              margin: "0 auto 4rem auto",
              lineHeight: "1.7",
            }}
          >
            Cinco pasos simples para obtener tu credit score descentralizado
          </Text>

          <Box
            direction="row"
            gap="lg"
            style={{
              flexWrap: "nowrap",
              justifyContent: "center",
              maxWidth: "1400px",
              margin: "0 auto",
              overflowX: "auto",
            }}
          >
            {/* Step 1 */}
            <div
              style={{
                minWidth: "180px",
                flex: "0 0 auto",
                width: "180px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "220px",
                  padding: "2rem 1.5rem",
                  background: "white",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  transition: "all 0.3s ease-in-out",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#111827";
                  e.currentTarget.style.border = "1px solid #374151";
                  const circle = e.currentTarget.querySelector(
                    ".number-circle"
                  ) as HTMLElement;
                  const title = e.currentTarget.querySelector(
                    ".title-text"
                  ) as HTMLElement;
                  const desc = e.currentTarget.querySelector(
                    ".description-text"
                  ) as HTMLElement;
                  if (circle) circle.style.opacity = "0";
                  if (title) {
                    title.style.color = "white";
                    title.style.opacity = "0";
                  }
                  if (desc) desc.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.border = "1px solid #e5e7eb";
                  const circle = e.currentTarget.querySelector(
                    ".number-circle"
                  ) as HTMLElement;
                  const title = e.currentTarget.querySelector(
                    ".title-text"
                  ) as HTMLElement;
                  const desc = e.currentTarget.querySelector(
                    ".description-text"
                  ) as HTMLElement;
                  if (circle) circle.style.opacity = "1";
                  if (title) {
                    title.style.color = "#1f2937";
                    title.style.opacity = "1";
                  }
                  if (desc) desc.style.opacity = "0";
                }}
              >
                <div
                  className="number-circle"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: "#f3f4f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                    transition: "opacity 0.3s ease-in-out",
                    color: "#1f2937",
                    fontWeight: "700",
                    fontSize: "1.25rem",
                  }}
                >
                  1
                </div>
                <h4
                  className="title-text"
                  style={{
                    color: "#1f2937",
                    fontWeight: "600",
                    fontSize: "1rem",
                    transition: "all 0.3s ease-in-out",
                    margin: 0,
                  }}
                >
                  Conecta wallet Stellar
                </h4>
                <p
                  className="description-text"
                  style={{
                    color: "#d1d5db",
                    lineHeight: "1.4",
                    fontSize: "0.85rem",
                    opacity: 0,
                    position: "absolute",
                    transition: "opacity 0.3s ease-in-out 0.1s",
                    marginTop: "1rem",
                    margin: 0,
                  }}
                >
                  Proporciona tu dirección de wallet
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div
              style={{
                minWidth: "180px",
                flex: "0 0 auto",
                width: "180px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "220px",
                  padding: "2rem 1.5rem",
                  background: "white",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  transition: "all 0.3s ease-in-out",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#111827";
                  e.currentTarget.style.border = "1px solid #374151";
                  const circle = e.currentTarget.querySelector(
                    ".number-circle"
                  ) as HTMLElement;
                  const title = e.currentTarget.querySelector(
                    ".title-text"
                  ) as HTMLElement;
                  const desc = e.currentTarget.querySelector(
                    ".description-text"
                  ) as HTMLElement;
                  if (circle) circle.style.opacity = "0";
                  if (title) {
                    title.style.color = "white";
                    title.style.opacity = "0";
                  }
                  if (desc) desc.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.border = "1px solid #e5e7eb";
                  const circle = e.currentTarget.querySelector(
                    ".number-circle"
                  ) as HTMLElement;
                  const title = e.currentTarget.querySelector(
                    ".title-text"
                  ) as HTMLElement;
                  const desc = e.currentTarget.querySelector(
                    ".description-text"
                  ) as HTMLElement;
                  if (circle) circle.style.opacity = "1";
                  if (title) {
                    title.style.color = "#1f2937";
                    title.style.opacity = "1";
                  }
                  if (desc) desc.style.opacity = "0";
                }}
              >
                <div
                  className="number-circle"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: "#f3f4f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                    transition: "opacity 0.3s ease-in-out",
                    color: "#1f2937",
                    fontWeight: "700",
                    fontSize: "1.25rem",
                  }}
                >
                  2
                </div>
                <h4
                  className="title-text"
                  style={{
                    color: "#1f2937",
                    fontWeight: "600",
                    fontSize: "1rem",
                    transition: "all 0.3s ease-in-out",
                    margin: 0,
                  }}
                >
                  ZCore analiza tu historial
                </h4>
                <p
                  className="description-text"
                  style={{
                    color: "#d1d5db",
                    lineHeight: "1.4",
                    fontSize: "0.85rem",
                    opacity: 0,
                    position: "absolute",
                    transition: "opacity 0.3s ease-in-out 0.1s",
                    marginTop: "1rem",
                    margin: 0,
                  }}
                >
                  Algoritmo procesa tu actividad on-chain
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div
              style={{
                minWidth: "180px",
                flex: "0 0 auto",
                width: "180px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "220px",
                  padding: "2rem 1.5rem",
                  background: "white",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  transition: "all 0.3s ease-in-out",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#111827";
                  e.currentTarget.style.border = "1px solid #374151";
                  const circle = e.currentTarget.querySelector(
                    ".number-circle"
                  ) as HTMLElement;
                  const title = e.currentTarget.querySelector(
                    ".title-text"
                  ) as HTMLElement;
                  const desc = e.currentTarget.querySelector(
                    ".description-text"
                  ) as HTMLElement;
                  if (circle) circle.style.opacity = "0";
                  if (title) {
                    title.style.color = "white";
                    title.style.opacity = "0";
                  }
                  if (desc) desc.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.border = "1px solid #e5e7eb";
                  const circle = e.currentTarget.querySelector(
                    ".number-circle"
                  ) as HTMLElement;
                  const title = e.currentTarget.querySelector(
                    ".title-text"
                  ) as HTMLElement;
                  const desc = e.currentTarget.querySelector(
                    ".description-text"
                  ) as HTMLElement;
                  if (circle) circle.style.opacity = "1";
                  if (title) {
                    title.style.color = "#1f2937";
                    title.style.opacity = "1";
                  }
                  if (desc) desc.style.opacity = "0";
                }}
              >
                <div
                  className="number-circle"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: "#f3f4f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                    transition: "opacity 0.3s ease-in-out",
                    color: "#1f2937",
                    fontWeight: "700",
                    fontSize: "1.25rem",
                  }}
                >
                  3
                </div>
                <h4
                  className="title-text"
                  style={{
                    color: "#1f2937",
                    fontWeight: "600",
                    fontSize: "1rem",
                    transition: "all 0.3s ease-in-out",
                    margin: 0,
                  }}
                >
                  Recibe tu score instantáneo
                </h4>
                <p
                  className="description-text"
                  style={{
                    color: "#d1d5db",
                    lineHeight: "1.4",
                    fontSize: "0.85rem",
                    opacity: 0,
                    position: "absolute",
                    transition: "opacity 0.3s ease-in-out 0.1s",
                    marginTop: "1rem",
                    margin: 0,
                  }}
                >
                  Score de 0-350 puntos generado automáticamente
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div
              style={{
                minWidth: "180px",
                flex: "0 0 auto",
                width: "180px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "220px",
                  padding: "2rem 1.5rem",
                  background: "white",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  transition: "all 0.3s ease-in-out",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#111827";
                  e.currentTarget.style.border = "1px solid #374151";
                  const circle = e.currentTarget.querySelector(
                    ".number-circle"
                  ) as HTMLElement;
                  const title = e.currentTarget.querySelector(
                    ".title-text"
                  ) as HTMLElement;
                  const desc = e.currentTarget.querySelector(
                    ".description-text"
                  ) as HTMLElement;
                  if (circle) circle.style.opacity = "0";
                  if (title) {
                    title.style.color = "white";
                    title.style.opacity = "0";
                  }
                  if (desc) desc.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.border = "1px solid #e5e7eb";
                  const circle = e.currentTarget.querySelector(
                    ".number-circle"
                  ) as HTMLElement;
                  const title = e.currentTarget.querySelector(
                    ".title-text"
                  ) as HTMLElement;
                  const desc = e.currentTarget.querySelector(
                    ".description-text"
                  ) as HTMLElement;
                  if (circle) circle.style.opacity = "1";
                  if (title) {
                    title.style.color = "#1f2937";
                    title.style.opacity = "1";
                  }
                  if (desc) desc.style.opacity = "0";
                }}
              >
                <div
                  className="number-circle"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: "#f3f4f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                    transition: "opacity 0.3s ease-in-out",
                    color: "#1f2937",
                    fontWeight: "700",
                    fontSize: "1.25rem",
                  }}
                >
                  4
                </div>
                <h4
                  className="title-text"
                  style={{
                    color: "#1f2937",
                    fontWeight: "600",
                    fontSize: "1rem",
                    transition: "all 0.3s ease-in-out",
                    margin: 0,
                  }}
                >
                  Utiliza en plataformas DeFi
                </h4>
                <p
                  className="description-text"
                  style={{
                    color: "#d1d5db",
                    lineHeight: "1.4",
                    fontSize: "0.85rem",
                    opacity: 0,
                    position: "absolute",
                    transition: "opacity 0.3s ease-in-out 0.1s",
                    marginTop: "1rem",
                    margin: 0,
                  }}
                >
                  Accede a préstamos con mejores condiciones
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div
              style={{
                minWidth: "180px",
                flex: "0 0 auto",
                width: "180px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "220px",
                  padding: "2rem 1.5rem",
                  background: "white",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  transition: "all 0.3s ease-in-out",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#111827";
                  e.currentTarget.style.border = "1px solid #374151";
                  const circle = e.currentTarget.querySelector(
                    ".number-circle"
                  ) as HTMLElement;
                  const title = e.currentTarget.querySelector(
                    ".title-text"
                  ) as HTMLElement;
                  const desc = e.currentTarget.querySelector(
                    ".description-text"
                  ) as HTMLElement;
                  if (circle) circle.style.opacity = "0";
                  if (title) {
                    title.style.color = "white";
                    title.style.opacity = "0";
                  }
                  if (desc) desc.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.border = "1px solid #e5e7eb";
                  const circle = e.currentTarget.querySelector(
                    ".number-circle"
                  ) as HTMLElement;
                  const title = e.currentTarget.querySelector(
                    ".title-text"
                  ) as HTMLElement;
                  const desc = e.currentTarget.querySelector(
                    ".description-text"
                  ) as HTMLElement;
                  if (circle) circle.style.opacity = "1";
                  if (title) {
                    title.style.color = "#1f2937";
                    title.style.opacity = "1";
                  }
                  if (desc) desc.style.opacity = "0";
                }}
              >
                <div
                  className="number-circle"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: "#f3f4f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                    transition: "opacity 0.3s ease-in-out",
                    color: "#1f2937",
                    fontWeight: "700",
                    fontSize: "1.25rem",
                  }}
                >
                  5
                </div>
                <h4
                  className="title-text"
                  style={{
                    color: "#1f2937",
                    fontWeight: "600",
                    fontSize: "1rem",
                    transition: "all 0.3s ease-in-out",
                    margin: 0,
                  }}
                >
                  Mejora tu reputación
                </h4>
                <p
                  className="description-text"
                  style={{
                    color: "#d1d5db",
                    lineHeight: "1.4",
                    fontSize: "0.85rem",
                    opacity: 0,
                    position: "absolute",
                    transition: "opacity 0.3s ease-in-out 0.1s",
                    marginTop: "1rem",
                    margin: 0,
                  }}
                >
                  Cada pago exitoso incrementa tu score
                </p>
              </div>
            </div>
          </Box>
        </Box>

        {/* Score Components - Simplified */}
        <Box
          direction="column"
          gap="xxl"
          style={{
            padding: "8rem 2rem",
            background: "#f8fafc",
            textAlign: "center",
          }}
        >
          <Text
            as="h2"
            size="xl"
            style={{
              fontSize: "2.5rem",
              fontWeight: "600",
              color: "#1f2937",
              letterSpacing: "-0.02em",
              marginBottom: "2rem",
            }}
          >
            Componentes del Score
          </Text>
          <Text
            as="p"
            size="lg"
            style={{
              fontSize: "1.125rem",
              color: "#6b7280",
              maxWidth: "600px",
              margin: "0 auto 4rem auto",
              lineHeight: "1.7",
            }}
          >
            Algoritmo que evalúa 6 factores clave de tu actividad on-chain para
            generar un score de 0-350 puntos
          </Text>

          <Box
            direction="column"
            gap="lg"
            style={{ maxWidth: "800px", margin: "0 auto" }}
          >
            <Box
              direction="row"
              gap="lg"
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Box
                direction="column"
                gap="sm"
                style={{
                  background: "white",
                  padding: "2rem",
                  borderRadius: "12px",
                  minWidth: "250px",
                  flex: 1,
                  margin: "0.5rem",
                  border: "1px solid #e5e5e5",
                }}
              >
                <Text
                  as="h4"
                  size="md"
                  style={{ color: "#171717", fontWeight: "600" }}
                >
                  Edad de Wallet
                </Text>
                <Text
                  as="p"
                  size="lg"
                  style={{
                    color: "#525252",
                    fontWeight: "700",
                    fontSize: "1.5rem",
                  }}
                >
                  80 pts
                </Text>
                <Text as="p" size="sm" style={{ color: "#737373" }}>
                  Antigüedad y estabilidad
                </Text>
              </Box>

              <Box
                direction="column"
                gap="sm"
                style={{
                  background: "white",
                  padding: "2rem",
                  borderRadius: "12px",
                  minWidth: "250px",
                  flex: 1,
                  margin: "0.5rem",
                  border: "1px solid #e5e5e5",
                }}
              >
                <Text
                  as="h4"
                  size="md"
                  style={{ color: "#171717", fontWeight: "600" }}
                >
                  Actividad Transaccional
                </Text>
                <Text
                  as="p"
                  size="lg"
                  style={{
                    color: "#525252",
                    fontWeight: "700",
                    fontSize: "1.5rem",
                  }}
                >
                  70 pts
                </Text>
                <Text as="p" size="sm" style={{ color: "#737373" }}>
                  Uso activo de la red
                </Text>
              </Box>
            </Box>

            <Box
              direction="row"
              gap="lg"
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Box
                direction="column"
                gap="sm"
                style={{
                  background: "white",
                  padding: "2rem",
                  borderRadius: "12px",
                  minWidth: "250px",
                  flex: 1,
                  margin: "0.5rem",
                  border: "1px solid #e5e5e5",
                }}
              >
                <Text
                  as="h4"
                  size="md"
                  style={{ color: "#171717", fontWeight: "600" }}
                >
                  Balance XLM
                </Text>
                <Text
                  as="p"
                  size="lg"
                  style={{
                    color: "#525252",
                    fontWeight: "700",
                    fontSize: "1.5rem",
                  }}
                >
                  60 pts
                </Text>
                <Text as="p" size="sm" style={{ color: "#737373" }}>
                  Solvencia verificada
                </Text>
              </Box>

              <Box
                direction="column"
                gap="sm"
                style={{
                  background: "white",
                  padding: "2rem",
                  borderRadius: "12px",
                  minWidth: "250px",
                  flex: 1,
                  margin: "0.5rem",
                  border: "1px solid #e5e5e5",
                }}
              >
                <Text
                  as="h4"
                  size="md"
                  style={{ color: "#171717", fontWeight: "600" }}
                >
                  Tasa de Éxito
                </Text>
                <Text
                  as="p"
                  size="lg"
                  style={{
                    color: "#525252",
                    fontWeight: "700",
                    fontSize: "1.5rem",
                  }}
                >
                  50 pts
                </Text>
                <Text as="p" size="sm" style={{ color: "#737373" }}>
                  Competencia técnica
                </Text>
              </Box>
            </Box>

            <Box
              direction="row"
              gap="lg"
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Box
                direction="column"
                gap="sm"
                style={{
                  background: "white",
                  padding: "2rem",
                  borderRadius: "12px",
                  minWidth: "250px",
                  flex: 1,
                  margin: "0.5rem",
                  border: "1px solid #e5e5e5",
                }}
              >
                <Text
                  as="h4"
                  size="md"
                  style={{ color: "#171717", fontWeight: "600" }}
                >
                  Diversidad de Activos
                </Text>
                <Text
                  as="p"
                  size="lg"
                  style={{
                    color: "#525252",
                    fontWeight: "700",
                    fontSize: "1.5rem",
                  }}
                >
                  50 pts
                </Text>
                <Text as="p" size="sm" style={{ color: "#737373" }}>
                  Sofisticación DeFi
                </Text>
              </Box>

              <Box
                direction="column"
                gap="sm"
                style={{
                  background: "white",
                  padding: "2rem",
                  borderRadius: "12px",
                  minWidth: "250px",
                  flex: 1,
                  margin: "0.5rem",
                  border: "1px solid #e5e5e5",
                }}
              >
                <Text
                  as="h4"
                  size="md"
                  style={{ color: "#171717", fontWeight: "600" }}
                >
                  Operaciones Activas
                </Text>
                <Text
                  as="p"
                  size="lg"
                  style={{
                    color: "#525252",
                    fontWeight: "700",
                    fontSize: "1.5rem",
                  }}
                >
                  40 pts
                </Text>
                <Text as="p" size="sm" style={{ color: "#737373" }}>
                  Participación ecosistema
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Final CTA */}
        <Box
          direction="column"
          gap="xl"
          style={{
            padding: "8rem 2rem",
            background: "#1f2937",
            textAlign: "center",
          }}
        >
          <Text
            as="h2"
            size="xl"
            style={{
              fontSize: "2.5rem",
              fontWeight: "600",
              color: "white",
              letterSpacing: "-0.02em",
              marginBottom: "1rem",
            }}
          >
            Construye tu Reputación Web3
          </Text>
          <Text
            as="p"
            size="lg"
            style={{
              fontSize: "1.125rem",
              color: "#d1d5db",
              maxWidth: "600px",
              margin: "0 auto 3rem auto",
              lineHeight: "1.7",
            }}
          >
            Únete a la revolución del credit scoring descentralizado. Tu
            historial blockchain es tu mejor carta de presentación.
          </Text>
        </Box>
      </Layout.Inset>
    </Layout.Content>
  );
};

export default Home;
