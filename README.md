# Jenkins - Dockerized

## Getting Started

### Dependencies

- Docker
- Node.JS

### Run

Use the CLI tool for automation:

1. Restore dependency packages.

    ```sh
    npm install
    ```

1. Build the Docker image and run a container named `jenkins`.

    ```sh
    npm start
    ```

1. Wait for the Jenkins master to initialize.

    ```sh
    # you can watch all the container logs
    docker logs --follow jenkins

    # or wait for this command to return
    docker logs --follow jenkins 2>&1 | \
    grep --max-count=1 --before-context=1 "Jenkins is fully up and running"
    ```

1. Hit [http://localhost:8080](http://localhost:8080)

## Repository Structure

- [`JCasC/`]: Configuration files for [Jenkins Configurations as Code plugin]
- [`Hooks/`]: Jenkins [Hook Scripts]

[`JCasC/`]: ./JCasC/
[Jenkins Configurations as Code plugin]: https://github.com/jenkinsci/configuration-as-code-plugin
[`Hooks/`]: ./Hooks/
[Hook Scripts]: https://wiki.jenkins.io/display/JENKINS/Groovy+Hook+Script
