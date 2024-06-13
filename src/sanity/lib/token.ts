import "server-only";

import { experimental_taintUniqueValue } from "react";

export const token = process.env.SANITY_API_READ_TOKEN;
export const developerToken = process.env.SANITY_API_DEVELOPER_TOKEN;

if (!token) {
  throw new Error("Missing SANITY_API_READ_TOKEN");
}

if (!developerToken) {
  throw new Error("Missing SANITY_API_DEVELOPER_TOKEN");
}

experimental_taintUniqueValue(
  "Do not pass the sanity API read token to the client.",
  process,
  token,
);

experimental_taintUniqueValue(
  "Do not pass the sanity API developer token to the client.",
  process,
  developerToken,
);
