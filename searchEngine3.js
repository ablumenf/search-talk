/* Iteration 3: Pre-compute NLP at page load */

// pre-compute NLP stuff to hide NLP's really bad latency
const nlp_episodes = episodes.map(season => season.map(ep => nlp_reduce(ep)));

// argmax(jaccard(input, e)) for e ranging over all episodes
function findEpisode(input) {
    const nlp_input = nlp_reduce(input); // DIFF
    
	let desiredEpisode;
	let maxJaccard = -1;
	for(let i = 0; i < episodes.length; i++) {
        const jaccardValues = nlp_episodes[i].map(ep => jaccard(nlp_input, ep)); // DIFF
        const maxIndex = jaccardValues.indexOf(Math.max(...jaccardValues));
        if(jaccardValues[maxIndex] > maxJaccard) {
            desiredEpisode = {
                season: i + 1,
                episode: maxIndex + 1,
                title: episodes[i][maxIndex]
            };
            maxJaccard = jaccardValues[maxIndex];
        }
	}
	if(maxJaccard <= 0) throw new Error("No result found");
	return desiredEpisode;
}