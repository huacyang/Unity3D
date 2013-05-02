#pragma strict

private var moveSpeed = 800;
var rotationSpeed = 3;
 
private var currentObject : Transform;
private var target : Transform;
private var difference : Vector3;
 
function Awake() {
	currentObject = transform;
}
 
function Start() {
	target = GameObject.Find("Player").transform;
}
 
function Update() {
	// finds the targeted object (aka the Player)
	target = GameObject.Find("Player").transform;
	// calculates the different in position between the current object and the targeted object
	difference = target.position - currentObject.position;
	// rotate to look at the player
	currentObject.rotation = Quaternion.Slerp(currentObject.rotation,
		Quaternion.LookRotation(difference), rotationSpeed*Time.deltaTime);
	// fires the object straight on the x coordinate
    currentObject.rigidbody.AddRelativeForce(Vector3.forward * moveSpeed); 
}
