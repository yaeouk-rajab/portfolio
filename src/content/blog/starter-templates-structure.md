---
title: "What the starter templates include, and what they leave out"
description: "A tour of the shared decisions in the Android, .NET and iOS starter templates: error handling, secrets and the choices each one makes on purpose."
date: 2026-11-05
tags: ["templates", "android", "dotnet", "ios"]
draft: false
---

The starter templates are skeletons. They contain no domain code, so each one is mostly a set of decisions that are expensive to make again on every new project.

## Android: permanent errors are not retried

The Android Compose starter uses Retrofit, Room and a WorkManager offline queue. The queue separates permanent HTTP errors from transient ones. A 401, 403 or 422 is never retried, while transient failures are retried up to an attempt cap, so a request cannot retry forever.

Two smaller choices sit alongside it. The auth header is stored in Keystore-encrypted preferences, and OkHttp logging is kept at BASIC level so headers are not logged. ktlint runs in CI.

## .NET: refuse the placeholder secret

The .NET 10 minimal API starter on MongoDB ships with a development JWT secret. A startup guard refuses that placeholder in Production. Login is rate limited and returns one error for both an unknown user and a wrong password, so the response does not reveal which accounts exist.

Query-building logic lives in internal methods, so the shape of a MongoDB query can be unit tested as plain documents without a database. Tenancy and the background worker are optional folders rather than fixed parts of the layout.

## iOS: no third-party dependencies

The SwiftUI starter has no third-party Swift packages. It includes a GraphQL client and a subscription client, both built on URLSession, and stores tokens in the Keychain. The project is generated from `project.yml` with XcodeGen.

A deep-link coordinator handles push-notification taps in every app state. The code is compiled only by the macOS CI job, and real push delivery needs a physical device with real credentials, so that path is not verified end to end.

## Read the template before trusting it

Each template's README and CI configuration say what is actually checked. Start there before building on one.

Templates are published under [github.com/yaeouk-rajab](https://github.com/yaeouk-rajab).
