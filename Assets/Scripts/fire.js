#pragma strict

var weapon : GameObject;
var fireRate : int = 2;
var rotationSpeed = 10;

internal var spawnCount : int;
internal var nextFire : float;
private var currentObject : Transform;
private var target : GameObject;
private var difference : Vector3;

function Awake() {
	currentObject = transform;
}

function Update() {
	target = GameObject.FindGameObjectWithTag("Player");
	difference = target.transform.position - currentObject.position;
	
	//rotate to look at the player
	currentObject.rotation = Quaternion.Slerp(currentObject.rotation,
		Quaternion.LookRotation(difference), rotationSpeed*Time.deltaTime);
	
	if (Time.time > nextFire) {
		nextFire = Time.time + fireRate;
		spawnCount++;
		var clone : GameObject = Instantiate (weapon, transform.position, transform.rotation);
		clone.rigidbody.AddRelativeForce(Vector3.forward * 1000); 
		Physics.IgnoreCollision(clone.collider, transform.root.collider);
	}
}