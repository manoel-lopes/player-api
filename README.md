# A minimal api built with principles of Domain Driven Design and Clean Architecture

## ✨ Technologies

-   [ ] Postgres
-   [ ] Express
-   [ ] Typescript
-   [ ] Axios
-   [ ] Prisma ORM
-   [ ] Jest


# :desktop_computer: Usage

- Change the `.env.example` file on root project to on `.env` and fill with your postgres access credential and database.
- Run `yarn or npm i` to install the project dependencies and `yarn dev or npm run dev` to start the local server
- Starting the server The application will be available on `http://localhost:300`

# 🔖 Scripts

### To install all project dependencies

    yarn or npm i

### To start local server

    yar dev or npm run dev

### To run tests

    yar test or npm run test

### To generate test coverage report

    yarn coverage or npm run coverage

### To run the migrations

    yarn prisma:migrate:run or npm run prisma:migrate:run


# :speech_balloon: API Endpoints

## Post /team

To create a team must give the follow data

- name
- startDate
- state

If a value to "id" is not pass, the api creates one automatic.

If all data is correct the result will be

```json
{
  "id": "27d790c0-5cd1-4c17-912f-0e15321f3a26",
  "name": "teamA",
  "startDate": "2020-08-01T00:00:00.000Z",
  "state": "RJ"
}
```

## Post /player

To create a player, must give the follow data

- name
- position
- height
- weight

If a value to "id" is not pass, the api creates one automatic.

If all data is correct the result will be

```json
{
  "id": "d3caf09c-1f57-4840-a7b0-db34ca4f2185",
  "name": "player1",
  "position": "zagueiro",
  "height": 1.79,
  "weight": 71.5
}
```

## Put /link-team-to-player

To link a team to a player, must give the follow data

- playerId
- teamId

If all data is correct the result will be

```json
{
  "id": "d3caf09c-1f57-4840-a7b0-db34ca4f2185",
  "name": "player1",
  "height": 1.79,
  "weight": 71.5,
  "team": {
    "id": "27d790c0-5cd1-4c17-912f-0e15321f3a26",
    "name": "teamA",
    "startDate": "2020-08-01T00:00:00.000Z",
    "state": "RJ"
  },
  "position": "zagueiro"
}
```

## Put /unlink-team-from-player

To unlink a team from a player, must give the follow data

- playerId

If all data is correct the result will be

```json
{
  "id": "d3caf09c-1f57-4840-a7b0-db34ca4f2185",
  "name": "player1",
  "height": 1.79,
  "weight": 71.5,
  "position": "zagueiro"
}
```
