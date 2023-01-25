export default class PollOptions{
    constructor(pollType, pollQuestions, pollStatuses, pollComments = [], pollContributors = []){
        this.pollType = pollType;
        this.pollQuestions = pollQuestions;
        this.pollStatuses = pollStatuses;
        this.pollComments = pollComments;
        this.pollContributors = pollContributors;
    }
}