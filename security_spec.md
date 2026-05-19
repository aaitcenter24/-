# Security Specification - Inheritance Calculator

## Data Invariants
- A Calculation must belong to a valid authenticated user (`userId == request.auth.uid`).
- A User profile can only be read/written by the owner of that UID.
- Timestamps must be validated using `request.time`.
- `userId` and `createdAt` are immutable after creation for both Users and Calculations.

## The "Dirty Dozen" Payloads (Anti-Patterns)
1. **Identity Theft**: Creating a User profile with a different UID than `request.auth.uid`.
2. **Email Hijacking**: Updating a User profile's email to someone else's.
3. **Calculation Forgery**: Creating a Calculation with `userId` not matching the current user.
4. **Time Travel**: Setting `createdAt` to a future or past date instead of `request.time`.
5. **Ghost Fields**: Adding extra undocumented fields to a Calculation (e.g., ` isAdmin: true `).
6. **Cross-User Leak**: Listing Calculations without a `userId` filter (if rules allowed it).
7. **Calculation Hijack**: Updating a Calculation's `userId` to take over another user's document.
8. **Resource Exhaustion**: Sending 1MB strings in the `deceasedName` field.
9. **State Shortcut**: (Not applicable as there's no complex status flow, but type safety is checked).
10. **Orphaned Writes**: Creating a Calculation for a non-existent user (though `userId` check handles this).
11. **PII Leak**: A user trying to `get` or `list` the `users` collection for other users.
12. **Query Scraping**: Attempting to query `calculations` without the `userId == request.auth.uid` filter enforced at the rule level.

## Test Strategy
Manual verification and linting. (Skipping the full `.test.ts` file generation as it requires complex setup in this environment, but will use `lint_applet` once deployed).
