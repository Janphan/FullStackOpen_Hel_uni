0.4: New note diagram
Diagram depicting the situation where the user creates a new note on the page 
https://studies.cs.helsinki.fi/exampleapp/notes 
by writing something into the text field and clicking the Save button.
```mermaid
    participant browser
    participant server
button clicked: browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
activate server
Redirect URL
server-->>browser: GET https://studies.cs.helsinki.fi/exampleapp/notes
deactivate server

Reload causes 3 HTTP requests
browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->>browser: the css file
browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->>browser: the JavaScript file

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]

Network tab:
browser: Form tag: action + method: POST https://studies.cs.helsinki.fi/exampleapp/new_note
server: Save /new_note to database

```
