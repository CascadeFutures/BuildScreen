export class BuildInfo {

    public constructor(
        public id?: string,
        public buildTypeId?: string,
        public number?: string,
        public status?: string,
        public state?: string,
        public running?: string,
        public percentageComplete?: string,
        public branchName?: string,
        public href?: string,
        public webUrl?: string,
        public buildType?: string
    ) {

    }
}
