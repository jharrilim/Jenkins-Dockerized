FROM jenkins/jenkins:lts

## Install JCasC plugin
# https://github.com/jenkinsci/configuration-as-code-plugin
COPY JCasC/*.yaml /var/jcasc_configs/
ENV CASC_JENKINS_CONFIG="/var/jcasc_configs"
RUN /usr/local/bin/install-plugins.sh configuration-as-code

## Copy Groovy Hook Scripts
# https://wiki.jenkins.io/display/JENKINS/Groovy+Hook+Script
COPY Hooks/src/init/*.groovy /usr/share/jenkins/ref/init.groovy.d/
