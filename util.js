/* JS set utility functions */

function union(setA, setB) {
    return new Set(Array.from(setA).concat(Array.from(setB)));
}

function intersection(setA, setB) {
    const listA = Array.from(setA);
    return new Set(listA.filter(elem => setB.has(elem)));
}

/* Jaccard similarity utils */

function stringToSet(str) {
    const lowerCaseArr = str.toLowerCase().split(" ");
	const stopWords = new Set(["the", "a", "an", "of"]);
    return new Set(lowerCaseArr.filter(w => w.length > 0 && !stopWords.has(w)));
}

function jaccard(s, t) {
    const s_set = stringToSet(s);
    const t_set = stringToSet(t);

	return intersection(s_set, t_set).size / union(s_set, t_set).size;
}

/* NLP utility functions */

const params = {
	"whitespace": true, // remove hyphens, newlines, extra spaces
	"numbers": true, // turn 'seven' to '7'
	"punctuation": true, // remove commas/semicolons, but keep sentence-ending punctuation
	"contractions": true, // remove contractions
	"acronyms": true, // remove periods from acronyms
	"possessives": true, // remove possessives: Google's -> Google
	"plurals": true, // convert plurals to singular
	"verbs": true // turn verbs into infinitive form
}

function nlp_reduce(s) {
	return nlp(s).normalize(params).out('text');
}

/* test NLP stuff
nlp("we read books").normalize(params).out('text');
nlp("the foxes jump over the fences").normalize(params).out('text');
// next two examples show imperfections of this library
nlp("I'm giving a talk on search engines").normalize(params).out('text');
nlp("I'm giving a talk on search Engines").normalize(params).out('text');
*/