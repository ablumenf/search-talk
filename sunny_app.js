/* BEGIN auto-fill-in search bar with suggested input */

const searches = ["the worst bar", "anti social", "family fight", "frank intervention", "gang rivalry", "king rats",
	"mac dennis timeshare", "gang squashes beef", "frank falls window", "trial century", "water park", "wolf cola", "cricket"];

document.getElementById("textInput").defaultValue = searches[Math.floor(Math.random() * searches.length)];

/* END auto-fill-in search bar with suggested input */

function renderEpisode(ep) {
	try {
		const episode = findEpisode(ep);
		document.getElementById('searchText').innerHTML = "Season " + episode.season + ", Ep. " + episode.episode +
			": <span class='blueText font-weight-bold'>" + episode.title + "</span>";
		deleteSimilarityList();
		if(typeof showSimilarities !== "undefined" && showSimilarities) renderSimilarityList(ep);
	} catch(error) {
		document.getElementById('searchAlert').innerHTML = "<div id='errorMessage' class='alert alert-danger alert-dismissible fade show col-lg-6 col-md-6 col-sm-8 col-8' role='alert'>"
				+ "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
				  + "<span class='text-danger font-weight-bold'>Error.</span> No result found." + "</div>";
		document.getElementById('searchText').innerHTML = ""; // clear result
		deleteSimilarityList();
		removeErrorMessage(5000);
	}
}

function removeErrorMessage(msDelay) {
	setTimeout(() => {
		const elem = document.getElementById("errorMessage");
		elem.parentElement.removeChild(elem);
	}, msDelay);
}

function renderSimilarityList(queryString) {
	const episodeList = episodes.reduce((accumulator, season) => accumulator.concat(season), [])
		.map(ep => [ep.title, jaccard(queryString, ep.title).toFixed(2)])
		.sort((ep1, ep2) => ep2[1] - ep1[1])
		.slice(0, 10) // top 10
		.filter(ep => ep[1] > 0); // possibly less than 10, filter out episodes with similarity 0

	d3.select("#tableheader")
		.selectAll("th")
		.data(["Episode", "Similarity"])
		.enter()
		.append("th")
		.attr("scope", "col")
		.text(d => d);

	const rows = d3.select("#values")
		.selectAll("tr")
		.data(episodeList)
		.enter()
		.append("tr");

	rows.selectAll("td")
		.data(d => d)
		.enter()
		.append("td")
		.text(d => d);

	const cells = d3.selectAll("td")._groups[0]; // bad way to bold first row
	cells[0].style["font-weight"] = "bold";
	cells[1].style["font-weight"] = "bold";
}

function deleteSimilarityList() {
	d3.select("#tableheader").selectAll("*").remove();
	d3.select("#values").selectAll("*").remove(); // clear table
}