#pragma strict

var bomb : GameObject;
var shield : GameObject;

var bombNum : int;
var shieldNum : int = 0;
var health : int = 10;
var score : int = 0;

var healthStyle : GUIStyle;

function OnGUI () {
	GUI.BeginGroup(Rect (Screen.width/2.0 - 120, 0, Screen.width, 240));
	GUI.Box(Rect (0,0,240,80), "", healthStyle);
	GUI.Box(Rect (3,3,75,75), "Lives", healthStyle);
	GUI.Label(Rect (3,30,75,75), health.ToString(), healthStyle);
	GUI.Box(Rect (103,3,75,75), "Scores", healthStyle);
	GUI.Label(Rect (103,30,75,75), score.ToString(), healthStyle);
	//GUI.Box(Rect (203,3,75,75), "Bombs", healthStyle);
	//GUI.Label(Rect (203,30,75,75), bombNumToString(), healthStyle);
	GUI.EndGroup();
}

function Update() {
	if (health <= 0) {
		Application.LoadLevel(1);
	}
}

