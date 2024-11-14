# Project Setup

## Frontend

The frontend is in `/frontend`. It is a next.js project that uses npm and node.

1. Please ensure you have [node.js](https://nodejs.org/en) installed on your machine.
2. ```sh
   cd frontend
   ```
3. ```sh
   npm install
   ```

### Formatting

We are using prettier for formatting the frontend.

#### in vscode (reccomended)

If you are using vscode, please install [the prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and set it up to "format on save". You can follow [this guide](https://www.digitalocean.com/community/tutorials/how-to-format-code-with-prettier-in-visual-studio-code) up to and including step 2.

#### from the command line

If you are using another editor that doesnt support prettier, or you can't set it up for some reason, you can also format your code using

(in `frontend`)
```sh
npm run format
```

## Backend

The backend is in `/backend`. It is an [oak server](https://oakserver.org/) that uses [deno](https://deno.com/).

### Project setup

1. Please ensure you have [deno](https://deno.com/) installed on your machine.
2. ```sh
   cd backend
   ```
3. ```sh
   deno install
   ```

### Formatting

We are using deno for formatting the backend.

#### in vscode (reccomended)

If you are using vscode, please install the [deno extension for vscode](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno). If you [setup vscode to format on save for the frontend](#in-vscode-reccomended), that should also work here.

#### from the command line

If you are using another editor that doesnt support deno, or you can't set it up for some reason, you can also format your code using

(in `backend`)
```bash
deno fmt
```

## Switching between frontend and backend in vscode

Deno and node proceses imports differently. This causes projects made for one to not work in the other. Remember that the frontend is using node and the backend is using deno.

When you need to switch between them, you need to run the `Deno: Enable` and `Deno: Disable` commands in vscode to let it know that you're working on the other project.

You can press ctrl+shift+p (or f1 on some systems) and type `deno enable` and then press enter to run the command.

Let everyone know if you discover a way of configuring this to happen automatically.
