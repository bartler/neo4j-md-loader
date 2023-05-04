class Issue {
    jiraPrimary: String
    jiras: String[]
    jiraPrimaryDate: Date
    jiraPrimaryDateString: String
    product: String
    affectedVersionOldest: String  
    affectedVersionNewest: String
    affectedVersions: String[]
    issueTitle: String  
    problem: String
    precondition: String
    workaround: String
    fix: String  
    constructor() {
    }
}

export default new Issue();