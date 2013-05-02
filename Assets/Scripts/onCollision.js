#pragma strict

var explosion : GameObject; // drag your explosion prefab here
var explosionTime : int = 2;
var explosionSound : AudioClip;

function OnCollisionEnter(collision : Collision){
	if (collision.gameObject.tag == "Enemy" && gameObject.tag == "enemyWeapon") {
		Physics.IgnoreCollision(gameObject.collider, collision.gameObject.collider);
	} else if (collision.gameObject.tag == "enemyWeapon" && gameObject.tag == "Enemy") {
		Physics.IgnoreCollision(collision.gameObject.collider, gameObject.collider);
	} else {
	    var explosionClone = Instantiate(explosion, transform.position, Quaternion.identity);
    	audio.PlayOneShot(explosionSound, 0.3);
	    Destroy(gameObject);
	    Destroy(explosionClone, explosionTime);
	}
}

@script RequireComponent(AudioSource)