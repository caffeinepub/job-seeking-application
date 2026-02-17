# Specification

## Summary
**Goal:** Repair build/runtime issues and restore correct role-based dashboard routing so the app reliably compiles, loads, and routes users to the correct dashboard based on role.

**Planned changes:**
- Fix frontend build-time and runtime crashes caused by missing/empty React modules, missing exports, and unsafe usage of optional values (e.g., optional blob/logo/banner/profile picture fields).
- Correct authenticated routing to show CandidateDashboard for `#candidate`, EmployerDashboard for `#employer`, and AdminDashboard for admins (with a clear fallback if admin status cannot be determined).
- Ensure backend actor methods referenced by the frontend’s query/mutation hooks exist and match the generated candid interface (including user profile fetch/save/customization, any referenced company pages list retrieval, and admin detection where referenced), adjusting frontend usage or adding missing backend methods to prevent runtime failures.

**User-visible outcome:** The app builds successfully, loads the Landing Page when logged out, doesn’t crash during login/logout, completes profile setup, and routes signed-in users to the correct dashboard based on their role.
