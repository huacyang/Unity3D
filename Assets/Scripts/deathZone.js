#pragma strict

function OnCollisionEnter(collision : Collision) {
	Destroy(collision.gameObject);
}