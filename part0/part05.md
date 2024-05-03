
```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST /exampleapp/new_note_spa HTTP/1.1
    server-->>browser: Json file [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
```
