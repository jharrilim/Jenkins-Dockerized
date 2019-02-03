import jenkins.model.Jenkins
import org.jenkinsci.plugins.workflow.cps.CpsFlowDefinition
import org.jenkinsci.plugins.workflow.job.WorkflowJob

def jobDSL="""
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Calling the shared library...'
                foo 'Hello World!'
                step([\$class: 'GitHubSetCommitStatusBuilder'])
        }
    }
}
"""

def job = new WorkflowJob(Jenkins.get(), "my-test-job")
job.definition = new CpsFlowDefinition(jobDSL)

job.setConcurrentBuild(false)
job.save()
