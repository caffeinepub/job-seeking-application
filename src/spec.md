# Specification

## Summary
**Goal:** Fix the infinite full-screen loading state after Internet Identity login by reliably fetching the caller’s user profile and using it to route users to Profile Setup or the dashboard.

**Planned changes:**
- Update the authenticated loading gate in `App.tsx` so it never depends on a profile query that is disabled or can never resolve; render Profile Setup when no profile exists and the Candidate Dashboard when a profile exists.
- Add backend public methods in `backend/main.mo` to read the caller’s stored profile (returning none/null when missing) and to create/update the caller’s profile, persisted in the existing in-memory `userProfiles` Map.
- Wire `useGetCallerUserProfile()` to call the new backend read method and enable the query when an actor is available, so `isLoading/isFetched/data` can be used reliably.

**User-visible outcome:** After logging in, users no longer get stuck on an indefinite spinner; they are taken directly to Profile Setup if they haven’t created a profile yet, or to the Candidate Dashboard if they have.
