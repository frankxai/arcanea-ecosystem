# Arcanea Ecosystem Design Handoff (arcanea-ecosystem)

> Local visual specifications. Consumes the global design operating contract at [starlight/design.md](file:///C:/Users/frank/starlight/design.md).

---

## 1 · Brand & Audience
- **Brand Identity:** Arcanea Ecosystem (Multiverse portfolio + cinematic showcases).
- **Target Audience:** Co-creation retreat members, superfans, investors, design leaders.
- **Key Emotions:** Epic depth, soulful narrative, cinematic luxury, sovereignty.

---

## 2 · Target Asset Queue
These are the assets required for the ecosystem portfolio showcase, video reels, and cinematic trailers.

| Project / Placement | Asset Description | Aspect Ratio | Dimensions | Preferred Model |
|---|---|---|---|---|
| **Ecosystem Portfolio Cover** | Cosmic threshold doorway emitting warm gold light and particles | `16:9` | 4K | `soul_cinematic` |
| **Cinematic Hero Video Still**| Epic wide shot of floating stone spires connected by gold threads | `2.39:1` | 4K | `cinematic_studio_2_5`|
| **Platform Promo Reel Hook** | 4-second cinematic clip of cosmic graph nodes igniting | `9:16` | 1080×1920 | `veo3_1` / `kling3_0` |
| **AI Artist Spotify Canvas** | 8-second slow-motion lo-fi animation matching Suno track | `9:16` | 1080×1920 | `seedance_2_0` |

---

## 3 · Visual Rules & Forbidden Aesthetics
- **Rules:** 100px – 180px padding for typography overlays, slow dollying, anamorphic flare simulation. Dark cinematic premium.
- **Forbidden:** Fast edits, generic modern sci-fi HUD overlays, flat vector icons, and stock photography styles.

---

## 4 · Rendering Pipelines (Higgsfield)
To generate the Spotify Canvas:
1. Import the Suno audio track using `media_import_url` to get `audio_id`.
2. Generate the base still image with `soul_cinematic` and Spec `starlight/higgsfield/experiments/artist-canvas-brief.md`.
3. Call `seedance_2_0` using the still image `job_id` and the `audio_id` as reference.
4. Enhance the output video via `upscale_video` (Topaz 2160p).
5. Run the video through the `virality_predictor` to check engagement potential.
6. Log all `job_id` strings and costs in [ledger.jsonl](file:///C:/Users/frank/starlight/higgsfield/ledger.jsonl).
