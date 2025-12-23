(function () {
  try {
    // Get page text
    const text = document.body.innerText.trim();

    // Quick check: is it JSON?
    if (!text.startsWith("{") && !text.startsWith("[")) return;

    // Parse JSON
    const json = JSON.parse(text);

    // Replace page with formatted JSON
    document.documentElement.innerHTML = `
      <html>
        <head>
          <title>JSON Formatter</title>
          <style>
            body {
              font-family: monospace;
              background: #f7f7f7;
              padding: 16px;
            }
            pre {
              white-space: pre-wrap;
              background: white;
              padding: 16px;
              border-radius: 6px;
            }
          </style>
        </head>
        <body>
          <pre>${JSON.stringify(json, null, 2)}</pre>
        </body>
      </html>
    `;
  } catch (e) {
    // Not valid JSON, do nothing
  }
})();
