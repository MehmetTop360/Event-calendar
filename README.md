# Event Calendar with TRPC

## Description

This project's idea has been taken from https://github.com/joereynolds/what-to-code. The idea is changed to fit the sprint projects requirements more.

`An online calendar that doesn't require login or auth. You create a calendar and get a permalink. Anyone with that permalink is free to add events etc...`

This project is an online calendar application that allows users to create calendars, add, view, and remove events, and share these calendars with others via a permalink. The visitors can also add and view events to calendars. This application aims to provide an intuitive and user-friendly interface for calendar management and sharing.

## Live link

You have to sign up to use the application. You can sign up with a fake email and password.

https://event-calendar.11mi7jif6hhlq.eu-central-1.cs.amazonlightsail.com/

For an example of a shared calendar, you can check the following permalink:

https://event-calendar.11mi7jif6hhlq.eu-central-1.cs.amazonlightsail.com/calendar/example

## Setup

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Create a PostgreSQL database.
4. Create a `.env` file in the root directory and add environment variables based on the example in `.env.example`.
5. Run `npm run dev` to start the development server or you can use `docker compose up` to start the server.

## Tests

```bash
# front end unit and E2E tests
npm test -w client

# front end unit tests
npm run test:unit -w client

# front end E2E tests
npm run test:e2e -w client

# back end tests with an in-memory database
npm test -w server

# back end tests with a development database
npm run test:db -w server
```

## What can you do in this application?

As a User, I can:

- Sign up and log in to create a personal account.
- Create calendars to organize my events.
- Add events to any calendar, including details such as title, description, start and end times, and event type.
- Delete events in calendars I own to manage my schedule.
- View my calendars with all events in a calendar format.
- Share calendars with a unique permalink.
- View real-time updates on my calendars.

As a Visitor (without signing up), I can:

- View calendars using a permalink shared with me.
- View events on any calendar.
- Create events in any calendar.

## Links

<a target="_blank" href="https://icons8.com/icon/nkGDoqzPxYM3/calendar">Calendar</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
