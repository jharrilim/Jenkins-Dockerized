# Jenkins Pipelines Test

```sh
docker run --name jenkins --detach --publish 8080:8080 --publish 50000:50000 --volume /path/to/jenkins_home:/var/jenkins_home jenkins/jenkins:lts
```

```sh
function jenkins-recreate() {
    docker rm -fv jenkins
    rm -rfv ./jenkins_home/

    docker build --tag my-jenkins --no-cache . && \
    docker run --name jenkins --detach --publish 8080:8080 --publish 50000:50000 --volume "$PWD/jenkins_home":/var/jenkins_home my-jenkins && \
    echo 'Jenkins is running at http://localhost:8080'

    docker logs --follow jenkins
}
```

## Repository Structure

- [`JCasC/`]: Configuration files for [Jenkins Configurations as Code plugin]
- [`vars/`]: [Shared Library] variables

[`JCasC/`]: ./JCasC/
[Jenkins Configurations as Code plugin]: https://github.com/jenkinsci/configuration-as-code-plugin
[`vars/`]: ./vars/
[Shared Library]: https://jenkins.io/doc/book/pipeline/shared-libraries/