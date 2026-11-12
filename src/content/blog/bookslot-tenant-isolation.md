---
title: "Tenant isolation in Postgres, not only in application code"
description: "How bookslot uses Row-Level Security, split database roles and an exclusion constraint so that a bug in one layer does not leak data or double-book."
date: 2026-10-20
tags: ["postgres", "multi-tenancy", "laravel"]
draft: false
---

bookslot is a multi-tenant booking API. Each business (a tenant) has its own services, availability and appointments, and one tenant's data must never appear in another's responses.

The usual way to enforce that is a tenant condition in every query. It works until one query forgets it. bookslot also asks Postgres to enforce the rule with **Row-Level Security**, so the database itself filters rows by tenant. Tenant isolation is enforced in Postgres itself, not only in application code.

## Separate roles for runtime and migrations

The application connects with a runtime role that is subject to RLS. Schema changes run under a separate migrator role. The request-serving code therefore cannot bypass the policies just by using a more privileged connection.

A dedicated tenant-isolation test suite exercises this behaviour.

## A constraint for double bookings

Checking for overlapping bookings in application code is racy under concurrent requests. bookslot stores each appointment's occupied time as a `tstzrange` and adds a GIST exclusion constraint on tenant, staff member and that range, ignoring cancelled and no-show appointments. Two overlapping active bookings for the same staff member cannot both be written, whatever the application does.

This is also why the test suite never runs on SQLite. RLS, GIST exclusion constraints and `tstzrange` are Postgres features, and a SQLite run would not exercise them.

## Keeping payments out of long transactions

Owner routes that call Stripe use a separate auth middleware, so no database transaction is held open across a network call to the payment provider.

## What this does not show

bookslot is a private commercial project and is not deployed publicly. Its Stripe flows have only been used in test mode, with no live payment provider. The isolation tests and CI checks cover the repository; they are not evidence of a production setup.

Source: [yaeouk-rajab/bookslot](https://github.com/yaeouk-rajab/bookslot).
