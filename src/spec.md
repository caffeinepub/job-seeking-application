# Specification

## Summary
**Goal:** Add profile picture support so authenticated users can upload, save, remove, and see their profile picture across the app.

**Planned changes:**
- Backend: Persist a per-caller profile picture blob reference in the user profile record via `setProfileCustomization()` and return it from `getCallerUserProfile()`, stored in stable state for upgrade safety.
- Frontend: Extend the Profile Customization flow to upload an image, preview it, remove it, and save changes; validate file type (images only) and size (max 5MB) with clear English error messages.
- Frontend: Display the current user’s avatar in the authenticated app header, using the saved profile picture when present and falling back to initials when not; refresh/invalidate user profile query state after save so updates appear without manual refresh.

**User-visible outcome:** Users can upload and preview a profile picture, save it to their profile, remove it to revert to an initials avatar, and see the updated avatar reflected in the app header after saving.
