#pragma strict

var explosion : GameObject; // drag your explosion prefab here
var explosionTime : int = 2;

function OnCollisionEnter(collision : Collision){
	if (collision.gameObject.tag == "Enemy") {
		if (gameObject.tag == "Enemy") {
			Physics.IgnoreCollision(gameObject.collider, collision.gameObject.collider);
		} else if (gameObject.tag == "enemyWeapon") {
			Physics.IgnoreCollision(gameObject.collider, collision.transform.collider);
		}
	} else {
	    var explosionClone = Instantiate(explosion, transform.position, Quaternion.identity);
	    Destroy(gameObject);
	    Destroy(explosionClone, explosionTime);
	}
}