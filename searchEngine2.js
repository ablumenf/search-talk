/* Iteration 2: Adding NLP */

// argmax(jaccard(input, e)) for e ranging over all episodes
function findEpisode(input) {
	let desiredEpisode;
	let maxJaccard = -1;
	for(let i = 0; i < episodes.length; i++) {
        const jaccardValues = episodes[i].map(ep => jaccard(nlp_reduce(input), nlp_reduce(ep.title))); // DIFF
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