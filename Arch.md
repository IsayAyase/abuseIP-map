CQRS - Command Query Responsibility Segregatio
(Separate read and write concerns)
It’s basically a CQRS pattern:
Command side (writes) → Your ETL service with AbuseIPDB + IP API
Query side (reads) → Your Next.js app
