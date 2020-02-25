var tmpVertex = [];
var tmpNormal = [];


function getVTN(str) {
    str = str.split('/');
    //  console.log(str);
    let index = (Number.parseInt(str[0]) - 1) * 3;

    vertexData.push(tmpVertex[index]);
    vertexData.push(tmpVertex[index + 1]);
    vertexData.push(tmpVertex[index + 2]);

    index = (Number.parseInt(str[2]) - 1) * 3;
    // console.log(index);
    normalData.push(tmpNormal[index]);
    normalData.push(tmpNormal[index + 1]);
    normalData.push(tmpNormal[index + 2]);

}

function parseObj(input) {
    vertexData = [];
    indexeData = [];

    let index;

    normalsData = [];

    let str;

    var strings = input.split('\n');
    for (let i = 0; i < strings.length; i++) {
        strings[i] = strings[i].trim();
        str = strings[i].split(' ');
        if (str[0] === 'v') {

            tmpVertex.push(Number.parseFloat(str[1]));
            tmpVertex.push(Number.parseFloat(str[2]));
            tmpVertex.push(Number.parseFloat(str[3]));

        }
        else if (str[0] === 'f') {
            // indexData.push(Number.parseInt(str[1]) - 1);

            getVTN(str[1]);
            getVTN(str[2]);
            getVTN(str[3]);





            //  indexData.push(Number.parseInt(str[2]) - 1);


            //  indexData.push(Number.parseInt(str[3]) - 1);

        }
        else if (str[0] === 'vn') {
            tmpNormal.push(Number.parseFloat(str[1]));
            tmpNormal.push(Number.parseFloat(str[2]));
            tmpNormal.push(Number.parseFloat(str[3]));

        }

    }
    // console.log(vertexData);
} 