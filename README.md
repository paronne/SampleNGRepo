## End to end testing of Servoy solutions example running on Sauce Labs.

### Prerequisites 

1 'Jenkins' https://jenkins-ci.org/
  - git plugin https://wiki.jenkins-ci.org/display/JENKINS/Git+Plugin
  - ant plugin https://wiki.jenkins-ci.org/display/JENKINS/Ant+Plugin
  - Sauce OnDemand plugin https://wiki.jenkins-ci.org/display/JENKINS/Sauce+OnDemand+Plugin

2 'npm' command available in path - a nodejs install https://nodejs.org/ will bring npm with it

3 'ant' command available in path

4 'ant-contrib' simply copy ant-contrib*.jar to the $ANT_HOME/lib/ folder - http://ant-contrib.sourceforge.net/#install

5 'Servoy 8' full install, will be used to export solutions to war files

### Description

The entry point is build.xml. It takes a servoy solution project (the 'hello' folder), exports it as a war file ('e2e/war_export/hello.war'), starts a tomcat server instance (the 'apache-tomcat-8.0.24' folder),  deploys the war, runs the protractor test scripts e2e/spec/hello/*_spec.js, undeploys the war file and shuts down tomcat.

To add another solution, check out the project (and it's resources project) in the jenkins workpace near the 'hello' project and add its name in test_runner.properties in the variable 'solutions_to_export_as_war_tests'. Eg:

```
solutions_to_export_as_war_tests			= hello \
mySolution
```

### e2e

The e2e/build.xml runs the selenium test suites e2e/ui_tests/svyAngularUIBootstrapButtonsRadio_test/*_test, protractor test scripts e2e/spec/svyAngularUIBootstrapButtonsRadio_test/*_spec.js and parallel selenium test suites e2e/load_tests/svyAngularUIBootstrapButtonsRadio_test/*_test for load testing.

The script runs Selenium Test Suites and Test Cases recorded with Selenium IDE using selenese-runner. Selenese-runner runs the tests on saucelabs hubs using the remote drivers.

Selenium e2e tests: For each tested solution (in this example there is only one) the folder e2e/ui_tests/ has to contain a folder with the same name as the tested solution. So for each tested solution, the script looks in e2e/ui_tests for a folder with the exact name as the solution and runs all the files ending in '_test'.

Tests should then be added in the folder e2e/ui_tests/mySolution/ and should end with '_test'.

Set the solutions names and the path to the selenese-runner default configuration in the file e2e/test_properties.properties.

Set the baseurl and the remote-url to your own saucelabs hub in the config options for selenese-runner.

```
basedir = .
selrunner.enabled = yep		# remove this property if you would like NOT to run ui testing
selrunner.dir = ui_tests	#directory containing the test solutions. Default is 'ui_tests'
selrunner.solution.name = hello, mySolution  #the solutions to run tests against
selrunner.conf = ./config.txt   #config options for selenese-runner
selrunner.multithread = true	#run in selenese-runner in parallel for each configuration. Default false.
selrunner.failonerror = true	#force the task to fail if any of the test fails. When multithread is off the job will terminate immediately. Default false.
```

Execute selenese-runner on multiple environment by defining each environment configuration in the e2e/selrunner.config.json.

```
{
    "firefox": {
        "-d":"firefox",
        "--html-result" : "html_results\\firefox"
    },
    "chrome" : {
        "-d": "chrome",
        "--chromedriver" : "drivers\\chromedriver.exe",
        "--html-result" : "html_results\\chrome"
    }
}
```

The script runs protractor to run Unit testing.

Protractor e2e tests: For each tested solution (in this example there is only one) the folder e2e/spec/ has to contain a folder with the same name as the tested solution. So for each tested solution, the script looks in e2e/spec for a folder with the exact name as the solution and runs all the files ending in '_spec.js'.

Tests should then be added in the folder e2e/spec/mySolution/ and should end with '_spec.js'.*

Set the baseUrl and the sauceUser/sauceKey of your own saucelabs account in the protractor configuration.

```
basedir = .
protractor.enabled = yep	# remove this property if you would like NOT to run protractor
protractor.solution.name = hello, mySolution  #the solutions to run tests against
protractor.conf = ./protractor.config.js    #configuration for protractor tests
```

The script runs parallel selenese-runner jobs to simulate load testing on the server. Use phantomjs to run all tests headless.

Selenium e2e load tests: For each solution you would like to perform load testing (in this example there is none) the folder e2e/load_tests/ has to contain a folder with the same name as the tested solution. So for each tested solution, the script looks in e2e/load_tests for a folder with the exact name as the solution and runs all the files ending in '_test'.

Tests should then be added in the folder e2e/load_tests/mySolution/ and should end with '_test'.

Set the solutions names and the path to the selenese-runner default configuration in the file e2e/test_properties.properties.

Set the baseurl in the config options for selenese-runner.

```
basedir = .
selrunner.load.enabled = yep	#remove this property if you would like NOT to run load testing
selrunner.load.dir = ui_tests	#directory containing the test solutions. Default is 'load_tests'
selrunner.load.solution.name = svyAngularUIBootstrapButtonsRadio_test	#the solutions to run load tests against
selrunner.load.conf = ./config_load.txt 	#config options for selenese-runner
selrunner.load.threads = 10		#number of thread to run in parallel for the load testing. Default is 10.
```

### Setup

1 Create a Freestyle jenkins job.

2 Add this git repository URL:https://github.com/Servoy/servoy_e2e_test_example.git Branch Specifier:*/master

3 Enable Sauce labs support and Sauce Connect. Override default authentication with your Sauce labs account credentials. Under 'Sauce Connect Advanced Options' click the 'Advanced' button and fill in 
```
Sauce Connect Options: --vm-version dev-varnish
```

4 Add an 'Invoke Ant' build step. And fill in as follows
```
  - Targets: 	run_war_solution_tests
  - Build File: e2e_test_runner.xml
  - Properties: jdk1.8_home = /usr/lib/jvm/java-8-oracle
				servoy_install = /usr/local/servoy
				sauceUserPlaceholder=sauceLabsUserName
				sauceKeyPlaceholder=sauceLabsAceessKey
```
Note: The values for the ant properties are provided as an example, they should be customised to match your instalation and Sauce Labs account.

5 Add a 'Publish JUnit test result report' post build action and fill in 'Test report XMLs' with 
e2e/testResults/*.xml

6 Optionally add a 'Run Sauce Labs Test Publisher' post build action.

*This configuration can be changed in e2e/servoyConfigurator.js. To changed other protractor (http://www.protractortest.org/#/) settings see file e2e/protractor.config.js.template. It is currently a template because before each run the ant script injects the sauce labs credentials specified as ant properties.