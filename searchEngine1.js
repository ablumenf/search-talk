/* Iteration 1: simple Jaccard similarity */

const showSimilarities = false;

// argmax(jaccard(input, e)) for e ranging over all episodes
function findEpisode(input) {
	let desiredEpisode;
	let maxJaccard = -1;
	for(let i = 0; i < episodes.length; i++) {
        const jaccardValues = episodes[i].map(ep => jaccard(input, ep));
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