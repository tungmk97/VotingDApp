import {Default} from './loadBlockchain.js';
import {ElectionData} from './loadElections.js';

export class Election {
constructor(address) {
  this.address = address;
}

init = async () => {
  await this.loadElectionContract();
}

loadElectionContract = async () => {
  var electionABI = await $.getJSON('/electionJSON');
  this.election = await new web3.eth.Contract(electionABI, this.address);
  await this.election.setProvider(web3.currentProvider);
}

getDetails = async () => {
  var details = {};

  details.candidates      = [];
  details.address         = this.address;
  details.candidatesCount = await this.election.methods.candidatesCount().call()
  details.name            = await this.election.methods.name().call();
  details.description     = await this.election.methods.description().call();
  details.hasVoted        = await this.election.methods.voters(Default.account).call();

  for(var i = 0; i < details.candidatesCount; i++) {
      var candidate = await this.election.methods.candidates(i).call()

      details.candidates.push({
          name: candidate.name,
          voteCount: candidate.voteCount
      });
  }

  return details;
}

castVote = async (candidateId) => {
  await this.election.methods.vote(candidateId).send({ from: Default.account });
  await ElectionData.get();
}
}