# eb-tokens-www

> Frontend for accessing the EB Tokens API.


## Production

1. Copy `.env.dist` to `secrets/env.prod` and set environment variables.

1. Build the project and start it:

    ```
    npm install
    npm run build
    npm run start
    ```

    Server will start on `http://localhost:3006`

## Development

1. Copy `.env.dist` to `secrets/env.dev` and set environment variables.

1. Build the project and start it:

    ```
    npm install
    npm run dev
    ```

    Server will start on `http://localhost:3006`

## Environment Variables

The following environment variables need to be set for the app to run. An empty template for the env file is `.env.dist`. For development, copy the file to `secrets/env.dev`; for production, `secrets/env.prod`.

- `EB_TOKENS_API_URL` -- The base URL to the eb-tokens-api service. This should not include the API version in the URL (e.g. the `/v1` bit).
