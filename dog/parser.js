var tmpVertex = [];
var tmpNormal = [];
var tmpTex = [];


function getVTN(str) {
    str = str.split('/');
    //  console.log(str);
    let index = (Number.parseInt(str[0]) - 1) * 3;

    vertexData.push(tmpVertex[index]);
    vertexData.push(tmpVertex[index + 1]);
    vertexData.push(tmpVertex[index + 2]);

    index = (Number.parseInt(str[1]) - 1) * 2;
    // console.log(index);
    texData.push(tmpTex[index]);
    texData.push(tmpTex[index + 1]);

    index = (Number.parseInt(str[2]) - 1) * 3;
     
    normalData.push(tmpNormal[index]);
    normalData.push(tmpNormal[index + 1]);
    normalData.push(tmpNormal[index + 2]);

}

function triangulate(str){
    let points = [];
    let ptr;
    let first;
    let second;
    let third;
    let tmp;
    let point;
    let index;

    let firstTr;
    let secondTr;

    for (let i = 1; i < str.length; i++){
        tmp = str[i].split('/');
        index = (tmp[0] - 1) * 3;
        ptr = glMatrix.vec3.fromValues(tmpVertex[index],
            tmpVertex[index + 1],
            tmpVertex[index + 2]);
        
        point = {
            coords: ptr,
        }
        points.push(point);
    }
 //   console.log(str);
 // console.log(points);

   let v1 = glMatrix.vec3.create();
   let v2 = glMatrix.vec3.create();
   let v3 = glMatrix.vec3.create();
   glMatrix.vec3.subtract(v1, points[1].coords, points[0].coords);
   glMatrix.vec3.subtract(v2, points[2].coords, points[0].coords);
   glMatrix.vec3.subtract(v3, points[3].coords, points[0].coords);

    first = glMatrix.vec3.angle(v1, v2);
    second = glMatrix.vec3.angle(v1, v3);
    third = glMatrix.vec3.angle(v2, v3);

   // console.log(first, second, third);

    if ((first >= second && first >= third)){
        firstTr = [0, str[1], str[4], str[3]];
        secondTr = [0, str[1], str[4], str[2]];
    }else if((second >= first && second >= third)) {
        firstTr = [0, str[1], str[3], str[2]];
        secondTr = [0, str[1], str[3], str[4]];
    }else{
        firstTr = [0, str[1], str[2], str[3]];
        secondTr = [0, str[1], str[2], str[4]];
    }
    getVTNforTr(firstTr);
    getVTNforTr(secondTr);
   // console.log(str);
  //  console.log(firstTr + '     ' + secondTr);

  //console.log(str);
}

function getVTNforTr(str){
    getVTN(str[1]);
    getVTN(str[2]);
    getVTN(str[3]);
}

function parseObj(input) {
    vertexData = [];
    texData = [];


    normalsData = [];

    let str;

    var strings = input.split('\n');
    for (let i = 0; i < strings.length; i++) {
        strings[i] = strings[i].trim();
        str = strings[i].split(' ');
        str = str.filter(element => element !== '');
        if (str[0] === 'v') {

            tmpVertex.push(Number.parseFloat(str[1]));
            tmpVertex.push(Number.parseFloat(str[2]));
            tmpVertex.push(Number.parseFloat(str[3]));

        }
        else if (str[0] === 'vn') {
            tmpNormal.push(Number.parseFloat(str[1]));
            tmpNormal.push(Number.parseFloat(str[2]));
            tmpNormal.push(Number.parseFloat(str[3]));

        }
        else if (str[0] === 'vt') {
            tmpTex.push(Number.parseFloat(str[1]));
            tmpTex.push(Number.parseFloat(str[2]));
        }

    }
    for (let i = 0; i < strings.length; i++) {
        strings[i] = strings[i].trim();
        str = strings[i].split(' ');
        str = str.filter(element => element !== '');
        if (str[0] === 'f') {
            if (str.length === 5){
                triangulate(str);
            } else if (str.length > 5){
                alert('Wrong model');
                return false;
            }else{
                getVTNforTr(str);
            }

        }

    }
   // console.log(vertexData);
  //  console.log(normalData);
 // console.log(texData);
} 