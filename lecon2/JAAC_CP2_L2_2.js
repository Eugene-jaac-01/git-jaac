//------------Les variables----------
 var data = [];    //tableau des points initiaux générés
 var reponse =[];  //alimenté si les points sont reliés
 var secRegle = false;//initialisé à false pour donner les coordonnées de la règle.
 var onclik = 0; //lenombre de clic droit
 var rep1 = false;//si p1 et p2 sont reliés.
 var rep2 = false;//si p2 et p3 sont reliés.
 var rep = '';//si la reponse est correcte après validation;

//Les fonctions du bouton jouer
function play(){
    chronoStart();
    document.getElementById('quest').innerHTML =  "Cliquez sur le Bouton Jouer, la Règle puis sur l'un des Stylos,relier les deux points; clique-droit pour générer le troisième point, puis la règle et relier les points."
}
//fonction replay
function replay(){
    if (min < 5){
       chronoContinue();
       clean();
       document.getElementById('play').onclick = chronoContinue;
        onclik =0;
      // oncontext();
    }else{
        alert('Le temps imparti est ecoulé !!!')
        chronoStop();
        }
}
//Les fonctions du bouton Validation
function valide(){
    chronoStop();
    verification(reponse);
    if(rep1==true && rep2==true){
        rep='ok';
        alert('Bravo');}
    else {
        rep='no ok';
        alert('Desolé recommencez!!');
    }
}
//----Déclaration des canvas----
var canvas = document.getElementById('canvas');
            var ctx = canvas.getContext('2d');
    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');
            

//retournes les lignes dragStart et dragStop qui appartienent aux points
function dat(data, point){
    var px =null;
    for(var i in data){
        var isIn=  check_a_point(point.lx, point.ly, data[i].x,data[i].y, data[i].r);
        if(isIn){
            px = data[i];
        }
    }
    
    return px;
}
//-----génération des points-----
function points(cx,cy,r,p,id){
    ctx.beginPath();
    ctx.lineWidth = '5';
    ctx.fillStyle = '#000';
    ctx.arc(cx,cy,r,0,2*Math.PI);
    ctx.fill();
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(p,cx,cy,r);
    ctx.closePath();
   return data.push({x:cx,y:cy,r:r,p:p,id:id});
    
}
//-------rotation 90 pour un canvas------------------
function rotate90(canvasTarget, image, w, h)
{
  canvasTarget.width = h;
  canvasTarget.height = w;
  var ctxtarget = canvasTarget.getContext("2d");   
  ctxtarget.translate(h, 0);
  ctxtarget.rotate(Math.PI / 2);  
  ctxtarget.drawImage(image, 0, 0);  
}
//---Condition de génération de la règle-------------
function regles(){
        onclik=1;
        regle(-40,146,240,30,-27.5);
        document.getElementById("regle").onclick = regles2;
    }
function regles2(){
        regle(0,0,0,0,0);
        regle(170,-66,245,30,35);
        document.getElementById("regle").onclick = regles;
    onclik=0;
}
//----------------génération de la règle-------------
function regle(x,y,w,h,j) {
  var img = document.getElementById("regle");
  ctx.beginPath();
  ctx.save();
  //ctx.drawImage(img, 90, 130, 50, 60, 10, 10, 50, 60);
  ctx.rotate((Math.PI /180) * j);//
  ctx.drawImage(img, x, y, w, h);
  ctx.restore();
  ctx.closePath();
};

//----Les premiers points générer au clic-droit------
function gpoints(){
    points(50,128,8,'P1',1); 
    points(200,50,8,'P2',2);
    //points(110,20,8,'P3',3);
    
}
//----Les premiers points générer au clic-droit------
function gpoints2(){
    points(345,153,8,'P3',3);
    //points(110,20,8,'P3',3);
    
}
//---point généré au clique droit-------
  function oncontext(){
      if(sec ==0){
         document.getElementById('quest').innerHTML = "Cliquez sur le bouton jouer pour démarrer le chrono!!!";
      } else{
         document.getElementById('quest').innerHTML =  "Cliquez sur le Bouton Jouer, la Règle puis sur l'un des Stylos,relier les deux points; clique-droit pour générer le troisième point, puis la règle et relier les points."
         //clean();
          if(onclik==0)
            gpoints();
          else
            gpoints2();
         dat();
      }
      return secRegle;
  }  
//---------function to clean a canvas---------
function clean() {
        ctx.clearRect(0,0, canvas.width, canvas.height);
      };


//-------Génération du trait pour relier les deux points-----

var canvas = document.getElementById("canvas"),
                    context,
                    dragging = false,
                    dragStartLocation,
                    snapshot;

function getCanvasCoordinates(event) {

      var  x = event.clientX - canvas.getBoundingClientRect().left,
           y = event.clientY - canvas.getBoundingClientRect().top;
  
    return {lx: x, ly: y};
}

function takeSnapshot() {
    snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
}
//Remets les paramètres à zéro au relâchement de la souris
function restoreSnapshot() {
    context.putImageData(snapshot, 0, 0);
}

function drawLine(position) {

    context.beginPath();
    context.moveTo(dragStartLocation.lx, dragStartLocation.ly);
    context.lineTo(position.lx, position.ly);
    context.stroke();
    
}
//Donner les cordonnées des points en function des id
var pxTemp = null;
function dragStart(event) {
    dragging = true;
    dragStartLocation = getCanvasCoordinates(event);
    takeSnapshot();
    pxTemp =  dragStartLocation;
}

function drag(event) {
    var position;
    if (dragging === true) {
        restoreSnapshot();
        position = getCanvasCoordinates(event);
        drawLine(position);
    }
}
//var stopval, startval = false;
function dragStop(event) {
    dragging = false;
    restoreSnapshot();
    var position = getCanvasCoordinates(event);
    drawLine(position);
    //console.log('Lfx2= '+ position.lx + ' Lfy2= '+ position.ly);
    var p1 =dat(data,pxTemp);
    var p2 =dat(data,position);
    console.log(p1.id);
    console.log(p2.id);
    tcheck_id(p1,p2);
    if(p1!=null && p2!=null && p1 != p2){
        reponse.push(p1);
        reponse.push(p2); 
    }
  //--check l'ordre de raliement des points  
function tcheck_id(p1,p2){
    var id1 = p1.id;
    var id2 = p2.id;
        if(id2-id1 == 1 ){
            console.log("Les points suivre l'ordre")
        }else console.log("l\'ordre n'est pas respecté");
        }
    pxTemp =null;
    console.log(reponse);
}
 //------Check si les points sont reliés dans l'ordre-------

var tab=[];
function verification(tableau){
   var p1existe = false;
   var p2existe = false;
   var p3existe = false;

   for (let i = 0; i < tableau.length; i++) {
            if(tableau[i].p == "P1")
                {
                   p1existe = true;
                   var  pid1 =tableau[i].id
                }
            
            if(tableau[i].p == "P2")
                {
                   p2existe = true;
                   var  pid2 =tableau[i].id
                }
           if(tableau[i].p =="P3")
                    {
                       p3existe = true;
                       var  pid3 = tableau[i].id;
                    }
    }//endFor
   
            if(p1existe==true && p2existe==true)
                {
                  console.log("les deux points p1 et p2 sont relies");
                    pid = pid2-pid1;
                    if(pid>=0){
                        tab.push(pid);
                        rep1=true;
                       // console.log("pid: " +pid);
                        pid=0;
                     }
                }
            if(p2existe==true && p3existe==true) {
                console.log("les deux points p2 et p3 sont relies");
                    pid = pid3-pid2+1;
                    if(pid>=0){
                        tab.push(pid);
                        rep2=true;
                      //  console.log("pid: "+pid);
                        pid=0;
                    }
            }else{
                    console.log("les points p2 et p3 ne sont pas alignés")
               }
       
}

// La fonction Vérifie si un point appartient à un cercle
    function check_a_point(a, b, x, y, r) {
        var dist_points = (a - x) * (a - x) + (b - y) * (b - y);
         // console.log('dist_points '+dist_points);
        r *= r;
          //console.log('r= '+r);
        if (dist_points < r) {
            return true;
        }
        return false;
    }



// ---------------------FUNCTION CHRONO USED--------
var startTime = 0
var start = 0
var end = 0
var diff = 0
var timerID = 0
var sec = 0;
var min = 0;
function chrono(){
	end = new Date()
	diff = end - start
	diff = new Date(diff)
	var msec = diff.getMilliseconds()
	    sec = diff.getSeconds()
	    min = diff.getMinutes()
	var hr = diff.getHours()-1
	if (min < 10){
		min = "0" + min
	}
	if (sec < 10){
		sec = "0" + sec
	}
	if(msec < 10){
		msec = "00" +msec
	}
	else if(msec < 100){
		msec = "0" +msec
	}
	//document.getElementById("chronotime").innerHTML = hr + ":" + min + ":" + sec + ":" + msec
    document.getElementById("compteur").innerHTML = 'Temps: '+ min + ":" + sec + "s"
	timerID = setTimeout("chrono()", 10)
       temps = sec
    if(min == 0 && temps <= 59){
       tps = temps
       }
    else{
       tps = (min*60) + sec
      }
}
//---------Demarrer le chrono----------------------
function chronoStart(){
	start = new Date()
	chrono()
}

function chronoReset(){//reseter le champs
	document.getElementById("compteur").innerHTML ='Temps: '+ min+ ":"  + "00:00"
	start = new Date()
}
//--------Arrêter le chrono------------------------
function chronoStop(){
	clearTimeout(timerID)
}
//---------Mets une pause au chrono----------------
function chronoContinue(){
	start = new Date()-diff
	start = new Date(start)
	chrono()
}
//------Choix de la couleur d'un crayon
function reply_click(color){ 
    traceColor = color;
    context.strokeStyle = traceColor;
    context.lineWidth = 6;
    context.lineCap = 'round';
//Les actions clavier
    canvas.addEventListener('mousedown', dragStart, false);
    canvas.addEventListener('mousemove', drag, false);
    canvas.addEventListener('mouseup', dragStop, false);

  }

