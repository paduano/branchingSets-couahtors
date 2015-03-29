function allAuthors(conferences){
    var authors = [];

    conferences.forEach(function (conference) {

        conference.papers.forEach(function (paper) {
            authors = _.union(authors, paper);
        });

    });
    return authors;
}

function allNodes(conferences){
    var authors = allAuthors(conferences);

    var nodes = [];

    conferences.forEach(function (c) {
        c.allAuthors = allAuthors([c]);
    });


    authors.forEach(function (a) {

        var categories = [];

        conferences.forEach(function (c) {
            if(c.allAuthors.indexOf(a) > -1){
                categories.push(c.name);
            }
        });


        nodes.push({id: a,
                    index:nodes.length,
                    categories: categories
                    });
    });


    return nodes;
}

function findSameLink(link, links){
    for(var i = 0; i < links.length; i++){
        var l = links[i];
         if(l.source == link.source && l.target == link.target ||
            l.source == link.target && l.target == link.source){
            return l;
        }
    }

    return null;
}

function getLinks(nodes, conferences){

    var links = [];

    conferences.forEach(function (conference) {

        conference.papers.forEach(function (paper) {
            for(var i = 0; i < paper.length; i++){
                for(var j = 0; j < paper.length; j++){
                    if(i < j){
                        var link = {
                            source:
                                _.filter(nodes, function (node) {
                                    return node.id == paper[i];
                                })[0].index,

                            target:

                                _.filter(nodes, function (node) {
                                    return node.id == paper[j];
                                })[0].index,

                            categories: [conference.name]
                        };

                        var same = findSameLink(link,links);
                        if(same){
                            same.categories = _.union(link.categories, same.categories);
                        } else {
                            links.push(link);
                        }

                    }
                }
            }
        });

    });

    return links;
}



var INFOVIS_2014 = {
        name: 'infovis2014',
        papers: [
            ["Ali Al-Awami", "Johanna Beyer", "Hendrik Strobelt", "Narayanan Kasthuri", "Jeff W. Lichtman", "Hanspeter Pfister", "Markus Hadwiger"],
            ["Zan Armstrong", "Martin Wattenberg"],
            ["Juhee Bae", "Benjamin Watson"],
            ["Rita Borgo", "Joel Dearden", "Mark W. Jones"],
            ["Jeremy Boy", "Ronald Rensink", "Enrico Bertini", "Jean-Daniel Fekete"],
            ["Matthew Brehmer", "Stephen Ingram", "Jonathan Stray", "Tamara Munzner"],
            ["Fanny Chevalier", "Pierre Dragicevic", "Steven Franconeri"],
            ["Michael Correll", "Michael Gleicher"],
            ["Weiwei Cui", "Shixia Liu", "Zhuofeng Wu", "Hao Wei"],
            ["Charles D. Stolper", "Minsuk Kahng", "Zhiyuan Lin", "Florian Foerster", "Aakash Goel", "John Stasko", "Duen Horng Chau"],
            ["Çağatay Demiralp", "Michael Bernstein", "Jeffrey Heer"],
            ["Felipe S. L. G. Duarte", "Fabio Sikansi", "Francisco M. Fatore", "Samuel G. Fadel", "Fernando V. Paulovich"],
            ["Johannes Fuchs", "Petra Isenberg", "Anastasia Bezerianos", "Fabian Fischer", "Enrico Bertini"],
            ["Pascal Goffin", "Wesley Willett", "Jean-Daniel Fekete", "Petra Isenberg"],
            ["Connor Gramazio", "Karen Schloss", "David Laidlaw"],
            ["Samuel Gratzl", "Nils Gehlenborg", "Alexander Lex", "Hanspeter Pfister", "Marc Streit"],
            ["Diansheng Guo", "Xi Zhu"],
            ["Lane Harrison", "Fumeng Yang", "Steven Franconeri", "Remco Chang"],
            ["Samuel Huron", "Yvonne Jansen", "Sheelagh Carpendale"],
            ["Katherine Isaacs", "Peer-Timo Bremer", "Ilir Jusufi", "Todd Gamblin", "Abhinav Bhatele", "Martin Schulz", "Bernd Hamann"],
            ["Jaemin Jo", "Jaeseok Huh", "Jonghun Park", "Bohyoung Kim", "Jinwook Seo"],
            ["Gordon Kindlmann", "Carlos Scheidegger"],
            ["Brittany Kondo", "Christopher Collins"],
            ["Alexander Lex", "Nils Gehlenborg", "Hendrik Strobelt", "Romain Vuillemot", "Hanspeter Pfister"],
            ["Zhicheng Liu", "Jeffrey Heer"],
            ["Sean McKenna", "Dominika Mazur", "James Agutter", "Miriah Meyer"],
            ["Rudolf Netzel", "Michael Burch", "Daniel Weiskopf"],
            ["Gregorio Palmas", "Myroslav Bachynskyi", "Antti Oulasvirta", "Hans-Peter Seidel", "Tino Weinkauf"],
            ["Anshul Vikram Pandey", "Anjali Manivannan", "Oded Nov", "Margaret Satterthwaite", "Enrico Bertini"],
            ["Charles Perin", "Pierre Dragicevic", "Jean-Daniel Fekete"],
            ["Tom Polk", "Jing Yang", "Yueqi Hu", "Ye Zhao"],
            ["Donghao Ren", "Tobias Höllerer", "Xiaoru Yuan"],
            ["Manuel Rubio-Sánchez", "Alberto Sanchez"],
            ["Ramik Sadana", "Timothy Major", "Alistair Dove", "John Stasko"],
            ["Bahador Saket", "Paolo Simonetto", "Stephen Kobourov", "Katy Borner"],
            ["Michael Sedlmair", "Christoph Heinzl", "Harald Piringer", "Stefan Bruckner", "Torsten Möller"],
            ["Simon Stusak", "Aurélien Tabard", "Franziska Sauka", "Rohit Ashok Khot", "Andreas Butz"],
            ["Justin Talbot", "Vidya Setlur", "Anushka Anand"],
            ["Martijn Tennekes", "Edwin de Jonge"],
            ["Cagatay Turkay", "Aidan Slingsby", "Helwig Hauser", "Jo Wood", "Jason Dykes"],
            ["Stef van den Elzen", "Jarke J. van Wijk"],
            ["Paul van der Corput", "Jarke J. van Wijk"],
            ["Arthur van Goethem", "Andreas Reimer", "Bettina Speckmann", "Jo Wood"],
            ["Jo Wood", "Roger Beecham", "Jason Dykes"]
        ]
};

var INFOVIS_2013 = {
    name: 'infovis2013',
    papers:
        [

            ["Samuel Gratzl", "Alexander Lex", "Nils Gehlenborg", "Hanspeter Pfister", "Marc Streit"],
            ["Johannes Kehrer", "Harald Piringer", "Wolfgang Berger", "M. Eduard Groller"],
            ["Heike Hofmann", "Marie Vendettuoli"], ["Michelle A. Borkin", "Azalea A. Vo", "Zoya Bylinskii", "Phillip Isola", "Shashank Sunkavalli", "Aude Oliva", "Hanspeter Pfister"],
            ["Michael Gleicher", "Michael Correll", "Christine Nothelfer", "Steven Franconeri"],
            ["Martin Fink", "Jan-Henrik Haunert", "Joachim Spoerhase", "Alexander Wolff"],
            ["Mikkel R. Jakobsen", "Kasper Hornbaek"],
            ["Petra Isenberg", "Pierre Dragicevic", "Wesley Willett", "Anastasia Bezerianos", "Jean-Daniel Fekete"], ["Robert E. Roth"],
            ["Hans-Jorg Schulz", "Thomas Nocke", "Magnus Heitzler", "Heidrun Schumann"],
            ["Matthew Brehmer", "Tamara Munzner"],
            ["Mikkel R. Jakobsen", "Yonas Sahlemariam Haile", "Soren Knudsen", "Kasper Hornbaek"],
            ["Yvonne Jansen", "Pierre Dragicevic"], ["Jessica Hullman", "Steven Drucker", "Nathalie Henry Riche", "Bongshin Lee", "Danyel Fisher", "Eytan Adar"],
            ["Bongshin Lee", "Rubaiat Habib Kazi", "Greg Smith"],
            ["Samuel Huron", "Romain Vuillemot", "Jean-Daniel Fekete"],
            ["Fanny Chevalier", "Romain Vuillemot", "Guia Gali"],
            ["Shixia Liu", "Yingcai Wu", "Enxun Wei", "Mengchen Liu", "Yang Liu"],
            ["Lauro Lins", "James T. Klosowski", "Carlos Scheidegger"],
            ["Raja R. Sambasivan", "Ilari Shafer", "Michelle L. Mazurek", "Gregory R. Ganger"],
            ["Michelle A. Borkin", "Chelsea S. Yeh", "Madelaine Boyd", "Peter Macko", "Krzysztof Z. Gajos", "Margo Seltzer", "Hanspeter Pfister"],
            ["Corinna Vehlow", "Thomas Reinhardt", "Daniel Weiskopf"],
            ["Bilal Alsallakh", "Wolfgang Aigner", "Silvia Miksch", "Helwig Hauser"],
            ["Charles Perin", "Romain Vuillemot", "Jean-Daniel Fekete"],
            ["Rahul C. Basole", "Trustin Clear", "Mengdie Hu", "Harshit Mehrotra", "John Stasko"],
            ["Sarah Goodwin", "Jason Dykes", "Sara Jones", "Iain Dillingham", "Graham Dove", "Alison Duffy", "Alexander Kachka"],
            ["Alexander Lex", "Christian Partl", "Denis Kalkofen", "Marc Streit", "Samuel Gratzl", "Anne Mai Wassermann", "Dieter Schmalstieg", "Hanspeter Pfister"],
            ["Joel A. Ferstay", "Cydney B. Nielsen", "Tamara Munzner"], ["Sebastien Rufiange", "Michael J. McGuffin"],
            ["John Alexis Guerra-Gomez", "Michael L. Pack", "Catherine Plaisant", "Ben Shneiderman"],
            ["Eamonn Maguire", "Philippe Rocca-Serra", "Susanna-Assunta Sansone", "Jim Davies", "Min Chen"],
            ["Eirik Bakke", "David R. Karger", "Robert C. Miller"],
            ["Tim Dwyer", "Nathalie Henry Riche", "Kim Marriott", "Christopher Mears"], ["Jean-Francois Im", "Michael J. McGuffin", "Rock Leung"],
            ["Dirk J. Lehmann", "Holger Theisel"],
            ["Xiaoru Yuan", "Donghao Ren", "Zuchao Wang", "Cong Guo"],
            ["Michael Sedlmair", "Tamara Munzner", "Melanie Tory"],
            ["Vahid Taimouri", "Jing Hua"]
         ]
};

var INFOVIS_2012 = {
    name: "infovis2012",
    papers: [

        ["Steve Haroz", "David Whitney"],
        ["Steven R. Gomez", "Radu Jianu", "Caroline Ziemkiewicz", "Hua Guo", "David H. Laidlaw"],
        ["Sung-Hee Kim", "Zhihua Dong", "Hanjun Xian", "Benjavan Upatising", "Ji Soo Yi"],
        ["Michael Sedlmair", "Miriah Meyer", "Tamara Munzner"],
        ["Heike Hofmann", "Lendie Follett", "Mahbubul Majumder", "Dianne Cook"],
        ["Kai Xu", "Chris Rooney", "Peter Passmore", "Dong-Han Ham", "Phong H. Nguyen"],
        ["Kasper Dinkla", "Michel A. Westenberg", "Jarke J. van Wijk"],
        ["Aaditya G. Landge", "Joshua A. Levine", "Katherine E. Isaacs", "Abhinav Bhatele", "Todd Gamblin", "Martin Schu"],
        ["Kim Marriott", "Helen Purchase", "Michael Wybrow", "Cagatay Goncu"],
        ["Michael Zinsmaier", "Ulrik Brandes", "Oliver Deussen", "Hendrik Strobelt"],
        ["Alan M. MacEachren", "Robert E. Roth", "James O'Brien", "Bonan Li", "Derek Swingley", "Mark Gahegan"],
        ["Alexander Pilhofer", "Alexander Gribov", "Antony Unwin"],
        ["Anastasia Bezerianos", "Petra Isenberg"],
        ["Yingcai Wu", "Guo-Xun Yuan", "Kwan-Liu Ma"],
        ["Luana Micallef", "Pierre Dragicevic", "Jean-Daniel Fekete"],
        ["Arlind Nocaj", "Ulrik Brandes"],
        ["Shehzad Afzal", "Ross Maciejewski", "Yun Jang", "Niklas Elmqvist", "David S. Ebert"],
        ["Christian Tominski", "Heidrun Schumann", "Gennady Andrienko", "Natalia Andrienko"],
        ["Bernhard Jenny"],
        ["Martin Fink", "Jan-Henrik Haunert", "Andre Schulz", "Joachim Spoerhase", "Alexander Wolff"],
        ["Thomas Baudel", "Bertjan Broeksema"],
        ["Eamonn Maguire", "Philippe Rocca-Serra", "Susanna-Assunta Sansone", "Jim Davies", "Min Chen"],
        ["Justin Talbot", "John Gerth", "Pat Hanrahan"],
        ["Cagatay Turkay", "Arvid Lundervold", "Astri Johansen Lundervold", "Helwig Hauser"],
        ["Nicholas Kong", "Maneesh Agrawala"],
        ["Jian Zhao", "Fanny Chevalier", "Christopher Collins", "Ravin Balakrishnan"],
        ["Nan Cao", "Yu-Ru Lin", "Xiaohua Sun", "David Lazer", "Shixia Liu", "Huamin Qu"],
        ["Krist Wongsuphasawat", "David Gotz"],
        ["Conglei Shi", "Weiwei Cui", "Shixia Liu", "Panpan Xu", "Wei Chen", "Huamin Qu"],
        ["Yuzuru Tanahashi", "Kwan-Liu Ma"],
        ["Bongshin Lee", "Petra Isenberg", "Nathalie Henry Riche", "Sheelagh Carpendale"],
        ["Xiaoru Yuan", "Limei Che", "Yifan Hu", "Xin Zhang"],
        ["Marian Dörk", "Nathalie Henry Riche", "Gonzalo Ramos", "Susan Dumais"],
        ["Christian Tominski", "Camilla Forsell", "Jimmy Johansson"],
        ["Michael Sedlmair", "Annika Frank", "Tamara Munzner", "Andreas Butz"],
        ["Andrew Vande Moere", "Martin Tomitsch", "Christoph Wimmer", "Christoph Boesch", "Thomas Grechenig"],
        ["Jo Wood", "Petra Isenberg", "Tobias Isenberg", "Jason Dykes", "Nadia Boukhelifa", "Aidan Slingsby"],
        ["Rita Borgo", "Alfie Abdul-Rahman", "Farhan Mohamed", "Philip W. Grant", "Irene Reppa", "Luciano Floridi", "Min C"],
        ["Nadia Boukhelifa", "Anastasia Bezerianos", "Tobias Isenberg", "Jean-Daniel Fekete"],
        ["Jagoda Walny", "Bongshin Lee", "Paul Johns", "Nathalie Henry Riche", "Sheelagh Carpendale"],
        ["Florian Block", "Michael S. Horn", "Brenda Caldwell Phillips", "Judy Diamond", "E. Margaret Evans", "Chia Shen"],
        ["Joyce Ma", "Isaac Liao", "Kwan-Liu Ma", "Jennifer Frazier"],
        ["David Trimm", "Penny Rheingans", "Marie desJardins"],
        ["Hannah Pileggi", "Charles D. Stolper", "J. Michael Boyle", "John T. Stasko"]
    ]
};


var INFOVIS_2011 = {
    name: "infovis2011",
    papers:
        [
            ["Enrico Bertini", "Andrada Tatu", "Daniel Keim"],
                ["Jessica Hullman", "Eytan Adar", "Priti Shah"],
                ["Hadley Wickham", "Heike Hofmann"],
                ["Jessica Hullman", "Nick Diakopoulos"],
                ["Aritra Dasgupta", "Robert Kosara"],
                ["Markus Steinberger", "Manuela Waldner", "Marc Streit", "Alexander Lex", "Dieter Schmalstieg"],
                ["Basak Alper", "Nathalie Riche", "Gonzalo Ramos", "Mary Czerwinski"],
                ["Juhee Bae", "Benjamin Watson"],
                ["Justin Talbot", "John Gerth", "Pat Hanrahan"],
                ["Ulrik Brandes", "Bobo Nick"],
                ["Alexander Lex", "Hans-Joerg Schulz", "Marc Streit", "Christian Partl", "Dieter Schmalstieg"],
                ["Michael Bostock", "Vadim Ogievetsky", "Jeffrey Heer"],
                ["Jarry H.T. Claessen", "Jarke J. van Wijk"],
                ["Georgia Albuquerque", "Thomas Löwe", "Marcus Magnor"],
                ["Basak Alper", "Tobias Hollerer", "JoAnn Kuchera-Morin", "Angus Forbes"],
                ["Steffen Hadlak", "Hans-Jrg Schulz", "Heidrun Schumann"],
                ["Michael Burch", "Corinna Vehlow", "Fabian Beck", "Stephan Diehl", "Daniel Weiskopf"],
                ["David Selassie", "Brandon Heller", "Jeffrey Heer"],
                ["Ozan Ersoy", "Christophe Hurter", "Fernando P`aulovich", "Gabriel Cantareira", "Alex Telea"],
                ["Nivan Ferreira", "Lauro Lins", "Daniel Fink", "Steve Kelling", "Christopher Wood", "Juliana Freire", "Claudio Silva"],
                ["Jo Wood", "Donia Badawood", "Jason Dykes", "Aidan Slingsby"],
                ["Danielle Albers", "Colin Dewey", "Michael Gleicher"],
                ["A. Johannes Pretorius", "Mark-Anthony P. Bray", "Anne E. Carpenter", "Roy A. Ruddle"],
                ["Weiwei Cui", "Shixia Liu", "Li Tan", "Conglei Shi", "Yangqiu Song", "Zekai Gao", "Xin Tong", "Huamin Qu"],
                ["Jian Zhao", "Fanny Chevalier", "Emmanuel Pietriga", "Ravin Balakrishnan"],
                ["Milos Krstajic", "Enrico Bertini", "Daniel Keim"],
                ["Michael Burch", "Julian Heinrich", "Natalia Konevtsova", "Markus Hoeferlin", "Daniel Weiskopf"],
                ["Liang Gou", "Xiaolong (Luke) Zhang"],
                ["José Gustavo Paiva", "Laura Florian-Cruz", "Helio Pedrini", "Guilherme Telles", "Rosane Minghim"],
                ["Petra Isenberg", "Anastasia Bezerianos", "Pierre Dragicevic", "Jean-Daniel Fekete"],
                ["Michelle Borkin", "Krzysztof Gajos", "Amanda Peters", "Dimitrios Mitsouras", "Simone Melchionna", "Frank Rybic"],
                ["Johnny Rodgers", "Lyn Bartram"],
                ["David Lloyd", "Jason Dykes"],
                ["Jagoda Walny", "Sheelagh Carpendale", "Nathalie Henry Riche", "Gina Venolia", "Philip Fawcett"],
                ["Roeland Scheepens", "Niels Willems", "Huub van de Wetering", "Gennady Andrienko", "Natalia Andrienko", "Jarke J. van Wijk"],
                ["Yu-Shuen Wang", "Ming-Te Chi"],
                ["Kevin Verbeek", "Kevin Buchin", "Bettina Speckmann"],
                ["Aidan Slingsby", "Jason Dykes", "Jo Wood"],
                ["Jan-Henrik Haunert", "Leon Sering"],
                ["Paulo Joia", "Fernando V. Paulovich", "Danilo Coimbra", "Jose A. Cuminato", "Luis G. Nonato"],
                ["Zhao Geng", "ZhenMin Peng", "Robert S.Laramee", "Rick Walker", "Jonathan C. Roberts"],
                ["Nan Ca", "David Gotz", "Jimeng Sun", "Huamin Qu"],
                ["Cagatay Turkay", "Peter Filzmoser", "Helwig Hauser"],
                ["Christophe Hurter", "Ozan Ersoy", "Alexandru Telea"]
        ]
};


    var SCIVIZ = [
    ["Emanuel Zgraggen", "Robert Zeleznik", "Steven Drucker"],
    ["Marco Ament", "Filip Sadlo", "Carsten Dachsbacher", "Daniel Weiskopf"],
    ["Sean Arietta", "Alexei Efros", "Ravi Ramamoorthi", "Maneesh Agrawala"],
    ["Sujal Bista", "Jiachen Zhou", "Rao Gullapalli", "Amitabh Varshney"],
    ["Silvia Born", "Simon Sündermann", "Christoph Russ", "Raoul Hopf", "Carlos Ruiz", "Volkmar Falk", "Michael Gessat"],
    ["HyungSuk Choi", "Woohyuk Choi", "Tran Minh Quan", "David Hildebrand", "Hanspeter Pfister", "Won-Ki Jeong"],
    ["Ismail Demir", "Christian Dick", "Rüdiger Westermann"],
    ["Harish Doraiswamy", "Nivan Ferreira", "Theodoros Damoulas", "Juliana Freire", "Claudio Silva"],
    ["Steffen Frey", "Filip Sadlo", "Kwan-Liu Ma", "Thomas Ertl"],
    ["Sylvia Glasser", "Kai Lawonn", "Thomas Hoffmann", "Martin Skalej", "Bernhard Preim"],
    ["David Guenther", "Roberto Alvarez Boto", "Julia Contreras Garcia", "Jean-Philip Piquemal", "Julien Tierny"],
    ["David Guenther", "Alec Jacobson", "Jan Reininghaus", "Hans-Peter Seidel", "Olga Sorkine-Hornung", "Tino Weinkauf"],
    ["Tobias Günther", "Holger Theisel"],
    ["Hanqi Guo", "Jiang Zhang", "Richen Liu", "Lu Liu", "Xiaoru Yuan", "Jian Huang", "Xiangfei Meng", "Jingshan Pan"],
    ["Attila Gyulassy", "David Guenther", "Joshua A. Levine", "Julien Tierny", "Valerio Pascucci"],
    ["Daniel Haehn", "Seymour Knowles-Barley", "Mike Roberts", "Johanna Beyer", "Narayanan Kasthuri", "Jeff W. Lichtman", "Hanspeter Pfister"],
    ["Fan Hong", "Chufan Lai", "Hanqi Guo", "Xiaoru Yuan", "Enya Shen", "Sikun Li"],
    ["Jiaxi Hu", "Guangyu Jeff Zou", "Jing Hua"],
    ["Lars Huettenberger", "Christian Heine", "Christoph Garth"],
    ["Tao Ju", "Minxin Cheng", "Xu Wang", "Ye Duan"],
    ["Jan Kretschmer", "Grzegorz Soza", "Christian Tietjen", "Michael Suehling", "Bernhard Preim", "Marc Stamminger"],
    ["Stefan Lindholm", "Daniel Jönsson", "Charles Hansen", "Anders Ynnerman"],
    ["Norbert Lindow", "Daniel Baum", "Hans-Christian Hege"],
    ["Peter Lindstrom"],
    ["Gustavo Mello Machado", "Filip Sadlo", "Thomas Müller", "Thomas Ertl"],
    ["Mahsa Mirzargar", "Ross Whitaker", "Mike Kirby"],
    ["Peter Rautek", "Stefan Bruckner", "Eduard Gröller", "Markus Hadwiger"],
    ["Franz Sauer", "Hongfeng Yu", "Kwan-Liu Ma"],
    ["David Schroeder", "Fedor Korsakov", "Carissa Mai-Ping Knipe", "Lauren Thorson", "Arin M. Ellingson", "David Nuckley", "John Carlis", "Daniel F. Keefe"],
    ["Christian Schulte zu Berge", "Maximilian Baust", "Nassir Navab", "Ankur Kapoor"],
    ["Ronell Sicat", "Jens Krueger", "Torsten Möller", "Markus Hadwiger"],
    ["Dilip Thomas", "Vijay Natarajan"],
    ["Manuela Waldner", "mathieu le muzic", "Matthias Bernhard", "Werner Purgathofer", "Ivan Viola"],
    ["Jarke J. van Wijk"],
    ["Hui Zhang", "Jianguang Weng", "Guangchen Ruan"]
];