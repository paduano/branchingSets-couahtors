var BranchingSets = function(graph, colors) {
    var self = {};


    var width = 1200,
        height = 700;

    var linkThickness = 3;

    var force = d3.layout.force()
        .size([width, height])
        .charge(function (node) {
            return node.categories.length * -500;
        })
        .linkDistance(function (link) {
            return link.categories.length * 20;
        })
        .gravity(0.25);

    var drag = force.drag()
        .on("dragstart", dragstart);

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", "-600 -600 2000 2000");

    var layers = {}, labelsLayer;
    var node, link;

    graph.categories.reverse().forEach(function (category) {
        layers[category] = svg.append('g');
    });graph.categories.reverse();

    labelsLayer = svg.append('g');


    force
        .nodes(graph.nodes)
        .links(graph.links);

    force.start();
    for(var i=0; i<100;i++)force.tick();

    force
        .on("tick", tick);

        //node = node.data(graph.nodes)
        //    .enter().append("circle")
        //    .attr("class", "dummy-node")
        //    .attr("opacity", 0);
            //.attr("r", 12)
            //.attr("fill", function (node) {
            //    if(node.categories.length > 1){
            //        return "red";
            //    }
            //
            //    if(node.categories[0] == graph.categories[0])
            //        return "blue";
            //
            //    if(node.categories[0] == graph.categories[1])
            //        return "green";
            //})
            //.on("dblclick", dblclick)
            //.call(drag);

    graph.categories.forEach(function (category) {

        var categoryNode =  layers[category].selectAll(".node");
        var categoryLink =  layers[category].selectAll(".link");


        var nodes = _.filter(graph.nodes, function (n) {return _.contains(n.categories, category)});
        var links = _.filter(graph.links, function (n) {return _.contains(n.categories, category)});

        var dataLinks = [];
        links.forEach(function (l) {
            dataLinks.push({link:l, layerCategory:category});
        });

        categoryNode.data(nodes).enter().append("circle")
            .attr("class", "node")
            .attr("opacity",1)
            .attr("r", function (d) {
                var categoryId = _.intersection(graph.categories, d.categories).indexOf(category);
                return 12 + categoryId * 4;
            })
            .attr("fill", function (node) {
                return colors[category];
            })
            .on("dblclick", dblclick)
            .call(drag);

        categoryLink.data(dataLinks)
            .enter()
            .append("polygon")
            .attr("stroke", function (node) {
                return colors[category];
            })
            .attr("stroke-width",linkThickness)
            .attr("class", "link");

    });

    var label = labelsLayer.selectAll(".label");
    label.data(graph.nodes).enter()
        .append("g")
        .classed("label",true)
        .append("text")
        .attr("dx", 0)//function (d) {return 12 + d.categories.length * 4})
        .attr("dy", 3)
        .attr("text-anchor", "middle")
        .attr("font-size", 8)
        //.attr("stroke", "white")
        //.attr("stroke-width", 0.15)
        .text(function (d) {
            var names = d.id.split(' ');
            return names[names.length-1] + ' ' + names[0][0] + '.';
        });

    node = svg.selectAll(".node");
    link = svg.selectAll(".link");
    label = svg.selectAll(".label");

    function lineHelper(link, category, thickness){
        var categoryId = link.categories.indexOf(category);

        var start = vec2(link.source.x, link.source.y),
            end = vec2(link.target.x, link.target.y);

        var direction = end.subV(start).normalize();
        var startShift = -((link.categories.length-1)/2)*thickness;
        var shift = thickness*categoryId;

        var shiftedStart = start.addV(direction.perpendicular().mulS(startShift+shift));
        var shiftedEnd = end.addV(direction.perpendicular().mulS(startShift+shift));
        return shiftedStart.toArray() + ' ' + shiftedEnd.toArray();

    }


    function tick() {
        link.attr('points',function (d) {
            return lineHelper(d.link, d.layerCategory,linkThickness);
        });

        node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });

        label.attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")";
        });



    }

    function dblclick(d) {
        d3.select(this).classed("fixed", d.fixed = false);
    }

    function dragstart(d) {
        d3.select(this).classed("fixed", d.fixed = true);
    }

    return self;
};