
const buttonMenuTarget= [
    {
        id:0,
        eventClick:0,
        avaiableClass:"avaiable",
        disabledFunction:false,
        titleButton:"Somas com unidades"
    },
    {
        id:1,
        eventClick:"changeScreen(1)",
        avaiableClass:"{avaiable:!avaiableScreens[0].item}",
        disabledFunction:"avaiableScreens[0].item",
        titleButton:"Soma Dezenas"
    },
    { 
        id:2,
        eventClick:"changeScreen(2)",
        avaiableClass:"{avaiable:!avaiableScreens[1].item}",
        disabledFunction:"avaiableScreens[1].item",
        titleButton:"Subtração"
    },
    {
        id:3,
        eventClick:"changeScreen(3)",
        avaiableClass:"{avaiable:!avaiableScreens[2].item}",
        disabledFunction:"avaiableScreens[2].item",
        titleButton:"Tabuada 2 Primeira Parte"
    },
    {  
        id:3,
        eventClick:"changeScreen(4)",
        avaiableClass:"{avaiable:!avaiableScreens[3].item}",
        disabledFunction:"avaiableScreens[3].item",
        titleButton:"Tabuada 2 Segunda Parte"
    },
     {
         id:4,
        eventClick:"changeScreen(5)",
        avaiableClass:"{avaiable:!avaiableScreens[4].item}",
        disabledFunction:"avaiableScreens[4].item",
        titleButton:"Tabuada 2 Completa"
    },
    {
        id:5,
        eventClick:"changeScreen(6)",
        avaiableClass:"{avaiable:!avaiableScreens[5].item}",
        disabledFunction:"avaiableScreens[5].item",
        titleButton:"abuada 3 Primeira Parte"
    },
    {
        id:6,
        eventClick:"changeScreen(7)",
        avaiableClass:"{avaiable:!avaiableScreens[6].item}",
        disabledFunction:"avaiableScreens[6].item",
        titleButton:"Tabuada 3 Segunda Parte"
    },
    {
        id:7,
        eventClick:"changeScreen(8)",
        avaiableClass:"{avaiable:!avaiableScreens[7].item}",
        disabledFunction:"avaiableScreens[7].item",
        titleButton:"Tabuada 3 Completa<"
    },
    {
        id:8,
        eventClick:"changeScreen(9)",
        avaiableClass:"{avaiable:!avaiableScreens[8].item}",
        disabledFunction:"avaiableScreens[8].item",
        titleButton:"Tabuada 4 Primeira Parte"
    },
    {
        id:9,
        eventClick:"changeScreen(10)",
        avaiableClass:"{avaiable:!avaiableScreens[9].item}",
        disabledFunction:"avaiableScreens[9].item",
        titleButton:"Tabuada 4 Segunda Parte"
    },
    {   id:10,
        eventClick:"changeScreen(11)",
        avaiableClass:"{avaiable:!avaiableScreens[10].item}",
        disabledFunction:"avaiableScreens[10].item",
        titleButton:"Tabuada 4 Completa"
    },
    {   id:11,
        eventClick:"changeScreen(12)",
        avaiableClass:"{avaiable:!avaiableScreens[11].item}",
        disabledFunction:"avaiableScreens[11].item",
        titleButton:"Soma com Dezenas Segunda parte"
    }
]
export default buttonMenuTarget;