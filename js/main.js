

$(document).ready(function() {
    var conferences = [INFOVIS_2011, INFOVIS_2012, INFOVIS_2013, INFOVIS_2014];
    var authors = allNodes(conferences);
    var links = getLinks(authors, conferences);

    var graph = {nodes: authors, links: links, categories: ["infovis2011", "infovis2012","infovis2013","infovis2014"] };
    var colors = {"infovis2011":"#cab2d6", "infovis2012":"#66c2a5", "infovis2013":"#fc8d62", "infovis2014": "#8da0cb"};
    //var colors = {"infovis2011":"#a6cee3", "infovis2012":"#1f78b4", "infovis2013":"#b2df8a", "infovis2014": "#33a02c"};
    BranchingSets(graph, colors);
});


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}