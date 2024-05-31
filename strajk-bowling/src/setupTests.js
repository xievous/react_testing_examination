import { afterAll, afterEach, beforeAll } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { server } from "./mocks/server";

afterEach(() => {
  cleanup();
});

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});