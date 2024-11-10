

# UpBot

UpBot is a robust, fault-tolerant monitoring and notification service designed to maintain the uptime of servers or applications by sending periodic pings. Users can add URLs, allowing UpBot to check the server's status every 10 minutes, ensuring it returns a 200 status response. Notifications can be sent through email or Discord webhooks, providing real-time alerts for uptime status.

## Key Features

1. **Automated Uptime Monitoring**: Pings specified URLs every 10 minutes, ensuring servers respond with a 200 status code.
2. **Multi-Channel Notifications**:
   - **Email**: Notifications sent via Gmail.
   - **Discord**: Users can add a Discord webhook for notifications.
3. **Fault-Tolerant Design**:
   - Uses Redis for queue management to handle and monitor tasks.
   - Employs Docker Compose for easy setup and dependency management.
   - Redis-backed notifications and updates.
4. **Dynamic User Configuration**:
   - One-step setup for URL tracking.
5. **Persistence and Reliability**:
   - Utilizes Redis for caching to optimize response times.
   - MongoDB for storing persistent data and user configurations.
6. **Highly Scalable**:
   - Designed with Docker for containerized deployment.
   - Integration with a Redis-backed message queue, enabling easy scaling of services.

## Service Components

### [`upbot-go` Service (Go)](https://github.com/VineeTagarwaL-code/upbot-server-go)

The core backend of the UpBot service is built in Go, leveraging Gin for HTTP request handling, Redis for caching, and MongoDB for data storage.

- **Gin Framework**: Manages HTTP endpoints for URL management, monitoring, and notifications.
- **Redis Queue**: Redis is used for task management, caching, and implementing a pub/sub model for real-time message broadcasting.
- **MongoDB**: Persistent storage for user configurations, URL data, and notification settings.


## License

This project is licensed under the MIT License.

