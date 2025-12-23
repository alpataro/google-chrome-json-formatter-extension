(function () {
  try {
    const text = document.body.innerText.trim();

    if (!text.startsWith("{") && !text.startsWith("[")) return;

    const json = JSON.parse(text);

    function syntaxHighlight(json) {
      json = JSON.stringify(json, null, 2);
      json = json
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      return json.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function (match) {
          let cls = "number";
          if (/^"/.test(match)) {
            cls = /:$/.test(match) ? "key" : "string";
          } else if (/true|false/.test(match)) {
            cls = "boolean";
          } else if (/null/.test(match)) {
            cls = "null";
          }
          return `<span class="${cls}">${match}</span>`;
        }
      );
    }

    document.documentElement.innerHTML = `
      <html>
        <head>
          <title>JSON Formatter</title>
          <style>
            body {
              font-family: monospace;
              background: #f4f6f8;
              padding: 16px;
            }
            pre {
              white-space: pre-wrap;
              background: #fff;
              padding: 16px;
              border-radius: 8px;
            }
            .key { color: #005cc5; }
            .string { color: #22863a; }
            .number { color: #e36209; }
            .boolean { color: #6f42c1; }
            .null { color: #6a737d; }
          </style>
        </head>
        <body>
          <pre>${syntaxHighlight(json)}</pre>
        </body>
      </html>
    `;
  } catch (e) {}
})();
