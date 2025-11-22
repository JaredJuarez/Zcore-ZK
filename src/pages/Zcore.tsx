import React from "react";
import { Layout, Text } from "@stellar/design-system";
import { ZcoreForm } from "../components/ZcoreForm";
import { Box } from "../components/layout/Box";

const Zcore: React.FC = () => {
  return (
    <div style={{ marginTop: "2rem" }}>
      <Layout.Content>
        <Layout.Inset>
          <Text as="h1" size="xl">
            Zcore Credit Scoring
          </Text>
          <Text as="p" size="md">
            Generate zero-knowledge proofs for your credit score calculation.
            Your personal data is hashed and kept private while proving your
            score meets the requirements.
          </Text>

          <Box gap="md" direction="column" style={{ marginTop: "2rem" }}>
            <ZcoreForm />
          </Box>
        </Layout.Inset>
      </Layout.Content>
    </div>
  );
};

export default Zcore;
