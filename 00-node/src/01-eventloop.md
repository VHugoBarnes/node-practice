# Event Loop: Asynchronous by design

## What's the Event Loop?
A process with a loop that manages, asynchronously, all events in your application.

### Key points
- The Event Loop does not block.   
- That's why Node.js is the best on Concurrency and apps that requires a lot of io.   

The event loop can be portrayed as follows

```
                      Event Loop
+-------------+                          +-----------+
|   Function  |--->  /-----------\  ---> | DB Ops    |  <---> Thread
|   Request   |     |             |      | Files     |  <---> Thread
|   Event     |     |  Event Loop |      | Slow Ops  |  <---> Thread
|             |     |             |      |           |
| Event queue |<---  \ ----------/  <--- |Thread pool|
+-------------+                          +-----------+
```

When a process may take a long time to process the event loop will pass it to the `Thread pool`. The `Thread pool` will take up a thread to complete the process.
