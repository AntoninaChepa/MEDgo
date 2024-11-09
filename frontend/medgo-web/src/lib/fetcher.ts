import { endpoints } from "./endpoints";

export async function fetcher(
  endpoint: string,
  {
    method,
    input,
    token,
    onUnauthorized,
    onNotFound,
  }:
    | (
        | { token: string; onUnauthorized: () => void }
        | { token?: never; onUnauthorized?: never }
      ) &
        (
          | {
              method: "POST" | "PUT" | "DELETE";
              input?: Record<string, unknown>;
            }
          | {
              method: "GET";
              input?: Record<string, string | number | string[]>;
            }
        ) & {
          onNotFound?: () => void;
        }
) {
  const buildUrlWithSearchQuery = ({
    input,
    endpoint: endpoint,
  }: {
    endpoint: string;
    input: Record<string, string | number | string[]> | undefined;
  }) => {
    if (!input) {
      return endpoint;
    }

    const stringifiedInput = Object.keys(input).reduce(
      (acc, curr) =>
        typeof input[curr] === "number"
          ? { ...acc, [curr]: input[curr].toString() }
          : { ...acc, [curr]: input[curr] },
      {}
    );
    const search = new URLSearchParams(stringifiedInput).toString();

    return `${endpoint}?${search}`;
  };

  const buildHeader = (
    method: "GET" | "POST" | "PUT" | "DELETE",
    hasInput: boolean,
    token: string | undefined
  ) => {
    let result: Record<string, string> = {
      Accept: "application/json",
      Origin: "",
    };

    if (method !== "GET" && hasInput) {
      result = {
        ...result,
        "Content-Type": "application/json",
      };
    }

    if (token) {
      result = {
        ...result,
        Authorization: `Bearer ${token}`,
      };

      return result;
    }
  };

  const buildBody = (
    method: "POST" | "PUT" | "DELETE" | "GET",
    input: Record<string, unknown> | undefined
  ) => {
    if (!input || method === "GET") {
      return;
    }

    return JSON.stringify(input);
  };

  const performRequest = (token: string | undefined) =>
    fetch(
      method !== "GET"
        ? endpoint
        : buildUrlWithSearchQuery({ endpoint, input }),
      {
        method,
        headers: buildHeader(method, !!input, token),
        body: buildBody(method, input),
        ...(endpoint === endpoints.auth.sign_in ||
        endpoint === endpoints.auth.sign_out ||
        endpoint === endpoints.auth.refresh_token
          ? { credentials: "include" }
          : {}),
      }
    );

  const response = await performRequest(token);

  if (response.status === 401) {
    onUnauthorized?.();
  }

  if (response.status === 404) {
    onNotFound?.();
  }

  if (!response.ok && response.status !== 304) {
    const error = await response.json();
    throw new Error(response.status + " " + error?.message, error);
  }

  return await response.json();
}
