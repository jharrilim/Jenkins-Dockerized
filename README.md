# Jenkins - Dockerized

## Getting Started

```sh
docker build --tag my-jenkins --no-cache .
docker run --name jenkins --detach --publish 8080:8080 --publish 50000:50000 --volume "$PWD/jenkins_home":/var/jenkins_home my-jenkins
# Jenkins is running. Head to http://localhost:8080
# see its logs:
docker logs --follow jenkins
```

## Development

```sh
function jenkins-recreate() {
    docker rm -fv jenkins
    rm -rfv ./jenkins_home/

    docker build --tag my-jenkins . && \
    docker run --name jenkins --detach --publish 8080:8080 --publish 50000:50000 --volume "$PWD/jenkins_home":/var/jenkins_home my-jenkins && \
    echo 'Jenkins is running at http://localhost:8080'

    docker logs --follow jenkins
}
```

## Repository Structure

- [`JCasC/`]: Configuration files for [Jenkins Configurations as Code plugin]
- [`Hooks/`]: Jenkins [Hook Scripts]

[`JCasC/`]: ./JCasC/
[Jenkins Configurations as Code plugin]: https://github.com/jenkinsci/configuration-as-code-plugin
[`Hooks/`]: ./Hooks/
[Hook Scripts]: https://wiki.jenkins.io/display/JENKINS/Groovy+Hook+Script
