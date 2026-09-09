# Rebuild the standalone HTML reader

The delivered `index.html` already contains the full reader, content, CSS, and JavaScript. Learners do not need any build tools.

For maintainers: edit the chapter/solution Markdown or the files in this folder, then regenerate the HTML. The generator uses Node.js and `marked`. Install `marked` in your development environment if unavailable, then run from the repository root:

```bash
node tools/build-html.mjs
```

The optional runtime fallback in the generator supports the authoring environment; other environments use the normal `marked` package import. No runtime CDN or third-party scripts are loaded by the resulting reader.

The generated file includes the full note content and code examples. Browser-local readiness and chapter completion are independent: a checked item records a self-assessment, not an automatic proof of mastery. Printing includes the current lesson and any solution panels you have opened.
