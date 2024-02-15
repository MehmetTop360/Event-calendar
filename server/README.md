# Event Calendar with TRPC

This project's idea has been taken from https://github.com/joereynolds/what-to-code. The idea is changed to fit the sprint projects requirements more.

```
An online calendar that doesn't require login or auth. You create a calendar and get a permalink. Anyone with that permalink is free to add events etc...
```

 This project is an online calendar application that allows users to create calendars, add, view, and remove events, and share these calendars with others via a permalink. The visitors can also add and view events to calendars. This application aims to provide an intuitive and user-friendly interface for calendar management and sharing.

## User stories

As a User, I can:

-    Sign up and log in to create a personalized account.
-    Create calendars to organize my events.
-    Add events to any calendar, including details such as title, description, start and end times, and event type.
-    Delete events in calendars I own to manage my schedule.
-    View my calendars with all events in a calendar format.
-    Share calendars using a unique permalink.
-    View real-time updates on my calendars (to be implemented in the next phase).

As a Visitor (without signing up), I can:

-    View calendars using a permalink shared with me.
-    View events on any calendar.
-    Create events in any calendar.


## Prerequisites

## Setup

1. `npm install`
2. Create a PostgreSQL database.
3. Add credentials to `.env` file based on `.env.example`.

## Running the server

In development mode:

```bash
# automatically restarts the server
npm run dev

# uses in-memory pg-mem database
npm run dev:mem
```

## Tests

```bash
# runs tests against an in-memory pg-mem database
npm test

# runs tests with the configured database
npm run test:db
```

## Future addition ideas I have are as follows:

-    Implementing real-time updates using WebSockets or tRPC subscriptions.
-    Extending functionality to allow visitors to add events (with user permission).
-    Integration with external APIs for additional features like email notifications or map locations.