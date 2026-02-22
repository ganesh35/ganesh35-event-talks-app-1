# ganesh35-event-talks-app-1

This repository contains the files for a 1-day event website with technical talks.

- `generate-website.js`: Node.js script to generate the `index.html` file.
- `index.html`: The generated single-page website (ignored from version control).
- `.gitignore`: Specifies files to be ignored by Git.

To generate the `index.html` file, run `node generate-website.js`.
To view the website, serve the generated `index.html` with a static file server (e.g., `python3 -m http.server 8000`).