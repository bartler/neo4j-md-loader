import neo4j from 'neo4j-driver'
import { Driver } from 'neo4j-driver-core';

class IssuesDb {
  public driver: Driver;

  constructor() {
    this.driver =  neo4j.driver( 'neo4j://localhost', neo4j.auth.basic('neo4j', 'password') )
  }
}

export default new IssuesDb().driver;