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

    issues.forEach(function(issue) {
      // Write the data to the database -> construct the right query
      driver.executeQuery(
        'CREATE (n:Issue { jiraPrimary: $jiraPrimary, jiras: $jiras, jiraPrimaryDateString: $jiraPrimaryDateString, product: $product, affectedVersionOldest: $affectedVersionOldest, affectedVersionNewest: $affectedVersionNewest, affectedVersions: $affectedVersions, issueTitle: $issueTitle, problem: $problem, precondition: $precondition, workaround: $workaround, fix: $fix})',
        issue,
        {database: 'test'}
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