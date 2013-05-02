#pragma strict

var weapon : GameObject;

function Update () {
	if (Input.GetMouseButtonDown(0)) {
		var missle : GameObject = Instantiate (weapon, transform.position, transform.rotation);
		missle.rigidbody.AddRelativeForce(Vector3.forward * 1000); 
		// player fired missles should ignores collision with the player
		Physics.IgnoreCollision(missle.collider, gameObject.collider);
	}
}