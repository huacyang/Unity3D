#pragma strict

var guiStyle : GUIStyle;

function OnGUI () {
	if (GUI.Button(Rect(Screen.width - 320, Screen.height - 100, Screen.width, 240), "Play Again?", guiStyle)) {
		Application.LoadLevel(0);
    }
}