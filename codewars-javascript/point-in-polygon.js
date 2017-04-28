var Test = require('./frameworks/javascript/cw-2');

/*
    Use a ray trace across the polygon from the test point to count the number
    of edge crosses that occur. If the count is odd, then the test point is inside the
    polygon.  This method only works for point that are not on an edge.
*/
function pointInPoly(poly, point) {
    var edgeCrossCount = 0;
    for (var p = 0; p < poly.length; p++) {
        var vertex1 = poly[p];
        var vertex2 = poly[(p + 1) % poly.length];
        if (raytest(vertex1, vertex2, point))
            ++edgeCrossCount;
    }
    //console.log(`showAndTest(${JSON.stringify(poly)}, ${JSON.stringify(point)}, ${edgeCrossCount % 2 ? 'true' : 'false'});`);
    return edgeCrossCount % 2;

    function raytest(vertex1, vertex2, point) {
        if (vertex1[1] <= vertex2[1]) {
            if (point[1] <= vertex1[1] || point[1] > vertex2[1] ||
                point[0] >= vertex1[0] && point[0] >= vertex2[0]) {
                return false;
            } else if (point[0] < vertex1[0] && point[0] < vertex2[0]) {
                return true;
            } else {
                return (point[1] - vertex1[1]) / (point[0] - vertex1[0]) > (vertex2[1] - vertex1[1]) / (vertex2[0] - vertex1[0]);
            }
        } else {
            return raytest(vertex2, vertex1, point);
        }
    }
}


//Test a square
var poly = [
    [-5, -5],
    [5, -5],
    [5, 5],
    [-5, 5]
];

function showAndTest(poly, point, expect) {
        //drawTest(poly, point, expect);
        var result = pointInPoly(poly, point);
        if (expect) Test.expect(result, "The point is inside, but your function said it was outside.");
        else Test.expect(!result, "The point is outside, but your function said it was inside.");
    }

showAndTest(poly, [-6,0], false);
showAndTest(poly, [1,1], true);

showAndTest([[-5,-5],[5,-5],[5,5],[-5,5]], [1,1], true);
showAndTest([[-5,-5],[5,-5],[5,5],[-5,5]], [4,1], true);
showAndTest([[-5,-5],[5,-5],[5,5],[-5,5]], [6,1], false);
showAndTest([[-5,-5],[5,-5],[5,5],[-5,5]], [-6,-6], false);
//Should handle a simple triangle
showAndTest([[-5,-5],[5,-5],[0,5]], [-4,-4], true);
showAndTest([[-5,-5],[5,-5],[0,5]], [1,-3], true);
showAndTest([[-5,-5],[5,-5],[0,5]], [6,-4], false);
showAndTest([[-5,-5],[5,-5],[0,5]], [-1,-6], false);
//Should handle an approximate circle
showAndTest([[5,0],[4.990133642141358,0.31395259764656686],[4.9605735065723895,0.6266661678215213],[4.911436253643443,0.936906572928623],[4.842915805643155,1.243449435824274],[4.755282581475767,1.545084971874737],[4.648882429441256,1.8406227634233898],[4.524135262330097,2.1288964578253635],[4.381533400219318,2.4087683705085765],[4.221639627510076,2.679133974894983],[4.045084971874737,2.938926261462366],[3.852566213878947,3.1871199487434483],[3.6448431371070584,3.4227355296434423],[3.422735529643444,3.6448431371070567],[3.187119948743449,3.8525662138789456],[2.938926261462366,4.045084971874737],[2.6791339748949827,4.221639627510076],[2.4087683705085756,4.381533400219318],[2.1288964578253635,4.524135262330098],[1.8406227634233894,4.648882429441257],[1.5450849718747364,4.755282581475768],[1.2434494358242727,4.842915805643156],[0.9369065729286215,4.911436253643443],[0.6266661678215191,4.9605735065723895],[0.3139525976465643,4.990133642141358],[-1.914284349463475e-15,5],[-0.31395259764656813,4.990133642141358],[-0.6266661678215228,4.960573506572389],[-0.9369065729286252,4.911436253643443],[-1.2434494358242763,4.8429158056431545],[-1.54508497187474,4.755282581475767],[-1.840622763423393,4.648882429441255],[-2.1288964578253657,4.5241352623300966],[-2.408768370508579,4.3815334002193165],[-2.6791339748949863,4.221639627510074],[-2.938926261462369,4.045084971874735],[-3.187119948743452,3.8525662138789434],[-3.4227355296434467,3.6448431371070544],[-3.644843137107061,3.4227355296434396],[-3.8525662138789496,3.1871199487434443],[-4.045084971874741,2.9389262614623606],[-4.221639627510079,2.679133974894978],[-4.381533400219321,2.4087683705085703],[-4.5241352623301,2.1288964578253586],[-4.648882429441259,1.8406227634233847],[-4.75528258147577,1.5450849718747315],[-4.842915805643157,1.2434494358242676],[-4.911436253643445,0.9369065729286163],[-4.9605735065723895,0.626666167821514],[-4.990133642141358,0.31395259764655903],[-5,-6.049014748177263e-15],[-4.990133642141357,-0.31395259764657335],[-4.960573506572389,-0.6266661678215281],[-4.911436253643442,-0.9369065729286303],[-4.842915805643154,-1.2434494358242816],[-4.7552825814757655,-1.545084971874745],[-4.648882429441254,-1.840622763423398],[-4.524135262330094,-2.1288964578253715],[-4.381533400219314,-2.4087683705085845],[-4.221639627510071,-2.6791339748949894],[-4.045084971874732,-2.938926261462372],[-3.8525662138789407,-3.1871199487434554],[-3.644843137107051,-3.42273552964345],[-3.4227355296434365,-3.644843137107064],[-3.187119948743441,-3.8525662138789523],[-2.9389262614623557,-4.045084971874744],[-2.679133974894974,-4.221639627510081],[-2.4087683705085685,-4.381533400219323],[-2.128896457825353,-4.524135262330102],[-1.8406227634233807,-4.648882429441261],[-1.5450849718747253,-4.755282581475772],[-1.2434494358242636,-4.842915805643158],[-0.9369065729286101,-4.911436253643446],[-0.6266661678215097,-4.96057350657239],[-0.3139525976465527,-4.990133642141359],[1.2404191196141363e-14,-5],[0.3139525976465819,-4.990133642141357],[0.6266661678215344,-4.960573506572388],[0.9369065729286388,-4.911436253643441],[1.2434494358242876,-4.842915805643152],[1.5450849718747488,-4.755282581475765],[1.8406227634234038,-4.648882429441252],[2.128896457825375,-4.524135262330092],[2.4087683705085903,-4.38153340021931],[2.679133974894995,-4.221639627510068],[2.9389262614623792,-4.0450849718747275],[3.18711994874346,-3.8525662138789367],[3.4227355296434565,-3.6448431371070455],[3.644843137107068,-3.422735529643432],[3.8525662138789576,-3.187119948743434],[4.045084971874747,-2.9389262614623526],[4.221639627510085,-2.6791339748949667],[4.381533400219326,-2.408768370508561],[4.5241352623301045,-2.128896457825349],[4.648882429441264,-1.8406227634233727],[4.755282581475773,-1.5450849718747215],[4.842915805643161,-1.2434494358242552],[4.911436253643447,-0.9369065729286059],[4.960573506572391,-0.6266661678215013],[4.990133642141359,-0.3139525976465486]], [1,1], true);
showAndTest([[5,0],[4.990133642141358,0.31395259764656686],[4.9605735065723895,0.6266661678215213],[4.911436253643443,0.936906572928623],[4.842915805643155,1.243449435824274],[4.755282581475767,1.545084971874737],[4.648882429441256,1.8406227634233898],[4.524135262330097,2.1288964578253635],[4.381533400219318,2.4087683705085765],[4.221639627510076,2.679133974894983],[4.045084971874737,2.938926261462366],[3.852566213878947,3.1871199487434483],[3.6448431371070584,3.4227355296434423],[3.422735529643444,3.6448431371070567],[3.187119948743449,3.8525662138789456],[2.938926261462366,4.045084971874737],[2.6791339748949827,4.221639627510076],[2.4087683705085756,4.381533400219318],[2.1288964578253635,4.524135262330098],[1.8406227634233894,4.648882429441257],[1.5450849718747364,4.755282581475768],[1.2434494358242727,4.842915805643156],[0.9369065729286215,4.911436253643443],[0.6266661678215191,4.9605735065723895],[0.3139525976465643,4.990133642141358],[-1.914284349463475e-15,5],[-0.31395259764656813,4.990133642141358],[-0.6266661678215228,4.960573506572389],[-0.9369065729286252,4.911436253643443],[-1.2434494358242763,4.8429158056431545],[-1.54508497187474,4.755282581475767],[-1.840622763423393,4.648882429441255],[-2.1288964578253657,4.5241352623300966],[-2.408768370508579,4.3815334002193165],[-2.6791339748949863,4.221639627510074],[-2.938926261462369,4.045084971874735],[-3.187119948743452,3.8525662138789434],[-3.4227355296434467,3.6448431371070544],[-3.644843137107061,3.4227355296434396],[-3.8525662138789496,3.1871199487434443],[-4.045084971874741,2.9389262614623606],[-4.221639627510079,2.679133974894978],[-4.381533400219321,2.4087683705085703],[-4.5241352623301,2.1288964578253586],[-4.648882429441259,1.8406227634233847],[-4.75528258147577,1.5450849718747315],[-4.842915805643157,1.2434494358242676],[-4.911436253643445,0.9369065729286163],[-4.9605735065723895,0.626666167821514],[-4.990133642141358,0.31395259764655903],[-5,-6.049014748177263e-15],[-4.990133642141357,-0.31395259764657335],[-4.960573506572389,-0.6266661678215281],[-4.911436253643442,-0.9369065729286303],[-4.842915805643154,-1.2434494358242816],[-4.7552825814757655,-1.545084971874745],[-4.648882429441254,-1.840622763423398],[-4.524135262330094,-2.1288964578253715],[-4.381533400219314,-2.4087683705085845],[-4.221639627510071,-2.6791339748949894],[-4.045084971874732,-2.938926261462372],[-3.8525662138789407,-3.1871199487434554],[-3.644843137107051,-3.42273552964345],[-3.4227355296434365,-3.644843137107064],[-3.187119948743441,-3.8525662138789523],[-2.9389262614623557,-4.045084971874744],[-2.679133974894974,-4.221639627510081],[-2.4087683705085685,-4.381533400219323],[-2.128896457825353,-4.524135262330102],[-1.8406227634233807,-4.648882429441261],[-1.5450849718747253,-4.755282581475772],[-1.2434494358242636,-4.842915805643158],[-0.9369065729286101,-4.911436253643446],[-0.6266661678215097,-4.96057350657239],[-0.3139525976465527,-4.990133642141359],[1.2404191196141363e-14,-5],[0.3139525976465819,-4.990133642141357],[0.6266661678215344,-4.960573506572388],[0.9369065729286388,-4.911436253643441],[1.2434494358242876,-4.842915805643152],[1.5450849718747488,-4.755282581475765],[1.8406227634234038,-4.648882429441252],[2.128896457825375,-4.524135262330092],[2.4087683705085903,-4.38153340021931],[2.679133974894995,-4.221639627510068],[2.9389262614623792,-4.0450849718747275],[3.18711994874346,-3.8525662138789367],[3.4227355296434565,-3.6448431371070455],[3.644843137107068,-3.422735529643432],[3.8525662138789576,-3.187119948743434],[4.045084971874747,-2.9389262614623526],[4.221639627510085,-2.6791339748949667],[4.381533400219326,-2.408768370508561],[4.5241352623301045,-2.128896457825349],[4.648882429441264,-1.8406227634233727],[4.755282581475773,-1.5450849718747215],[4.842915805643161,-1.2434494358242552],[4.911436253643447,-0.9369065729286059],[4.960573506572391,-0.6266661678215013],[4.990133642141359,-0.3139525976465486]], [4,0], true);
showAndTest([[5,0],[4.990133642141358,0.31395259764656686],[4.9605735065723895,0.6266661678215213],[4.911436253643443,0.936906572928623],[4.842915805643155,1.243449435824274],[4.755282581475767,1.545084971874737],[4.648882429441256,1.8406227634233898],[4.524135262330097,2.1288964578253635],[4.381533400219318,2.4087683705085765],[4.221639627510076,2.679133974894983],[4.045084971874737,2.938926261462366],[3.852566213878947,3.1871199487434483],[3.6448431371070584,3.4227355296434423],[3.422735529643444,3.6448431371070567],[3.187119948743449,3.8525662138789456],[2.938926261462366,4.045084971874737],[2.6791339748949827,4.221639627510076],[2.4087683705085756,4.381533400219318],[2.1288964578253635,4.524135262330098],[1.8406227634233894,4.648882429441257],[1.5450849718747364,4.755282581475768],[1.2434494358242727,4.842915805643156],[0.9369065729286215,4.911436253643443],[0.6266661678215191,4.9605735065723895],[0.3139525976465643,4.990133642141358],[-1.914284349463475e-15,5],[-0.31395259764656813,4.990133642141358],[-0.6266661678215228,4.960573506572389],[-0.9369065729286252,4.911436253643443],[-1.2434494358242763,4.8429158056431545],[-1.54508497187474,4.755282581475767],[-1.840622763423393,4.648882429441255],[-2.1288964578253657,4.5241352623300966],[-2.408768370508579,4.3815334002193165],[-2.6791339748949863,4.221639627510074],[-2.938926261462369,4.045084971874735],[-3.187119948743452,3.8525662138789434],[-3.4227355296434467,3.6448431371070544],[-3.644843137107061,3.4227355296434396],[-3.8525662138789496,3.1871199487434443],[-4.045084971874741,2.9389262614623606],[-4.221639627510079,2.679133974894978],[-4.381533400219321,2.4087683705085703],[-4.5241352623301,2.1288964578253586],[-4.648882429441259,1.8406227634233847],[-4.75528258147577,1.5450849718747315],[-4.842915805643157,1.2434494358242676],[-4.911436253643445,0.9369065729286163],[-4.9605735065723895,0.626666167821514],[-4.990133642141358,0.31395259764655903],[-5,-6.049014748177263e-15],[-4.990133642141357,-0.31395259764657335],[-4.960573506572389,-0.6266661678215281],[-4.911436253643442,-0.9369065729286303],[-4.842915805643154,-1.2434494358242816],[-4.7552825814757655,-1.545084971874745],[-4.648882429441254,-1.840622763423398],[-4.524135262330094,-2.1288964578253715],[-4.381533400219314,-2.4087683705085845],[-4.221639627510071,-2.6791339748949894],[-4.045084971874732,-2.938926261462372],[-3.8525662138789407,-3.1871199487434554],[-3.644843137107051,-3.42273552964345],[-3.4227355296434365,-3.644843137107064],[-3.187119948743441,-3.8525662138789523],[-2.9389262614623557,-4.045084971874744],[-2.679133974894974,-4.221639627510081],[-2.4087683705085685,-4.381533400219323],[-2.128896457825353,-4.524135262330102],[-1.8406227634233807,-4.648882429441261],[-1.5450849718747253,-4.755282581475772],[-1.2434494358242636,-4.842915805643158],[-0.9369065729286101,-4.911436253643446],[-0.6266661678215097,-4.96057350657239],[-0.3139525976465527,-4.990133642141359],[1.2404191196141363e-14,-5],[0.3139525976465819,-4.990133642141357],[0.6266661678215344,-4.960573506572388],[0.9369065729286388,-4.911436253643441],[1.2434494358242876,-4.842915805643152],[1.5450849718747488,-4.755282581475765],[1.8406227634234038,-4.648882429441252],[2.128896457825375,-4.524135262330092],[2.4087683705085903,-4.38153340021931],[2.679133974894995,-4.221639627510068],[2.9389262614623792,-4.0450849718747275],[3.18711994874346,-3.8525662138789367],[3.4227355296434565,-3.6448431371070455],[3.644843137107068,-3.422735529643432],[3.8525662138789576,-3.187119948743434],[4.045084971874747,-2.9389262614623526],[4.221639627510085,-2.6791339748949667],[4.381533400219326,-2.408768370508561],[4.5241352623301045,-2.128896457825349],[4.648882429441264,-1.8406227634233727],[4.755282581475773,-1.5450849718747215],[4.842915805643161,-1.2434494358242552],[4.911436253643447,-0.9369065729286059],[4.960573506572391,-0.6266661678215013],[4.990133642141359,-0.3139525976465486]], [4,4], false);
showAndTest([[5,0],[4.990133642141358,0.31395259764656686],[4.9605735065723895,0.6266661678215213],[4.911436253643443,0.936906572928623],[4.842915805643155,1.243449435824274],[4.755282581475767,1.545084971874737],[4.648882429441256,1.8406227634233898],[4.524135262330097,2.1288964578253635],[4.381533400219318,2.4087683705085765],[4.221639627510076,2.679133974894983],[4.045084971874737,2.938926261462366],[3.852566213878947,3.1871199487434483],[3.6448431371070584,3.4227355296434423],[3.422735529643444,3.6448431371070567],[3.187119948743449,3.8525662138789456],[2.938926261462366,4.045084971874737],[2.6791339748949827,4.221639627510076],[2.4087683705085756,4.381533400219318],[2.1288964578253635,4.524135262330098],[1.8406227634233894,4.648882429441257],[1.5450849718747364,4.755282581475768],[1.2434494358242727,4.842915805643156],[0.9369065729286215,4.911436253643443],[0.6266661678215191,4.9605735065723895],[0.3139525976465643,4.990133642141358],[-1.914284349463475e-15,5],[-0.31395259764656813,4.990133642141358],[-0.6266661678215228,4.960573506572389],[-0.9369065729286252,4.911436253643443],[-1.2434494358242763,4.8429158056431545],[-1.54508497187474,4.755282581475767],[-1.840622763423393,4.648882429441255],[-2.1288964578253657,4.5241352623300966],[-2.408768370508579,4.3815334002193165],[-2.6791339748949863,4.221639627510074],[-2.938926261462369,4.045084971874735],[-3.187119948743452,3.8525662138789434],[-3.4227355296434467,3.6448431371070544],[-3.644843137107061,3.4227355296434396],[-3.8525662138789496,3.1871199487434443],[-4.045084971874741,2.9389262614623606],[-4.221639627510079,2.679133974894978],[-4.381533400219321,2.4087683705085703],[-4.5241352623301,2.1288964578253586],[-4.648882429441259,1.8406227634233847],[-4.75528258147577,1.5450849718747315],[-4.842915805643157,1.2434494358242676],[-4.911436253643445,0.9369065729286163],[-4.9605735065723895,0.626666167821514],[-4.990133642141358,0.31395259764655903],[-5,-6.049014748177263e-15],[-4.990133642141357,-0.31395259764657335],[-4.960573506572389,-0.6266661678215281],[-4.911436253643442,-0.9369065729286303],[-4.842915805643154,-1.2434494358242816],[-4.7552825814757655,-1.545084971874745],[-4.648882429441254,-1.840622763423398],[-4.524135262330094,-2.1288964578253715],[-4.381533400219314,-2.4087683705085845],[-4.221639627510071,-2.6791339748949894],[-4.045084971874732,-2.938926261462372],[-3.8525662138789407,-3.1871199487434554],[-3.644843137107051,-3.42273552964345],[-3.4227355296434365,-3.644843137107064],[-3.187119948743441,-3.8525662138789523],[-2.9389262614623557,-4.045084971874744],[-2.679133974894974,-4.221639627510081],[-2.4087683705085685,-4.381533400219323],[-2.128896457825353,-4.524135262330102],[-1.8406227634233807,-4.648882429441261],[-1.5450849718747253,-4.755282581475772],[-1.2434494358242636,-4.842915805643158],[-0.9369065729286101,-4.911436253643446],[-0.6266661678215097,-4.96057350657239],[-0.3139525976465527,-4.990133642141359],[1.2404191196141363e-14,-5],[0.3139525976465819,-4.990133642141357],[0.6266661678215344,-4.960573506572388],[0.9369065729286388,-4.911436253643441],[1.2434494358242876,-4.842915805643152],[1.5450849718747488,-4.755282581475765],[1.8406227634234038,-4.648882429441252],[2.128896457825375,-4.524135262330092],[2.4087683705085903,-4.38153340021931],[2.679133974894995,-4.221639627510068],[2.9389262614623792,-4.0450849718747275],[3.18711994874346,-3.8525662138789367],[3.4227355296434565,-3.6448431371070455],[3.644843137107068,-3.422735529643432],[3.8525662138789576,-3.187119948743434],[4.045084971874747,-2.9389262614623526],[4.221639627510085,-2.6791339748949667],[4.381533400219326,-2.408768370508561],[4.5241352623301045,-2.128896457825349],[4.648882429441264,-1.8406227634233727],[4.755282581475773,-1.5450849718747215],[4.842915805643161,-1.2434494358242552],[4.911436253643447,-0.9369065729286059],[4.960573506572391,-0.6266661678215013],[4.990133642141359,-0.3139525976465486]], [0,-6], false);
//Should handle a random 20-gon
showAndTest([[4.272728022749072,0.0074076689759620265],[3.549648562643082,1.2562132988707284],[3.1365712678043787,2.464462579754241],[2.4492296032287175,3.5948045536891438],[0.958783394826195,3.0082255057575638],[-0.002070743169222894,3.0459031819496354],[-1.6558129082182116,4.588106978385564],[-2.940492738945146,3.799105232046879],[-2.7562229613905687,1.9485128939821852],[-4.483088438288271,1.3832246082486648],[-3.563410396558026,-0.037560652474657896],[-3.5225293200833834,-1.1992672926446808],[-3.9181995895583785,-2.928068270030982],[-2.1884852724696815,-3.12894182981449],[-1.0529712189956864,-3.3252971163608285],[0.0807763296745942,-4.210130712092587],[1.1005233515642983,-3.0173933316038064],[2.539064632353352,-3.490903176495349],[3.208536004204024,-2.2564058517217327],[4.423220274271251,-1.397732996672502]], [6,6], false);
showAndTest([[4.272728022749072,0.0074076689759620265],[3.549648562643082,1.2562132988707284],[3.1365712678043787,2.464462579754241],[2.4492296032287175,3.5948045536891438],[0.958783394826195,3.0082255057575638],[-0.002070743169222894,3.0459031819496354],[-1.6558129082182116,4.588106978385564],[-2.940492738945146,3.799105232046879],[-2.7562229613905687,1.9485128939821852],[-4.483088438288271,1.3832246082486648],[-3.563410396558026,-0.037560652474657896],[-3.5225293200833834,-1.1992672926446808],[-3.9181995895583785,-2.928068270030982],[-2.1884852724696815,-3.12894182981449],[-1.0529712189956864,-3.3252971163608285],[0.0807763296745942,-4.210130712092587],[1.1005233515642983,-3.0173933316038064],[2.539064632353352,-3.490903176495349],[3.208536004204024,-2.2564058517217327],[4.423220274271251,-1.397732996672502]], [2,0], true);
showAndTest([[4.272728022749072,0.0074076689759620265],[3.549648562643082,1.2562132988707284],[3.1365712678043787,2.464462579754241],[2.4492296032287175,3.5948045536891438],[0.958783394826195,3.0082255057575638],[-0.002070743169222894,3.0459031819496354],[-1.6558129082182116,4.588106978385564],[-2.940492738945146,3.799105232046879],[-2.7562229613905687,1.9485128939821852],[-4.483088438288271,1.3832246082486648],[-3.563410396558026,-0.037560652474657896],[-3.5225293200833834,-1.1992672926446808],[-3.9181995895583785,-2.928068270030982],[-2.1884852724696815,-3.12894182981449],[-1.0529712189956864,-3.3252971163608285],[0.0807763296745942,-4.210130712092587],[1.1005233515642983,-3.0173933316038064],[2.539064632353352,-3.490903176495349],[3.208536004204024,-2.2564058517217327],[4.423220274271251,-1.397732996672502]], [-3.517681004448395,-2.628760964771827], true);
showAndTest([[4.272728022749072,0.0074076689759620265],[3.549648562643082,1.2562132988707284],[3.1365712678043787,2.464462579754241],[2.4492296032287175,3.5948045536891438],[0.958783394826195,3.0082255057575638],[-0.002070743169222894,3.0459031819496354],[-1.6558129082182116,4.588106978385564],[-2.940492738945146,3.799105232046879],[-2.7562229613905687,1.9485128939821852],[-4.483088438288271,1.3832246082486648],[-3.563410396558026,-0.037560652474657896],[-3.5225293200833834,-1.1992672926446808],[-3.9181995895583785,-2.928068270030982],[-2.1884852724696815,-3.12894182981449],[-1.0529712189956864,-3.3252971163608285],[0.0807763296745942,-4.210130712092587],[1.1005233515642983,-3.0173933316038064],[2.539064632353352,-3.490903176495349],[3.208536004204024,-2.2564058517217327],[4.423220274271251,-1.397732996672502]], [0,-6], false);
showAndTest([[4.272728022749072,0.0074076689759620265],[3.549648562643082,1.2562132988707284],[3.1365712678043787,2.464462579754241],[2.4492296032287175,3.5948045536891438],[0.958783394826195,3.0082255057575638],[-0.002070743169222894,3.0459031819496354],[-1.6558129082182116,4.588106978385564],[-2.940492738945146,3.799105232046879],[-2.7562229613905687,1.9485128939821852],[-4.483088438288271,1.3832246082486648],[-3.563410396558026,-0.037560652474657896],[-3.5225293200833834,-1.1992672926446808],[-3.9181995895583785,-2.928068270030982],[-2.1884852724696815,-3.12894182981449],[-1.0529712189956864,-3.3252971163608285],[0.0807763296745942,-4.210130712092587],[1.1005233515642983,-3.0173933316038064],[2.539064632353352,-3.490903176495349],[3.208536004204024,-2.2564058517217327],[4.423220274271251,-1.397732996672502]], [-0.0024106657746025403,3.5459030664022446], false);
showAndTest([[4.272728022749072,0.0074076689759620265],[3.549648562643082,1.2562132988707284],[3.1365712678043787,2.464462579754241],[2.4492296032287175,3.5948045536891438],[0.958783394826195,3.0082255057575638],[-0.002070743169222894,3.0459031819496354],[-1.6558129082182116,4.588106978385564],[-2.940492738945146,3.799105232046879],[-2.7562229613905687,1.9485128939821852],[-4.483088438288271,1.3832246082486648],[-3.563410396558026,-0.037560652474657896],[-3.5225293200833834,-1.1992672926446808],[-3.9181995895583785,-2.928068270030982],[-2.1884852724696815,-3.12894182981449],[-1.0529712189956864,-3.3252971163608285],[0.0807763296745942,-4.210130712092587],[1.1005233515642983,-3.0173933316038064],[2.539064632353352,-3.490903176495349],[3.208536004204024,-2.2564058517217327],[4.423220274271251,-1.397732996672502]], [1,1], true); 