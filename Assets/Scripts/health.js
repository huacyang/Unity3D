#pragma strict

var health = 100;

function Start () {

}

function Update () {
	if (health <= 0) {
		Destroy (gameObject);
	}
}

function ApplyDamage(dmgAmount : int) {
	health = health-dmgAmount;
}

function OnGUI() {
	GUI.BeginGroup(Rect(Screen.width - 80, 5, 80, 80));
	GUI.Box(Rect(0, 0, 80, 60), "Health");
	GUI.Label(Rect(20, 20, 80, 30), String.Format("{0:0}", health));
	GUI.EndGroup();
}