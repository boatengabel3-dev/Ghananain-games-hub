# Security Specification & Threat Model for Ghana Games Firestore

## 1. Data Invariants
- **Public Read Access**: Visitors and learners worldwide must be able to view traditional games imagery, story photography, and site settings without logging in.
- **Write Verification**: Creating or updating image assets must require an authenticated, email-verified user (`request.auth.token.email_verified == true`).
- **Data Boundary Constraints**: Image strings (URLs or Base64 data strings) must not exceed 1,000,000 characters to protect against wallet exhaustion / denial-of-wallet payload attacks.
- **Document ID Poisoning Protection**: All path IDs (`settingId`, `gameId`, `storyId`) must conform to `^[a-zA-Z0-9_\-]+$` and be <= 128 characters.
- **Strict Key Adherence**: Documents cannot contain unknown shadow/ghost fields.
- **Admin Privilege Escalation Guard**: Role escalation via unverified client tokens is rejected. Bootstrapped admin is `boatengsamuel6957@gmail.com`.

## 2. The "Dirty Dozen" Payloads
1. **Unauthenticated Write**: Writing to `/settings/site` without an auth token. (Expect: PERMISSION_DENIED)
2. **Unverified Email Write**: Writing with `email_verified: false`. (Expect: PERMISSION_DENIED)
3. **Ghost Field Poisoning**: Inserting `{ heroImage: "...", elderAvatar: "...", shadowField: true }`. (Expect: PERMISSION_DENIED)
4. **Giant Payload Attack**: Image string exceeding 1,000,000 characters. (Expect: PERMISSION_DENIED)
5. **ID Injection Attack**: Writing to `/game_assets/..%2F..%2Fhack` or junk characters. (Expect: PERMISSION_DENIED)
6. **Missing Required Field in Settings**: `{ heroImage: "..." }` missing `elderAvatar`. (Expect: PERMISSION_DENIED)
7. **Type Confusion Attack**: Sending a boolean `image: true` instead of string. (Expect: PERMISSION_DENIED)
8. **Negative Length / Empty Image**: Image string of length 0. (Expect: PERMISSION_DENIED)
9. **Arbitrary Collection Write**: Attempting write to undeclared collection `/secret_keys/doc`. (Expect: PERMISSION_DENIED via Catch-all default deny)
10. **Game ID Mismatch**: Document at `/game_assets/oware` having payload `{ id: "ampe", image: "..." }`. (Expect: PERMISSION_DENIED)
11. **Story ID Mismatch**: Document at `/story_assets/story-1` having payload `{ id: "story-2", image: "..." }`. (Expect: PERMISSION_DENIED)
12. **Unauthorized Deletion**: Non-admin user attempting to delete core settings document `/settings/site`. (Expect: PERMISSION_DENIED)
