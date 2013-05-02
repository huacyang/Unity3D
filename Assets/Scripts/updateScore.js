#pragma strict

var explosion : GameObject; // drag your explosion prefab here
var explosionTime : int = 2;
var explosionSound : AudioClip;
private var score : int = 0;
private var playerGUI : GameObject;

function Start() {
	playerGUI = GameObject.FindWithTag("playerGUI");
}

function OnCollisionEnter(collision : Collision) {

    var explosionClone = Instantiate(explosion, transform.position, Quaternion.identity);
    audio.PlayOneShot(explosionSound, 0.3);
    Destroy(gameObject);
    Destroy(explosionClone, explosionTime);
	// check if it hit the enemy    
    if (collision.gameObject.tag == "Enemy") {
    	score = collision.gameObject.GetComponent(scoreValue).scoreValue;
    	playerGUI.GetComponent(gui).score += score;
    }
}

@script RequireComponent(AudioSource)