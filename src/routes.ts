import { Router } from 'express';
import driver from './issuesDb';
import parser from './parser';
import * as fs from 'fs';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello, Whirled' });
});

routes.get('/parseIssues', async (req, res) => {

  // we could accept a POSTed file or JSON,
  // but for this proof of concept, 
  // executing the GET route simply ingests the markdown 
  // from a hard-coded file, and returns the resulting issues in a JSON array

  try {
    const md = fs.readFileSync('issues.mdx','utf8');
    const issues = parser(md);
    // clean db before loading issues -- for testing, do not leave in long-term
    driver.executeQuery(
      'MATCH (n) DETACH DELETE n',
      {},
      {database: 'tshoot'}
    )
    .then((result) => { })//return result.records.map( (r) => r.get('Issue') ) })
    .catch( (error) => { return error}) //console.error(error) })

    // create constraints -- should probably move elsewhere in the program logic
    // usually do this when you start up a program
    // and check that the constraint is online

    driver.executeQuery(
      'create constraint if not exists for (n:Version) require (n.version) is node key',
      {},
      {database: 'tshoot'}
    )
    .then((result) => { })//return result.records.map( (r) => r.get('Issue') ) })
    .catch( (error) => { return error}) //console.error(error) })

    driver.executeQuery(
      'create constraint if not exists for (n:Issue) require (n.jiraPrimary) is node key',
      {},
      {database: 'tshoot'}
    )
    .then((result) => { })//return result.records.map( (r) => r.get('Issue') ) })
    .catch( (error) => { return error}) //console.error(error) })

    issues.forEach(function(issue) {
      // Write the data to the database -> construct the right query
      // TO-DO: send batch of issues and use UNWIND to create nodes
      driver.executeQuery(
        'MERGE (issue:Issue{jiraPrimary: $jiraPrimary}) set issue.issueTitle = $issueTitle, issue.problem = $problem, issue.precondition = trim($precondition), issue.workaround = trim($workaround), issue.fix = $fix, issue.jiraPrimaryDateString = $jiraPrimaryDateString,  issue.jiras = $jiras MERGE (oldestV:Version{version:$affectedVersionOldest}) MERGE (newestV:Version{version:$affectedVersionNewest}) MERGE (issue)-[:FIRST_SEEN_IN]->(oldestV) MERGE (issue)-[:LAST_SEEN_IN]->(newestV)',
        issue,
        {database: 'tshoot'}
      )
      .then((result) => { })//return result.records.map( (r) => r.get('Issue') ) })
      .catch( (error) => { return error}) //console.error(error) })
    });

    return res.json(issues);
  } catch(ex) {
    return ex.message;
  }

});

export default routes;