import React from "react";
import Container from "../components/container";
import PageWrapper from "../components/page-wrapper";

export default function Loading() {
  return (
    <PageWrapper>
      <Container>
        <p style={{ textAlign: "center", fontSize: "1.5rem" }}>Loading...</p>
      </Container>
    </PageWrapper>
  );
}
