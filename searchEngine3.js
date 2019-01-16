/* Iteration 3: Pre-compute NLP at page load */

// pre-compute NLP stuff to hide NLP's really bad latency
const nlp_episodes = episodes.map(season => season.map(ep => 
    ({title: nlp_reduce(ep.title), episode: ep.episode})
)); // this is functionally equivalent to the commented-out code below:

/*
let nlp_episodes = [];
for(let i = 0; i < episodes.length; i++) {
    let currSeason = [];
    for(let j = 0; j < episodes[i].length; j++) {
        currSeason.push({title: nlp_reduce(episodes[i][j].title), episode: episodes[i][j].episode});
    }
    nlp_episodes.push(currSeason);
}
*/

// argmax(jaccard(input, e)) for e ranging over all episodes
function findEpisode(input) {
    const nlp_input = nlp_reduce(input); // DIFF
    
	let desiredEpisode;
	let maxJaccard = -1;
	for(let i = 0; i < episodes.length; i++) {
        const jaccardValues = nlp_episodes[i].map(ep => jaccard(nlp_input, ep.title)); // DIFF
        const maxIndex = jaccardValues.indexOf(Math.max(...jaccardValues));
        if(jaccardValues[maxIndex] > maxJaccard) {
            desiredEpisode = {
                season: i + 1,
                episode: episodes[i][maxIndex].episode,
                title: episodes[i][maxIndex].title
            };
            maxJaccard = jaccardValues[maxIndex];
        }
	}
	if(maxJaccard <= 0) throw new Error("No result found");
	return desiredEpisode;
}