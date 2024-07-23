import "server-only";

import { experimental_taintUniqueValue } from "react";

export const token = process.env.SANITY_API_READ_TOKEN;
export const editorToken = process.env.SANITY_API_EDITOR_TOKEN;

if (!token) {
  throw new Error("Missing SANITY_API_READ_TOKEN");
}

if (!editorToken) {
  throw new Error("Missing SANITY_API_EDITOR_TOKEN");
}

experimental_taintUniqueValue(
  "Do not pass the sanity API read token to the client.",
  process,
  token,
);

experimental_taintUniqueValue(
  "Do not pass the sanity API developer token to the client.",
  process,
  editorToken,
);
