## NodeJS Docker Workflow and Production ready Image Creation

This repository explains how is the workflow for E2E NodeJS development workflow with Docker. It also contains `Dockerfile` that creats a docker image for Production incorporating all possible best practices and recommendation from industry experts.

### Production Docker image considers these following points

- 1 app per container
- Properly handle `PID 1`
- Optimize for the Docker build cache
- Remove unnecessary tools
- Build the smallest image possible
- Running App in non-root mode
- Official Node image

Please let me know if I have missed anything. I am all ears!!
