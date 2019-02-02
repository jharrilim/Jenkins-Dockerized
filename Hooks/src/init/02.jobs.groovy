import jenkins.model.Jenkins
import org.jenkinsci.plugins.workflow.cps.CpsFlowDefinition
import org.jenkinsci.plugins.workflow.job.WorkflowJob

def jobDSL="""
node {
    stage("test") {
        foo 'Hello World'
    }
}
"""

def job = new WorkflowJob(Jenkins.get(), "my-test-job")
job.definition = new CpsFlowDefinition(jobDSL)

job.setConcurrentBuild(false)
job.save()
