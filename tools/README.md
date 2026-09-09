# Rebuild the playlist-only reader

Run `python3 tools/build-playlist.py` from the repository root. The legacy command `node tools/build-html.mjs` now delegates to this same generator.

The build uses Python's standard library, `resources/playlist-manifest.json`, and `tools/learning.css`. It emits the standalone `index.html` and its inspectable `tools/playlist.js` source. No runtime framework or CDN is required.

Keep the evidence level (`transcript`, `description`, or `title-only`) accurate. Add detailed lesson notes only after obtaining and reading the corresponding source. Do not regenerate the prior generic companion or add material from other courses to this reader. Full transcripts and instructor slide decks are not bundled.

Current result: 56 ordered videos, one transcript summary with three redrawn diagrams, 34 description-based overviews and 21 title-only entries. This is a partial source-grounded edition, not a completed 56-chapter course.
