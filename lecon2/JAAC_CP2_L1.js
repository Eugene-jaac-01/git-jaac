var min=0; // temps d'apprentissage
//Mise en place du canvas
var canvas = document.getElementById('canvas');
            var ctx = canvas.getContext('2d');
            var data =[];
            var reponse =[];

//Les fonctions du bouton jouer
function play(){
    chronoStart();
    document.getElementById('quest').innerHTML =  "Cliquez sur le Bouton Jouer, la Règle puis sur l'un des Stylos et relier les deux Points."
}
//fonction replay
function replay(){
    if (min < 5){
       chronoContinue();
       clean();
       document.getElementById('play').onclick = chronoContinue;
    }else{
        console.log('Le temps imparti est ecoulé !!!')
        chronoStop();
        }
}
//Les fonctions du bouton Validation
function valide(){
    chronoStop();
    checkArray(reponse);
}

    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');

//------Fonction de génération de points P
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
// génération des points P1 et P2
function gpoints(){
    if(sec == 0){
        document.getElementById('quest').innerHTML = "Cliquez sur le bouton jouer pour démarrer le chrono!!!";
    }
    else{
       
        points(100,150,8,'P1',1); //Premier point P1
        points(400,95,8,'P2',2); //Deuxième point P2
    }
    
}
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


//----génération de la règle----------------------------
      function regle() {
          var img = document.getElementById("regle");
          ctx.beginPath();
          ctx.save();
          //ctx.drawImage(img, 90, 130, 50, 60, 10, 10, 50, 60);
          ctx.rotate((Math.PI / 180) * -10.25);
          ctx.drawImage(img, 60, 175, 340, 50);
          ctx.restore();
          ctx.closePath();
};

//------fonction pour obtenir l'id du boutton selectionné
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

///-------Génération du trait pour relier les deux points-----

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
function dragStop(event) {
    dragging = false;
    restoreSnapshot();
    var position = getCanvasCoordinates(event);
    drawLine(position);
    var p1 =dat(data,pxTemp);
    var p2 =dat(data,position);
    if(p1!=null && p2!=null && p1 != p2){
        reponse.push({p1,p2});
    }
    pxTemp =null;
    console.log(reponse);
    //verification(reponse);
}
//--verifie si le tableau n'est pas ;
var rep =''
function checkArray(emptyArray) { 
           if (typeof emptyArray != "undefined"  
                        && emptyArray != null  
                        && emptyArray.length != null  
                        && emptyArray.length > 0) {
                output = true;
                alert('Bravo vous avez joind correctement les deux points');
                rep ='ok';
                reponse =[];//je vide la table pour un autre test ceci seulement dans le cas de l'apprentissage
           }
            else {
                 output = false; 
                 alert('Désolé, réessayer');
                 rep ='no ok';
            }
    }

//window.addEventListener('load', init, false);

// La fonction Vérifie si un point appartient à un cercle
    function check_a_point(a, b, x, y, r) {
        var dist_points = (a - x) * (a - x) + (b - y) * (b - y);
          //console.log('dist_points '+dist_points);
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
///////////////////////////////////////////////////////////////////////////
function Affiche(){
 alert(tps)
}

function score(){
 alert(val)
}
    

// Ajout du swicth  case/*
function appreciate() {
 
   if (rep == 'ok'){
      val = 0;
      switch (true) {
        case (tps > 30):
          alert("Mal");
          val = 1;
          break;
        case (tps <= 30 && tps >= 26):
          alert("Mal");
          val = 2;
          break;
        case (tps <=25 && tps >= 23):
          alert("Médiocre");
          val = 3;
          break;
        case (tps <=22 && tps >= 16):
          alert("Médiocre");
          val = 4;
          break;
          case (tps <=15 && tps >= 13):
          alert("passable");
          val = 5;
          break;
        case (tps <=15 && tps > 12):
          alert("Assez-bien");
          val = 6;
          break;
        case (tps <=12 && tps > 10):
          alert("Assez-bien");
          val = 7;
          break;
       case (tps <=10 && tps >= 8):
          alert("Bien");
          val = 8;
          break;
       case (tps <=7 && tps > 5):
          alert("Bien");
          val = 9;
          break;
       case (tps <=5):
          alert("Bien");
          val = 10;
          break;
        default:
          tps = "Unknown ";
      }
    }
    else{ alert('Votre ligne ne joint pas correctement les deux points RECOMMENCER !!!')
         val = 0;
        }
}

function clean() {
        ctx.clearRect(0,0, canvas.width, canvas.height);
      };


